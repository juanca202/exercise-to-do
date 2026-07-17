# TC-011 — Dado que existe una tarea pendiente en el listado, Cuando el usuario la marca como completada, Entonces la tarea cambia a estado completada y se refleja en el listado

**Perspectiva**: Happy Path
**Automatización**: Automatizable (E2E)
**Prioridad**: Alta
**Criterio de aceptación**: AC-007 — Marcar una tarea pendiente como completada y revertir ese estado
**Artefacto padre**: US-001
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- Existe al menos una tarea en estado pendiente.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| N/A | N/A | No aplican datos de prueba específicos |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | usuario | Activa el control de completado (checkbox/botón) sobre una tarea pendiente | El control cambia a estado marcado |

## Resultado esperado final

La tarea queda registrada como completada y se distingue visualmente de las pendientes (ver AC-008); el cambio persiste tras recargar la página.

## Observaciones

Ninguna.
