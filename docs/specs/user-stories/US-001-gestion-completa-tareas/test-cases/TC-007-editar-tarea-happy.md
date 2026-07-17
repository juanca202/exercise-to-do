# TC-007 — Dado que existe una tarea previamente creada, Cuando el usuario edita su descripción, fecha de vencimiento y prioridad y confirma los cambios, Entonces la tarea se actualiza con los nuevos valores

**Perspectiva**: Happy Path
**Automatización**: Automatizable (E2E)
**Prioridad**: Alta
**Criterio de aceptación**: AC-005 — Editar descripción, fecha de vencimiento y prioridad de una tarea existente
**Artefacto padre**: US-001
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- Existe al menos una tarea en el listado con descripción "Tarea original", fecha de vencimiento 2026-07-18 y prioridad Media.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| nueva descripción | "Tarea original (actualizada)" | [propuesto] |
| nueva fecha de vencimiento | 2026-07-25 | [propuesto] |
| nueva prioridad | Alta | [propuesto] |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | usuario | Selecciona la opción editar sobre la tarea existente | Se abre el formulario de edición con los valores actuales precargados |
| 2 | usuario | Modifica descripción, fecha de vencimiento y prioridad | Los campos reflejan los nuevos valores ingresados |
| 3 | usuario | Confirma los cambios | El formulario se cierra sin errores |

## Resultado esperado final

El listado muestra la tarea con la descripción, fecha de vencimiento y prioridad actualizadas; los cambios persisten tras recargar la página.

## Observaciones

Ninguna.
