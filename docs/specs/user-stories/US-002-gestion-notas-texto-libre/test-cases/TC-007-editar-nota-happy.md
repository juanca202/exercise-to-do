# TC-007 — Dado que existe una nota registrada, Cuando el usuario edita su contenido y guarda, Entonces la nota queda actualizada

**Perspectiva**: Happy Path
**Automatización**: Automatizable (E2E)
**Prioridad**: Alta
**Criterio de aceptación**: AC-006 — Editar contenido y guardar cambios
**Artefacto padre**: US-002
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- Existe una nota registrada con contenido "Borrador de la nota".

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Contenido nuevo | "Borrador de la nota revisado y corregido" | [propuesto] |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Selecciona la opción de editar sobre la nota existente | Se abre el formulario de edición con el contenido actual. |
| 2 | Usuario | Modifica el contenido del área de texto | El área de texto refleja el nuevo contenido ingresado. |
| 3 | Usuario | Guarda los cambios | El sistema actualiza la nota y regresa al listado. |

## Resultado esperado final

La nota registrada queda con el contenido actualizado.

## Observaciones

La visibilidad inmediata del cambio en el listado se valida en AC-008 (TC-011).
