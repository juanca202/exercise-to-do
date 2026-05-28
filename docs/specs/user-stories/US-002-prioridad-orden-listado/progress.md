# Progreso — US-002: Prioridad y orden del listado

- Rama: `feature/US-002-prioridad-orden-listado`
- Última actualización: 2026-05-27

## Tareas

### TK-001 — Orden por prioridad en el listado

- **Estado:** Done
- **Notas:** `sortTodosByPriority` ya existía en `lib/todos`; integrado en `todos-app.tsx` al cargar y tras cada mutación. Badges en `todo-list.tsx` ya cumplían BR-02. Tests US-002 en `todos-app.test.tsx`. 32 tests pasan.

## Decisiones adicionales

- Se commiteó US-001 (`eda75ac`) antes de abrir `feature/US-002-prioridad-orden-listado` desde esa rama.
- El orden ordenado se persiste en `localStorage` tras cada mutación (mismo array que muestra el listado).
