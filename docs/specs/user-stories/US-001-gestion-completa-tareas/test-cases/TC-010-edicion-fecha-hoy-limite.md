# TC-010 — Edición de la fecha de vencimiento al valor límite (hoy)

Tipo: Límite
Prioridad: Media
Criterio de aceptación: AC-005 — Editar descripción, fecha de vencimiento y prioridad de una tarea existente
Artefacto padre: US-001
Estado: Ready
Creado por: juanca202
Fecha: 2026-07-06

## Objetivo

Validar que, al editar una tarea, el sistema acepta actualizar la fecha de vencimiento al valor límite igual a la fecha actual.

## Precondiciones

- Existe al menos una tarea existente con una fecha de vencimiento futura.
- Se conoce la fecha actual del sistema (referencia: 2026-07-06).

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Nueva fecha de vencimiento | 2026-07-06 (fecha actual) | Límite: coincide con "hoy" |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Abre la tarea existente en modo edición y cambia la fecha de vencimiento a la fecha actual | El campo acepta el valor sin marcarlo como inválido |
| 2 | Usuario | Guarda los cambios | El sistema confirma el guardado sin errores |

## Resultado esperado final

La tarea queda con la fecha de vencimiento igual a la fecha actual, reflejada en el listado y persistida en localStorage.

## Observaciones

Ninguna.
