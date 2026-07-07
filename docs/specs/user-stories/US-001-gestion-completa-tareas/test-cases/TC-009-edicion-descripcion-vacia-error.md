# TC-009 — Intento de edición dejando la descripción vacía

Tipo: Error
Prioridad: Alta
Criterio de aceptación: AC-005 — Editar descripción, fecha de vencimiento y prioridad de una tarea existente
Artefacto padre: US-001
Estado: Ready
Creado por: juanca202
Fecha: 2026-07-06

## Objetivo

Validar que la regla de descripción obligatoria (BR-01) también se aplica al editar una tarea existente, no solo al crearla.

## Precondiciones

- Existe al menos una tarea existente con descripción no vacía.
- El usuario tiene abierto el formulario de edición de esa tarea.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Descripción | "" (vacío) | Se borra el contenido existente del campo |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Abre la tarea existente en modo edición y borra por completo el campo descripción | El campo queda vacío |
| 2 | Usuario | Intenta guardar los cambios | El sistema impide el guardado y señala el campo descripción como obligatorio |

## Resultado esperado final

La tarea conserva su descripción original (no se guarda el valor vacío), y el campo queda marcado como obligatorio/erróneo.

## Observaciones

Ninguna.
