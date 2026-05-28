# Progreso — US-001: Gestión básica de tareas

- Rama: `feature/US-001-gestion-basica-tareas`
- Última actualización: 2026-05-27

## Tareas

### TK-001 — Modelo y persistencia de tareas

- **Estado:** Done
- **Notas:** `lib/todos` verificado frente al plan (tipos, validación, `storage`, `factory`, `index`, pruebas en `lib/todos/*.test.ts`). Lint y `tsc --noEmit` OK.

### TK-002 — Formulario de creación y edición de tareas

- **Estado:** Done
- **Notas:** `components/todo-form.tsx` y contenedor `components/todos-shell.tsx` integrados en `app/page.tsx`. Modo edición cableado vía props; la selección desde listado queda para TK-003.

### TK-003 — Listado y eliminación de tareas

- **Estado:** Done
- **Notas:** `todo-list.tsx`, `todos-app.tsx` y `app/page.tsx` integrados. `persist` usa actualización funcional para una sola fuente de verdad antes de `saveTodos`. Build OK.

## Decisiones adicionales

- Antes de `story-implement`, el working tree tenía cambios mezclados; el usuario eligió un commit único (`3685b91`) con dominio y docs.
- Se restauraron `app/layout.tsx` y `app/page.tsx` (estaban borrados accidentalmente) y no se incluyeron en ese commit.
- Las pruebas de TK-001 viven en `lib/todos/*.test.ts` en lugar de `lib/todos/__tests__/`; misma cobertura prevista.
- `TodosShell` muestra solo un contador de tareas hasta TK-003; `key` en `TodoForm` evita sincronizar estado con `useEffect`.
- Fase de pruebas: tests de componentes en `components/*.test.tsx` cubriendo SC-01 a SC-05 (28 tests en suite, todos pasan).
