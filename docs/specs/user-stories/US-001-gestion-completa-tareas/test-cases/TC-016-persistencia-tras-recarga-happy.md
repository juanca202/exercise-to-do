# TC-016 — Dado que el usuario creó una o más tareas, Cuando recarga la página del navegador, Entonces las tareas creadas siguen disponibles en el listado

**Perspectiva**: Happy Path
**Automatización**: Automatizable (E2E)
**Prioridad**: Alta
**Criterio de aceptación**: AC-010 — Persistir las tareas en localStorage
**Artefacto padre**: US-001
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- El usuario creó al menos una tarea en la sesión actual.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| N/A | N/A | No aplican datos de prueba específicos |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | usuario | Recarga la página (F5 o navegación completa) | La aplicación se vuelve a cargar |

## Resultado esperado final

El listado muestra las mismas tareas que existían antes de la recarga, con sus datos y estados (completada/pendiente) intactos.

## Observaciones

Ninguna.
