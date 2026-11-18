---
title: "Row Level Security en Supabase: permisos por rol en un sistema de club"
date: 2026-10-14
category: Seguridad
summary: Cuando el frontend habla directo con la base de datos, los permisos no pueden vivir en React. Cómo armé permisos por rol con políticas RLS y una Edge Function para crear usuarios.
---

En el sistema de gestión de Tucumán BB, el frontend en React habla directamente con Supabase. Es cómodo y rápido de desarrollar, pero tiene una consecuencia que conviene asumir desde el día uno: **cualquiera que abra las herramientas del navegador puede hacer consultas con la misma clave pública que usa la app.** Ocultar un botón no es seguridad. Los permisos tienen que estar en la base.

Para eso existe Row Level Security (RLS) de PostgreSQL: reglas que se evalúan en cada consulta y deciden qué filas puede ver o modificar cada usuario.

## El modelo de roles

Cada usuario de Supabase Auth tiene un perfil con su rol. Los roles de abajo son un ejemplo simplificado; la idea es que cada uno tiene permisos distintos sobre socios, cuotas y caja.

```sql
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text not null,
  role text not null check (role in ('admin', 'cobranza', 'consulta'))
);
```

## Una función para saber el rol actual

Todas las políticas necesitan preguntar "¿qué rol tiene quien hace esta consulta?". En vez de repetir un `select` en cada política, armé una función:

```sql
create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;
```

Dos detalles importantes:

- **`security definer`** hace que la función se ejecute con los permisos de su dueño. Sin eso, una política sobre `profiles` que consulta `profiles` entra en recursión infinita.
- **`set search_path`** evita que alguien pueda "colar" una tabla con el mismo nombre en otro esquema. Es una recomendación de seguridad de Postgres para cualquier función `security definer`.

## Las políticas

Primero se activa RLS en la tabla. A partir de ahí, **todo está prohibido** hasta que una política lo permita:

```sql
alter table public.payments enable row level security;

-- Todos los usuarios logueados pueden ver los pagos
create policy "ver pagos"
  on public.payments for select
  to authenticated
  using (true);

-- Solo admin y cobranza pueden registrar pagos
create policy "registrar pagos"
  on public.payments for insert
  to authenticated
  with check (public.current_user_role() in ('admin', 'cobranza'));

-- Solo admin puede corregir un pago ya cargado
create policy "corregir pagos"
  on public.payments for update
  to authenticated
  using (public.current_user_role() = 'admin');
```

`using` filtra las filas existentes (qué se puede leer, editar o borrar) y `with check` valida las filas nuevas o modificadas. Confundirlos es uno de los errores más comunes.

## Crear usuarios: el caso que RLS no cubre

El admin del club necesitaba dar de alta a otras personas del equipo. Crear usuarios en Supabase Auth requiere la clave `service_role`, que se saltea RLS por completo. **Esa clave nunca puede estar en el frontend.**

La solución fue una Edge Function que:

1. Recibe el pedido con el token de la persona logueada.
2. Verifica que esa persona sea admin.
3. Recién ahí usa la clave `service_role` (guardada como secreto del servidor) para crear el usuario y su perfil.

```ts
// Cliente con el token de quien llama: respeta RLS
const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  global: { headers: { Authorization: req.headers.get('Authorization')! } },
})

const { data: role } = await userClient.rpc('current_user_role')
if (role !== 'admin') {
  return new Response('No autorizado', { status: 403 })
}

// Cliente con privilegios: solo se usa después de verificar el rol
const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
const { data, error } = await adminClient.auth.admin.createUser({ email, password, email_confirm: true })
```

## Cómo lo pruebo

Lo que más me sirvió fue probar las políticas haciéndome pasar por cada rol, no solo mirar que la app "funcione". En el editor SQL se puede simular un usuario:

```sql
set local role authenticated;
set local request.jwt.claims = '{"sub": "<id-de-un-usuario-de-prueba>"}';
insert into payments (...) values (...); -- debería fallar si el rol es 'consulta'
```

## Lo que aprendí

- **RLS es la única capa que no se puede saltear desde el navegador.** La interfaz puede ocultar opciones para que la experiencia sea clara, pero la regla real está en la base.
- **Activar RLS sin políticas bloquea todo**, y eso está bien: es mejor arrancar cerrado y abrir de a poco.
- **La clave `service_role` va solo en el servidor**, y cualquier función que la use tiene que verificar primero quién la llama.
