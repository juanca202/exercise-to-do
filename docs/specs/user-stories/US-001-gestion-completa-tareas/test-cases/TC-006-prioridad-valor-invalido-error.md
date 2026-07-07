# TC-006 — Intento de persistir una tarea con prioridad fuera del dominio permitido

Tipo: Error
Prioridad: Media
Criterio de aceptación: AC-003 — Prioridad restringida a alta, media o baja
Artefacto padre: US-001
Estado: Ready
Creado por: juanca202
Fecha: 2026-07-06

## Objetivo

Validar que el sistema no persiste ni utiliza un valor de prioridad fuera del dominio permitido (alta, media, baja) cuando se fuerza su escritura por fuera del control de UI (p. ej. editando localStorage directamente desde las herramientas de desarrollador).

## Precondiciones

- La aplicación está cargada en el navegador con al menos una tarea existente.
- El usuario tiene acceso a las herramientas de desarrollador del navegador.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Prioridad forzada | "urgente" [propuesto] | Valor fuera del dominio permitido, escrito directamente en el registro de la tarea en localStorage |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Edita manualmente el valor de prioridad de una tarea en localStorage a "urgente" mediante las herramientas de desarrollador | El valor queda escrito en el almacenamiento subyacente |
| 2 | Usuario | Recarga la aplicación | La aplicación no debe romperse (pantalla en blanco o error no controlado) |

## Resultado esperado final

La aplicación maneja el valor de prioridad inválido de forma controlada: lo excluye del ordenamiento por prioridad, lo trata con un valor por defecto documentado, o lo ignora sin interrumpir el listado del resto de tareas.

## Observaciones

Este caso valida resiliencia ante manipulación directa del almacenamiento, no un flujo alcanzable únicamente a través de la UI (el control de selección de prioridad en el formulario ya restringe la entrada a los tres valores válidos).
