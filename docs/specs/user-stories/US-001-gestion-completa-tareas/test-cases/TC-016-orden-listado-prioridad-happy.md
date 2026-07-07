# TC-016 — Orden por defecto del listado por prioridad

Tipo: Happy Path
Prioridad: Alta
Criterio de aceptación: AC-009 — Listado ordenado por defecto por prioridad (alta → media → baja)
Artefacto padre: US-001
Estado: Ready
Creado por: juanca202
Fecha: 2026-07-06

## Objetivo

Validar que, al cargar la aplicación, el listado de tareas se muestra ordenado por defecto por prioridad en el orden alta → media → baja, cumpliendo BR-05.

## Precondiciones

- Existen al menos tres tareas creadas en un orden distinto al de prioridad: por ejemplo, creadas en el orden baja, alta, media.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Tarea 1 (creada primero) | Prioridad Baja [propuesto] | — |
| Tarea 2 (creada segundo) | Prioridad Alta [propuesto] | — |
| Tarea 3 (creada tercero) | Prioridad Media [propuesto] | — |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Crea las tres tareas en el orden indicado (Baja, Alta, Media) | Las tres tareas quedan registradas |
| 2 | Usuario | Recarga la aplicación (o navega al listado) | El listado se recalcula al cargar |

## Resultado esperado final

El listado muestra primero la Tarea 2 (Alta), luego la Tarea 3 (Media) y finalmente la Tarea 1 (Baja), independientemente del orden de creación.

## Observaciones

Ninguna.
