# TC-006 — Dado que localStorage contiene una tarea con un valor de prioridad fuera de alta, media o baja, Cuando la aplicación carga los datos, Entonces el sistema descarta o normaliza ese valor conforme a la regla de negocio

**Perspectiva**: Error
**Automatización**: Automatizable (Unit)
**Prioridad**: Media
**Criterio de aceptación**: AC-004 — Restringir la prioridad a alta, media o baja
**Artefacto padre**: US-001
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- La clave de localStorage usada por la aplicación para las tareas contiene un registro con un valor de prioridad fuera del dominio permitido, inyectado manualmente antes de cargar la aplicación.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| prioridad almacenada | "urgente" | Valor fuera de dominio (alta/media/baja). [propuesto] |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | sistema | Lee las tareas almacenadas en localStorage al iniciar | El sistema procesa el registro con prioridad inválida |
| 2 | sistema | Evalúa el valor de prioridad contra el dominio permitido (alta/media/baja) | El sistema detecta que el valor no pertenece al dominio válido |
| 3 | sistema | Aplica el tratamiento definido (descartar el registro o normalizarlo) sin interrumpir la carga del resto de tareas | La aplicación continúa funcionando sin errores no controlados |

## Resultado esperado final

La aplicación no se rompe ni permite que una tarea con prioridad inválida se muestre como tal en el listado ordenado por prioridad; el resto de las tareas válidas se cargan con normalidad.

## Observaciones

La US no especifica si el tratamiento correcto es descartar o normalizar el registro; el equipo de desarrollo debe decidirlo en la implementación (TK-XXX) y este TC debe ajustarse al comportamiento elegido antes de ejecutarse.
