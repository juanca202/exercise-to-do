# TC-008 — Dado que existe una tarea previamente creada, Cuando el usuario intenta guardar la edición dejando la descripción vacía, Entonces el sistema bloquea el guardado y conserva los valores originales

**Perspectiva**: Error
**Automatización**: Automatizable (E2E)
**Prioridad**: Alta
**Criterio de aceptación**: AC-005 — Editar descripción, fecha de vencimiento y prioridad de una tarea existente
**Artefacto padre**: US-001
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- Existe al menos una tarea en el listado con descripción "Tarea original".

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| nueva descripción | "" | Vacío, valor inválido a probar |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | usuario | Abre el formulario de edición de la tarea | Se muestran los valores actuales precargados |
| 2 | usuario | Borra el contenido del campo descripción | El campo queda vacío |
| 3 | usuario | Intenta confirmar los cambios | El sistema no guarda la edición y muestra un mensaje de error indicando que la descripción es obligatoria |

## Resultado esperado final

La tarea conserva su descripción original en el listado; no se pierden los datos previos.

## Observaciones

Ninguna.
