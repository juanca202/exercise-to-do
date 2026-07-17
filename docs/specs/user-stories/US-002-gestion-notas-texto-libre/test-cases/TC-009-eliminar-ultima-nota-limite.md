# TC-009 — Dado que existe una única nota registrada, Cuando el usuario la elimina, Entonces el sistema queda sin notas registradas

**Perspectiva**: Límite
**Automatización**: Automatizable (E2E)
**Prioridad**: Media
**Criterio de aceptación**: AC-007 — Eliminar una nota existente
**Artefacto padre**: US-002
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- Existe exactamente 1 nota registrada.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Nota única | "Última nota antes de vaciar el listado" | [propuesto] |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Selecciona la opción de eliminar sobre la única nota existente | El sistema elimina la nota. |

## Resultado esperado final

El sistema queda sin notas registradas, sin errores; el listado se muestra vacío.

## Observaciones

N/A
