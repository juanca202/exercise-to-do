# TC-020 — Primera visita sin datos previos en localStorage

Tipo: Límite
Prioridad: Media
Criterio de aceptación: AC-010 — Persistencia en localStorage de creación, edición, eliminación y cambio de estado
Artefacto padre: US-001
Estado: Ready
Creado por: juanca202
Fecha: 2026-07-06

## Objetivo

Validar el comportamiento del sistema en el caso límite de cardinalidad cero: primera visita del usuario, sin ninguna clave previa de tareas en localStorage.

## Precondiciones

- El navegador no tiene ninguna clave previa de tareas en localStorage para la aplicación (almacenamiento limpio).

## Datos de prueba

N/A

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Abre la aplicación por primera vez, sin datos previos en localStorage | La aplicación carga sin errores |

## Resultado esperado final

La aplicación muestra un listado vacío (sin tareas) y queda lista para que el usuario cree su primera tarea, sin errores en consola.

## Observaciones

Ninguna.
