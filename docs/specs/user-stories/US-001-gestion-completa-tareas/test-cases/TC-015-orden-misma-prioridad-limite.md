# TC-015 — Dado un listado con varias tareas de la misma prioridad, Cuando el usuario visualiza el listado, Entonces todas las tareas de esa prioridad se muestran agrupadas dentro de su nivel correspondiente

**Perspectiva**: Límite
**Automatización**: Automatizable (E2E)
**Prioridad**: Baja
**Criterio de aceptación**: AC-009 — Ordenar el listado por prioridad de forma predeterminada
**Artefacto padre**: US-001
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- Existen al menos dos tareas con prioridad "Media" y una tarea con prioridad "Alta".

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Tarea A | prioridad Media | [propuesto] |
| Tarea B | prioridad Media | [propuesto] |
| Tarea C | prioridad Alta | [propuesto] |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | usuario | Carga el listado | Se muestran las tres tareas |

## Resultado esperado final

La Tarea C (Alta) aparece antes que las Tareas A y B (Media); ambas tareas de prioridad Media aparecen agrupadas entre sí, respetando el orden alta → media → baja.

## Observaciones

La US no define un criterio de desempate entre tareas de igual prioridad (p. ej. por fecha de creación o de vencimiento); este TC solo valida la agrupación por nivel de prioridad, no un orden interno específico dentro del mismo nivel.
