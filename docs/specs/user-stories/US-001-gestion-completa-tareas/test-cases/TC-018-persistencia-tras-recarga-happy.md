# TC-018 — Persistencia del estado tras recargar la página

Tipo: Happy Path
Prioridad: Alta
Criterio de aceptación: AC-010 — Persistencia en localStorage de creación, edición, eliminación y cambio de estado
Artefacto padre: US-001
Estado: Ready
Creado por: juanca202
Fecha: 2026-07-06

## Objetivo

Validar que el estado completo del listado (tareas creadas, editadas, eliminadas y marcadas como completadas) se conserva correctamente después de recargar la página del navegador.

## Precondiciones

- La aplicación está cargada en el navegador con el listado vacío.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Tarea 1 | Descripción "Tarea persistente", fecha 2026-07-10, prioridad Alta [propuesto] | Se crea, se edita y luego se marca como completada |
| Tarea 2 | Descripción "Tarea a eliminar", fecha 2026-07-11, prioridad Baja [propuesto] | Se crea y luego se elimina |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Crea la Tarea 1 y la Tarea 2 | Ambas tareas aparecen en el listado |
| 2 | Usuario | Edita la descripción de la Tarea 1 y la marca como completada | Los cambios se reflejan en el listado |
| 3 | Usuario | Elimina la Tarea 2 | La Tarea 2 desaparece del listado |
| 4 | Usuario | Recarga la página del navegador | La aplicación vuelve a cargar el listado |

## Resultado esperado final

Tras la recarga, el listado muestra únicamente la Tarea 1 con su descripción editada y en estado completada; la Tarea 2 no aparece.

## Observaciones

Ninguna.
