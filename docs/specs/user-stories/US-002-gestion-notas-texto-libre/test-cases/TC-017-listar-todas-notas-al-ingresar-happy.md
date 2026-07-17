# TC-017 — Dado que existen varias notas registradas, Cuando el usuario ingresa a la sección Notes, Entonces el sistema lista todas las notas registradas

**Perspectiva**: Happy Path
**Automatización**: Automatizable (Integration)
**Prioridad**: Alta
**Criterio de aceptación**: AC-012 — Listar todas las notas al ingresar
**Artefacto padre**: US-002
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- Existen 3 notas previamente registradas en localStorage.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Nota 1 | "Primera nota" | [propuesto] |
| Nota 2 | "Segunda nota" | [propuesto] |
| Nota 3 | "Tercera nota" | [propuesto] |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Ingresa a la sección Notes | El sistema carga la sección. |
| 2 | Usuario | Observa el listado | Las 3 notas registradas se muestran en el listado, sin omitir ninguna. |

## Resultado esperado final

El listado de Notes muestra la totalidad de las notas registradas al momento de ingresar a la sección.

## Observaciones

N/A
