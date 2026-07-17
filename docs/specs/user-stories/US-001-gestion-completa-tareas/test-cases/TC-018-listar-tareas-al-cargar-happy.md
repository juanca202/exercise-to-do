# TC-018 — Dado que existen tareas previamente registradas en localStorage, Cuando el usuario abre la aplicación, Entonces todas las tareas registradas se muestran en el listado

**Perspectiva**: Happy Path
**Automatización**: Automatizable (E2E)
**Prioridad**: Alta
**Criterio de aceptación**: AC-011 — Listar todas las tareas registradas al cargar la aplicación
**Artefacto padre**: US-001
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- localStorage contiene al menos tres tareas previamente guardadas con distintos datos.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| 3 tareas preexistentes | descripción, fecha y prioridad variadas | [propuesto] |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | usuario | Abre o recarga la aplicación | La aplicación lee las tareas almacenadas |

## Resultado esperado final

El listado muestra las tres tareas preexistentes con sus datos completos (descripción, fecha de vencimiento, prioridad, estado), ordenadas según AC-009.

## Observaciones

Ninguna.
