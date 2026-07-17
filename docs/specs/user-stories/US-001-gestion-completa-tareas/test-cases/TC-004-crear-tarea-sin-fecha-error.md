# TC-004 — Dado que el usuario está creando una tarea, Cuando intenta guardarla sin seleccionar fecha de vencimiento, Entonces el sistema bloquea el guardado y muestra un error de validación

**Perspectiva**: Error
**Automatización**: Automatizable (E2E)
**Prioridad**: Alta
**Criterio de aceptación**: AC-003 — No permitir guardar una tarea sin fecha de vencimiento
**Artefacto padre**: US-001
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- Formulario de creación de tarea disponible.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| descripción | "Revisar informe mensual" | [propuesto] |
| fecha de vencimiento | "" | Sin seleccionar, valor inválido a probar |
| prioridad | Alta | [propuesto] |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | usuario | Completa descripción y prioridad | Los campos aceptan los valores |
| 2 | usuario | Deja el campo fecha de vencimiento sin seleccionar | El campo permanece vacío |
| 3 | usuario | Intenta confirmar la creación | El sistema no guarda la tarea y muestra un mensaje de error indicando que la fecha de vencimiento es obligatoria |

## Resultado esperado final

La tarea no se crea; se muestra un mensaje de validación asociado al campo fecha de vencimiento.

## Observaciones

Ninguna.
