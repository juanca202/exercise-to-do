# TC-011 — Dado que existe una nota registrada, Cuando el usuario guarda cambios en su edición, Entonces el listado refleja el contenido actualizado de forma inmediata

**Perspectiva**: Happy Path
**Automatización**: Automatizable (E2E)
**Prioridad**: Media
**Criterio de aceptación**: AC-008 — Reflejo inmediato en el listado al guardar
**Artefacto padre**: US-002
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- Existe una nota registrada con contenido "Contenido original".

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Contenido actualizado | "Contenido original editado" | [propuesto] |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Edita el contenido de la nota existente y guarda | El sistema actualiza la nota. |
| 2 | Usuario | Observa el listado sin recargar la página | El listado muestra el contenido actualizado de la nota. |

## Resultado esperado final

El listado de notas refleja el contenido editado sin necesidad de recargar la página.

## Observaciones

N/A
