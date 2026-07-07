# TC-011 — Eliminación exitosa de una tarea existente

Tipo: Happy Path
Prioridad: Alta
Criterio de aceptación: AC-006 — Eliminar una tarea existente del listado de forma permanente
Artefacto padre: US-001
Estado: Ready
Creado por: juanca202
Fecha: 2026-07-06

## Objetivo

Validar que eliminar una tarea existente la remueve del listado y de la persistencia de forma permanente.

## Precondiciones

- Existen al menos dos tareas en el listado.

## Datos de prueba

N/A

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Selecciona la acción de eliminar sobre una de las tareas existentes | El sistema solicita o ejecuta la eliminación |
| 2 | Usuario | Confirma la eliminación (si aplica confirmación) | La tarea desaparece del listado inmediatamente |
| 3 | Usuario | Recarga la página | La tarea eliminada no reaparece |

## Resultado esperado final

La tarea eliminada ya no existe en el listado ni en localStorage; el resto de tareas permanece sin cambios.

## Observaciones

Ninguna.
