# TC-010 — Dado que existe una única tarea en el listado, Cuando el usuario la elimina, Entonces el listado queda vacío y se muestra el estado correspondiente

**Perspectiva**: Límite
**Automatización**: Automatizable (E2E)
**Prioridad**: Media
**Criterio de aceptación**: AC-006 — Eliminar una tarea existente
**Artefacto padre**: US-001
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- El listado contiene exactamente una tarea.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| N/A | N/A | No aplican datos de prueba específicos |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | usuario | Elimina la única tarea existente | La tarea se elimina |

## Resultado esperado final

El listado queda vacío; localStorage no contiene tareas; la aplicación permanece funcional para crear una nueva tarea.

## Observaciones

Ninguna.
