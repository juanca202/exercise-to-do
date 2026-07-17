# TC-016 — Dado que existe una nota registrada con contenido, Cuando el usuario borra todo el contenido en la edición y guarda, Entonces la nota queda registrada sin contenido

**Perspectiva**: Límite
**Automatización**: Automatizable (E2E)
**Prioridad**: Media
**Criterio de aceptación**: AC-011 — Sin contenido mínimo obligatorio
**Artefacto padre**: US-002
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- Existe una nota registrada con contenido "Texto a borrar por completo".

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Contenido final | "" | cadena vacía |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Abre la edición de la nota existente | El área de texto muestra el contenido actual. |
| 2 | Usuario | Borra todo el contenido del área de texto | El área de texto queda vacía. |
| 3 | Usuario | Guarda los cambios | El sistema actualiza la nota sin exigir contenido mínimo. |

## Resultado esperado final

La nota queda registrada con el área de texto vacía, sin error de validación.

## Observaciones

N/A
