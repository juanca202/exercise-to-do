# TC-008 — Dado que existe una nota registrada, Cuando el usuario la elimina, Entonces la nota deja de existir en el sistema

**Perspectiva**: Happy Path
**Automatización**: Automatizable (E2E)
**Prioridad**: Alta
**Criterio de aceptación**: AC-007 — Eliminar una nota existente
**Artefacto padre**: US-002
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- Existen al menos 2 notas registradas.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Nota a eliminar | "Nota temporal de prueba" | [propuesto] |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Selecciona la opción de eliminar sobre una nota existente | El sistema elimina la nota. |

## Resultado esperado final

La nota eliminada ya no existe en el sistema (no se recupera al recargar).

## Observaciones

La desaparición inmediata del listado se valida en AC-009 (TC-012).
