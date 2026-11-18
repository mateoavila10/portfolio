---
title: "De un Excel a una base de datos: importar datos sucios con revisión previa"
date: 2026-11-10
category: Datos
summary: El club venía usando una planilla durante años. Cómo diseñé un importador que normaliza, valida y muestra todo antes de guardar, para que nadie tenga que cargar datos a mano ni se cuele basura en la base.
---

Cuando un club pasa de una planilla a un sistema, la migración de datos suele ser la parte más subestimada. En Tucumán BB la información de jugadores, socios y cuotas vivía en un Excel que muchas personas habían editado a lo largo del tiempo. Cargarlo a mano no era opción, pero importarlo "a ciegas" tampoco.

## Cómo se ve un Excel real

Un Excel que se usó durante años no tiene un formato: tiene varios. Algunas cosas que hay que esperar:

- Nombres en mayúsculas, minúsculas o con espacios de más.
- Documentos escritos con puntos, sin puntos o con espacios.
- Fechas que a veces son fechas y a veces son texto, en formatos distintos.
- Filas duplicadas, filas vacías en el medio y columnas de notas con información útil mezclada.
- Montos con `$`, con puntos de miles o con coma decimal.

La regla que me puse fue: **el importador nunca adivina en silencio.** Si puede corregir algo con seguridad, lo corrige y lo muestra. Si no, lo marca para que una persona decida.

## Las etapas del importador

### 1. Leer

El archivo se lee en el navegador y cada fila se convierte en un objeto con las columnas que esperamos. Si falta una columna obligatoria, el proceso se detiene antes de empezar y dice cuál falta.

### 2. Normalizar

Funciones chicas y fáciles de probar, una por tipo de dato:

```js
// "  GOMEZ,   juan " → "Gomez, Juan"
function normalizeName(value) {
  return String(value ?? '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .replace(/(^|[\s,])\p{L}/gu, (letter) => letter.toUpperCase())
}

// "30.123.456" o "30 123 456" → "30123456"
function normalizeDocument(value) {
  return String(value ?? '').replace(/\D/g, '')
}
```

Las fechas merecen mención aparte: Excel guarda muchas fechas como un número (días desde 1900), y otras veces llegan como texto `dd/mm/aaaa`. Normalizo ambos casos a `aaaa-mm-dd` y, si no puedo interpretar el valor sin ambigüedad, la fila queda marcada.

### 3. Validar

Con [Zod](https://zod.dev) defino cómo tiene que ser una fila válida. La ventaja es que el mismo esquema me da el chequeo y los mensajes de error:

```js
const memberRow = z.object({
  fullName: z.string().min(3, 'Nombre muy corto'),
  document: z.string().regex(/^\d{7,8}$/, 'Documento inválido'),
  birthDate: z.string().date('Fecha de nacimiento inválida').optional(),
  category: z.string().min(1, 'Falta la categoría'),
})
```

### 4. Clasificar

Cada fila termina en uno de tres grupos:

| Estado | Qué significa | Qué pasa |
| --- | --- | --- |
| Lista | Pasó la validación sin cambios importantes | Se importa |
| Con avisos | Se normalizó algo o parece duplicada | Se importa si la persona la confirma |
| Con errores | No cumple el esquema | No se importa hasta corregirla |

Los duplicados los detecto por documento, tanto dentro del mismo archivo como contra lo que ya existe en la base.

### 5. Revisar antes de guardar

Para mí es la parte más importante. Antes de escribir nada, el sistema muestra una tabla con todas las filas, su estado y, en las corregidas, el valor original al lado del valor nuevo. Quien importa puede filtrar por estado, corregir y volver a validar.

### 6. Guardar en una sola operación

Cuando se confirma, todo se guarda de una vez dentro de una transacción. Si algo falla en el medio, no queda una importación a medias. Y como el documento es único en la base, volver a importar el mismo archivo no duplica socios.

## Lo que aprendí

- **La vista previa vale más que cualquier regla automática.** Las personas del club conocen sus datos mejor que cualquier validación.
- **Mostrar el antes y el después genera confianza.** Nadie quiere que un sistema le cambie los datos sin avisar.
- **Separar normalizar, validar y guardar** hace que cada parte se pueda probar sola y que sea fácil sumar una regla nueva cuando aparece un caso raro (y siempre aparece).
