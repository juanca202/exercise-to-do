# TC-002 — Dado que el usuario está creando una tarea, Cuando intenta guardarla sin ingresar descripción, Entonces el sistema bloquea el guardado y muestra un error de validación

**Perspectiva**: Error
**Automatización**: Automatizable (E2E)
**Prioridad**: Alta
**Criterio de aceptación**: AC-002 — No permitir guardar una tarea sin descripción
**Artefacto padre**: US-001
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- La aplicación está cargada.
- El usuario tiene el formulario de creación de tarea abierto.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| descripción | "" | Vacío, valor inválido a probar |
| fecha de vencimiento | 2026-07-20 | [propuesto] |
| prioridad | Media | [propuesto] |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | usuario | Deja el campo descripción vacío | El campo permanece vacío |
| 2 | usuario | Completa fecha de vencimiento y prioridad | Los campos aceptan los valores |
| 3 | usuario | Intenta confirmar la creación | El sistema no guarda la tarea y muestra un mensaje de error indicando que la descripción es obligatoria |

## Resultado esperado final

La tarea no se crea; el listado permanece sin cambios; se muestra un mensaje de validación asociado al campo descripción.

## Observaciones

Ninguna.
