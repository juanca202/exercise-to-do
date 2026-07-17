# TC-019 — Dado que no existen tareas registradas en localStorage, Cuando el usuario abre la aplicación por primera vez, Entonces el listado se muestra vacío sin errores

**Perspectiva**: Límite
**Automatización**: Automatizable (E2E)
**Prioridad**: Media
**Criterio de aceptación**: AC-011 — Listar todas las tareas registradas al cargar la aplicación
**Artefacto padre**: US-001
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- localStorage no contiene ninguna tarea (primera visita o almacenamiento limpio).

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| N/A | N/A | No aplican datos de prueba específicos |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | usuario | Abre la aplicación | La aplicación intenta leer tareas desde localStorage y no encuentra ninguna |

## Resultado esperado final

Se muestra un listado vacío (o un estado vacío equivalente) sin errores ni tareas fantasma; la aplicación permanece lista para crear la primera tarea.

## Observaciones

Ninguna.
