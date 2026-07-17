# TC-005 — Dado que el usuario crea una nueva nota, Cuando se abre el formulario de creación, Entonces se muestra únicamente un área de texto

**Perspectiva**: Happy Path
**Automatización**: Automatizable (Integration)
**Prioridad**: Media
**Criterio de aceptación**: AC-004 — Creación muestra únicamente área de texto
**Artefacto padre**: US-002
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- El usuario está en la sección Notes.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| N/A | N/A | No aplican datos de prueba específicos. |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Hace clic en la opción para crear una nueva nota | Se abre el formulario de creación. |
| 2 | Usuario | Observa los campos del formulario | Solo se muestra un área de texto libre; no hay campos adicionales (sin título, sin fecha, sin categoría). |

## Resultado esperado final

El formulario de creación de nota contiene únicamente un área de texto y la acción de guardar.

## Observaciones

N/A
