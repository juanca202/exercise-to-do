# TC-017 — Dado que el valor almacenado en localStorage para las tareas no es un JSON válido, Cuando la aplicación intenta cargar los datos, Entonces el sistema maneja el error sin interrumpir la aplicación

**Perspectiva**: Error
**Automatización**: Automatizable (Unit)
**Prioridad**: Media
**Criterio de aceptación**: AC-010 — Persistir las tareas en localStorage
**Artefacto padre**: US-001
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- La clave de localStorage usada por la aplicación para las tareas contiene un valor no parseable como JSON.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| valor en localStorage | "{tareas-corruptas" | Cadena no parseable como JSON. [propuesto] |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | sistema | Intenta parsear el valor almacenado al iniciar la aplicación | El parseo falla |
| 2 | sistema | Captura el error de parseo | La aplicación no se detiene ni muestra una pantalla en blanco |

## Resultado esperado final

La aplicación se carga mostrando un listado vacío (o el estado de recuperación que el equipo defina), sin lanzar una excepción no controlada visible al usuario.

## Observaciones

El comportamiento exacto de recuperación (listado vacío vs. mensaje de error) no está definido en la US; se documenta como decisión técnica pendiente para TK-XXX.
