# TC-010 — Dado que el usuario está en la sección Notes, Cuando guarda una nota nueva, Entonces el listado la refleja de forma inmediata

**Perspectiva**: Happy Path
**Automatización**: Automatizable (E2E)
**Prioridad**: Media
**Criterio de aceptación**: AC-008 — Reflejo inmediato en el listado al guardar
**Artefacto padre**: US-002
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- El usuario está en la sección Notes con al menos una nota previa.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Contenido de la nota nueva | "Nota agregada para validar reflejo inmediato" | [propuesto] |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Crea una nueva nota con contenido válido y guarda | El sistema guarda la nota. |
| 2 | Usuario | Observa el listado sin recargar la página | La nueva nota aparece en el listado inmediatamente. |

## Resultado esperado final

El listado de notas incluye la nota recién creada sin necesidad de recargar la página.

## Observaciones

N/A
