# TC-012 — Dado que existe una tarea marcada como completada, Cuando el usuario revierte su estado, Entonces la tarea vuelve a mostrarse como pendiente

**Perspectiva**: Happy Path
**Automatización**: Automatizable (E2E)
**Prioridad**: Media
**Criterio de aceptación**: AC-007 — Marcar una tarea pendiente como completada y revertir ese estado
**Artefacto padre**: US-001
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- Existe al menos una tarea en estado completada.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| N/A | N/A | No aplican datos de prueba específicos |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | usuario | Desactiva el control de completado sobre una tarea completada | El control cambia a estado no marcado |

## Resultado esperado final

La tarea vuelve a mostrarse como pendiente, sin la distinción visual de completada; el cambio persiste tras recargar la página.

## Observaciones

Ninguna.
