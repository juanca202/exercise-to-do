# TC-014 — Dado un listado con tareas de prioridad alta, media y baja, Cuando el usuario visualiza el listado por primera vez, Entonces las tareas se muestran ordenadas de alta a baja

**Perspectiva**: Happy Path
**Automatización**: Automatizable (E2E)
**Prioridad**: Alta
**Criterio de aceptación**: AC-009 — Ordenar el listado por prioridad de forma predeterminada
**Artefacto padre**: US-001
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- Existen al menos tres tareas: una de prioridad alta, una de prioridad media y una de prioridad baja, creadas en orden no secuencial (p. ej. baja, alta, media).

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Tarea A | prioridad Baja | Creada primero. [propuesto] |
| Tarea B | prioridad Alta | Creada segundo. [propuesto] |
| Tarea C | prioridad Media | Creada tercero. [propuesto] |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | usuario | Carga o recarga el listado | Se muestran las tres tareas |

## Resultado esperado final

El listado muestra primero la Tarea B (prioridad alta), luego la Tarea C (prioridad media) y por último la Tarea A (prioridad baja), sin que el usuario aplique ningún filtro u ordenamiento manual.

## Observaciones

Ninguna.
