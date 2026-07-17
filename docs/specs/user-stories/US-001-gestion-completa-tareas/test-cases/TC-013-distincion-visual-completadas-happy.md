# TC-013 — Dado un listado con tareas pendientes y completadas, Cuando el usuario visualiza el listado, Entonces las tareas completadas se distinguen visualmente de las pendientes

**Perspectiva**: Happy Path
**Automatización**: Automatizable (Visual Test)
**Prioridad**: Media
**Criterio de aceptación**: AC-008 — Distinguir visualmente las tareas completadas de las pendientes
**Artefacto padre**: US-001
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- El listado contiene al menos una tarea pendiente y una tarea completada.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| N/A | N/A | No aplican datos de prueba específicos |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | usuario | Visualiza el listado completo | Se muestran ambas tareas simultáneamente |

## Resultado esperado final

La tarea completada presenta un tratamiento visual distinto (p. ej. tachado, color atenuado o ícono) respecto a la tarea pendiente, de forma perceptible sin ambigüedad.

## Observaciones

El detalle visual concreto (tachado, color, ícono) queda a criterio del equipo de desarrollo; este TC valida que exista una diferenciación perceptible, no un estilo específico.
