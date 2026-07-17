# TC-002 — Dado que existen notas registradas, Cuando el usuario accede a la sección Notes, Entonces ve el listado de notas registradas

**Perspectiva**: Happy Path
**Automatización**: Automatizable (Integration)
**Prioridad**: Media
**Criterio de aceptación**: AC-002 — Acceder a Notes y ver el listado
**Artefacto padre**: US-002
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- Existen al menos 2 notas previamente guardadas en localStorage bajo la clave de notas de la aplicación.
- El usuario está en la aplicación, en cualquier sección.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Nota 1 | "Comprar leche y pan" | [propuesto] |
| Nota 2 | "Llamar al dentista el viernes" | [propuesto] |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Hace clic en la opción "Notes" de la navegación principal | El sistema navega a la sección Notes. |
| 2 | Usuario | Observa el contenido de la sección | Se muestra el listado con las notas registradas ("Comprar leche y pan" y "Llamar al dentista el viernes"). |

## Resultado esperado final

El listado de Notes muestra las notas existentes, cada una identificable por su contenido.

## Observaciones

N/A
