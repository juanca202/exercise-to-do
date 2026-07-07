# TC-021 — Acceso directo a la aplicación sin autenticación

Tipo: Happy Path
Prioridad: Media
Criterio de aceptación: AC-011 — Sin autenticación ni identificación de usuario
Artefacto padre: US-001
Estado: Ready
Creado por: juanca202
Fecha: 2026-07-06

## Objetivo

Validar que el usuario puede acceder a la aplicación y gestionar sus tareas de inmediato, sin pasar por ningún flujo de login, registro o identificación.

## Precondiciones

- El usuario no ha iniciado sesión en ningún sistema (no aplica, la aplicación no tiene autenticación).

## Datos de prueba

N/A

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Navega a la URL de la aplicación | Se muestra directamente el listado de tareas (o el estado vacío), sin redirección a login/registro |
| 2 | Usuario | Crea, edita, elimina o completa una tarea sin haberse identificado | Todas las acciones se ejecutan con normalidad |

## Resultado esperado final

El usuario gestiona sus tareas de forma completa desde el primer acceso, sin que la aplicación solicite credenciales ni identificación en ningún punto del flujo.

## Observaciones

Ninguna.
