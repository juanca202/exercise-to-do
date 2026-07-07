# TC-005 — Creación de tareas con cada valor de prioridad permitido

Tipo: Happy Path
Prioridad: Alta
Criterio de aceptación: AC-003 — Prioridad restringida a alta, media o baja
Artefacto padre: US-001
Estado: Ready
Creado por: juanca202
Fecha: 2026-07-06

## Objetivo

Validar que el sistema permite crear tareas con cada uno de los tres valores de prioridad permitidos y que cada una se guarda con el valor seleccionado.

## Precondiciones

- La aplicación está cargada en el navegador, sin tareas previas.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Tarea 1 | Descripción "Tarea alta", fecha 2026-07-10, prioridad Alta [propuesto] | — |
| Tarea 2 | Descripción "Tarea media", fecha 2026-07-11, prioridad Media [propuesto] | — |
| Tarea 3 | Descripción "Tarea baja", fecha 2026-07-12, prioridad Baja [propuesto] | — |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Crea la Tarea 1 seleccionando prioridad Alta | La tarea se guarda con prioridad Alta |
| 2 | Usuario | Crea la Tarea 2 seleccionando prioridad Media | La tarea se guarda con prioridad Media |
| 3 | Usuario | Crea la Tarea 3 seleccionando prioridad Baja | La tarea se guarda con prioridad Baja |

## Resultado esperado final

Las tres tareas existen en el listado, cada una con el valor de prioridad exacto seleccionado (Alta, Media, Baja), sin otros valores posibles disponibles en el control de selección.

## Observaciones

Ninguna.
