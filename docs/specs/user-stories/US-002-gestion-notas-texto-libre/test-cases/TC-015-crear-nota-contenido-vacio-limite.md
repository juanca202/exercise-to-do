# TC-015 — Dado que el usuario crea una nueva nota, Cuando guarda el área de texto vacía, Entonces la nota se registra sin contenido

**Perspectiva**: Límite
**Automatización**: Automatizable (E2E)
**Prioridad**: Media
**Criterio de aceptación**: AC-011 — Sin contenido mínimo obligatorio
**Artefacto padre**: US-002
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- El usuario está en el formulario de creación de una nueva nota.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Contenido | "" | cadena vacía |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Abre el formulario de creación de nota sin escribir contenido | El área de texto permanece vacía. |
| 2 | Usuario | Guarda la nota | El sistema registra la nota sin exigir contenido mínimo. |

## Resultado esperado final

La nota se guarda exitosamente con el área de texto vacía y aparece en el listado.

## Observaciones

N/A
