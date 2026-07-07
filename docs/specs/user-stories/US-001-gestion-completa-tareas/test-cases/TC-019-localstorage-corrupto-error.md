# TC-019 — Datos corruptos en localStorage no rompen la aplicación

Tipo: Error
Prioridad: Media
Criterio de aceptación: AC-010 — Persistencia en localStorage de creación, edición, eliminación y cambio de estado
Artefacto padre: US-001
Estado: Ready
Creado por: juanca202
Fecha: 2026-07-06

## Objetivo

Validar que la aplicación maneja de forma controlada un valor no parseable (JSON inválido) almacenado bajo la clave de tareas en localStorage, sin romper la carga de la aplicación.

## Precondiciones

- El usuario tiene acceso a las herramientas de desarrollador del navegador.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Valor en localStorage | "{tareas: invalido," (JSON malformado) [propuesto] | Escrito directamente en la clave usada por la aplicación para persistir tareas |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Escribe un valor JSON inválido en la clave de localStorage usada por la aplicación, mediante las herramientas de desarrollador | El valor queda almacenado tal cual, sin validación previa |
| 2 | Usuario | Recarga o abre la aplicación | La aplicación intenta leer el valor almacenado |

## Resultado esperado final

La aplicación carga sin pantalla en blanco ni error no controlado visible al usuario; como mínimo, muestra un listado vacío o recupera un estado por defecto, sin interrumpir el uso de la aplicación.

## Observaciones

Este caso valida resiliencia ante corrupción externa del almacenamiento (no alcanzable desde la UI normal de la aplicación).
