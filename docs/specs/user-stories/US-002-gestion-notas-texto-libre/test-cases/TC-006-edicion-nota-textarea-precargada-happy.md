# TC-006 — Dado que existe una nota registrada, Cuando el usuario abre su edición, Entonces el área de texto se muestra precargada con el contenido actual

**Perspectiva**: Happy Path
**Automatización**: Automatizable (Integration)
**Prioridad**: Media
**Criterio de aceptación**: AC-005 — Edición muestra área de texto precargada
**Artefacto padre**: US-002
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- Existe una nota registrada con contenido "Reunión con el equipo a las 10am".

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Contenido existente | "Reunión con el equipo a las 10am" | [propuesto] |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Selecciona la opción de editar sobre la nota existente | Se abre el formulario de edición. |
| 2 | Usuario | Observa el área de texto | El área de texto muestra precargado el contenido "Reunión con el equipo a las 10am"; no hay campos adicionales. |

## Resultado esperado final

El formulario de edición muestra únicamente el área de texto, precargada con el contenido actual de la nota.

## Observaciones

N/A
