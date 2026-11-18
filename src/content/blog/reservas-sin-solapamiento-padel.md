---
title: Cómo evité reservas solapadas en un SaaS de pádel
date: 2026-09-15
category: Backend
summary: Dos personas reservan la misma cancha en el mismo segundo. Por qué validar antes de insertar no alcanza y cómo lo resolví con transacciones serializables y FOR UPDATE.
---

En un sistema de reservas, el error más caro es el más simple: que dos personas reserven la misma cancha en el mismo horario. En el SaaS de pádel que estoy construyendo, cada club tiene varias canchas y la gente reserva desde el celular. Los horarios más pedidos son pocos, así que tarde o temprano dos pedidos iban a llegar casi juntos.

## El problema: validar y después insertar

La primera versión hacía lo que hace casi todo el mundo:

1. Buscar si hay una reserva que se cruce con el horario pedido.
2. Si no hay, crear la reserva.

El problema es lo que pasa **entre** el paso 1 y el paso 2. Si dos pedidos llegan a la vez, los dos hacen la consulta, los dos ven la cancha libre y los dos insertan. Ninguna validación del frontend ni del backend evita eso: es una *condición de carrera* y solo se resuelve en la base de datos.

## Cuándo se solapan dos turnos

Antes de hablar de bloqueos, vale tener clara la condición. Dos rangos `[inicio, fin)` se solapan cuando:

```sql
existente.inicio < nuevo.fin AND existente.fin > nuevo.inicio
```

Con esa sola comparación se cubren todos los casos: un turno adentro de otro, uno que empieza antes y termina en el medio, etc. Y un turno que termina 19:00 no choca con otro que empieza 19:00.

## Por qué no alcanza una restricción UNIQUE

Mi primera idea fue un índice único sobre `(cancha_id, inicio)`. Sirve si todos los turnos duran lo mismo y arrancan en horarios fijos, pero los clubes ofrecen turnos de 60, 90 y 120 minutos. Una reserva de 18:00 a 19:30 y otra de 19:00 a 20:00 tienen distinto inicio y se solapan igual. MySQL no tiene restricciones de exclusión por rango como PostgreSQL, así que había que resolverlo con transacciones.

## La solución: bloquear la cancha dentro de la transacción

La idea es que todos los pedidos sobre **la misma cancha** pasen de a uno por la sección crítica, sin frenar a las demás canchas ni a los demás clubes. Para eso, dentro de una transacción:

1. Bloqueo la fila de la cancha con `SELECT ... FOR UPDATE`.
2. Busco reservas que se solapen.
3. Si no hay, inserto.
4. Confirmo la transacción y se libera el bloqueo.

Si llega un segundo pedido para esa cancha mientras el primero está adentro, se queda esperando en el paso 1. Cuando entra, el paso 2 ya ve la reserva nueva y rechaza el pedido.

Con Prisma queda más o menos así:

```ts
await prisma.$transaction(
  async (tx) => {
    // 1. Bloqueo la cancha: otros pedidos sobre esta misma cancha esperan acá
    await tx.$queryRaw`SELECT id FROM Court WHERE id = ${courtId} FOR UPDATE`

    // 2. ¿Hay alguna reserva que se cruce con el horario pedido?
    const overlap = await tx.booking.findFirst({
      where: {
        courtId,
        status: { not: 'CANCELLED' },
        startsAt: { lt: endsAt },
        endsAt: { gt: startsAt },
      },
    })
    if (overlap) throw new SlotTakenError()

    // 3. Libre: creo la reserva
    return tx.booking.create({ data: { courtId, clubId, startsAt, endsAt, userId } })
  },
  { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
)
```

## ¿Para qué el nivel serializable si ya hay FOR UPDATE?

El `FOR UPDATE` sobre la cancha es lo que ordena los pedidos. El nivel `SERIALIZABLE` lo sumé como red de seguridad: si en algún momento otro camino del código crea o mueve reservas sin pasar por ese bloqueo, la base igual detecta el conflicto en lugar de dejar pasar datos inconsistentes.

Eso tiene un costo: con `SERIALIZABLE`, MySQL puede abortar una de dos transacciones que compiten (un *deadlock* o conflicto de escritura). No es un bug, es la base diciendo "esto no se puede hacer en paralelo". Lo correcto es reintentar unas pocas veces:

```ts
async function withRetry(fn, attempts = 3) {
  for (let i = 1; ; i++) {
    try {
      return await fn()
    } catch (error) {
      // P2034: Prisma avisa que la transacción falló por conflicto o deadlock
      if (error.code !== 'P2034' || i === attempts) throw error
    }
  }
}
```

## Lo que aprendí

- **La validación tiene que vivir donde están los datos.** Cualquier chequeo previo afuera de una transacción es solo una sugerencia.
- **Bloquear lo más chico posible.** Bloquear la cancha, y no la tabla de reservas entera, permite que el resto del sistema siga funcionando normal.
- **Un índice en `(courtId, startsAt)`** mantiene rápida la búsqueda de solapamientos, que se ejecuta con el bloqueo tomado. Cuanto menos dura esa parte, menos esperan los demás.
- **Los reintentos son parte del diseño**, no un parche. Hay que contar con ellos desde el principio y devolver un error claro ("ese horario se acaba de ocupar") cuando se agotan.

La forma de comprobarlo es disparar muchos pedidos simultáneos al mismo horario en un entorno de prueba: tiene que quedar una sola reserva confirmada y el resto tiene que recibir el error de turno ocupado.
