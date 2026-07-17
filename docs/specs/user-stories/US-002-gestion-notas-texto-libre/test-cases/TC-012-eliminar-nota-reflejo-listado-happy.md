# TC-012 — Dado que existe una nota registrada, Cuando el usuario la elimina, Entonces el listado deja de mostrarla de forma inmediata

**Perspectiva**: Happy Path
**Automatización**: Automatizable (E2E)
**Prioridad**: Media
**Criterio de aceptación**: AC-009 — Reflejo inmediato en el listado al eliminar
**Artefacto padre**: US-002
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- Existen al menos 2 notas registradas.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Nota a eliminar | "Nota a remover del listado" | [propuesto] |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Elimina una nota existente | El sistema elimina la nota. |
| 2 | Usuario | Observa el listado sin recargar la página | La nota eliminada ya no aparece en el listado. |

## Resultado esperado final

El listado de notas no muestra la nota eliminada inmediatamente después de la acción.

## Observaciones

N/A
