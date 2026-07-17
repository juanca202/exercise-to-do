# TC-009 — Dado que existe una tarea en el listado, Cuando el usuario confirma su eliminación, Entonces la tarea desaparece del listado y de la persistencia local

**Perspectiva**: Happy Path
**Automatización**: Automatizable (E2E)
**Prioridad**: Alta
**Criterio de aceptación**: AC-006 — Eliminar una tarea existente
**Artefacto padre**: US-001
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- Existen al menos dos tareas en el listado.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| N/A | N/A | No aplican datos de prueba específicos |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | usuario | Selecciona la opción eliminar sobre una tarea existente | El sistema solicita o ejecuta la eliminación |
| 2 | usuario | Confirma la eliminación (si aplica confirmación) | La tarea se elimina |

## Resultado esperado final

La tarea eliminada ya no aparece en el listado; al recargar la página tampoco aparece (no persiste en localStorage); el resto de las tareas permanece intacto.

## Observaciones

Ninguna.
