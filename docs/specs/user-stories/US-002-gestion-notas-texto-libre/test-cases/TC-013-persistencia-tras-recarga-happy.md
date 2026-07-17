# TC-013 — Dado que el usuario registró una nota, Cuando recarga la página, Entonces la nota sigue disponible

**Perspectiva**: Happy Path
**Automatización**: Automatizable (E2E)
**Prioridad**: Alta
**Criterio de aceptación**: AC-010 — Persistencia en localStorage tras recargar
**Artefacto padre**: US-002
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- El usuario está en la sección Notes, con o sin notas previas.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Contenido de la nota | "Nota que debe persistir tras recargar" | [propuesto] |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Crea una nota con contenido válido y guarda | El sistema registra la nota. |
| 2 | Usuario | Recarga la página del navegador | La aplicación vuelve a cargar. |
| 3 | Usuario | Accede a la sección Notes | La nota creada previamente sigue presente en el listado. |

## Resultado esperado final

La nota persiste tras recargar la página, obtenida desde localStorage.

## Observaciones

N/A
