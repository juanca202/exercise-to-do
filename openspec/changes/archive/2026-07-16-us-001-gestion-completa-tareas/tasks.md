## 1. Feature scaffold y dominio

- [x] 1.1 Crear estructura `src/features/tasks/` (types, validation, store, components, index público)
- [x] 1.2 Definir tipo `Task` y union `Priority` (`high` | `medium` | `low`) con labels UI en español
- [x] 1.3 Implementar validación pura (descripción trim no vacío, fecha obligatoria, prioridad válida)
- [x] 1.4 Implementar helper de ordenación por prioridad (alta → media → baja) con desempate estable por `createdAt`

## 2. Store Zustand y persistencia

- [x] 2.1 Crear store con estado `tasks` y acciones `addTask`, `updateTask`, `deleteTask`, `toggleComplete`
- [x] 2.2 Integrar middleware `persist` con clave versionada `tasks:v1` hacia `localStorage`
- [x] 2.3 Añadir sanitización/hidratación segura: JSON inválido o prioridades inválidas → lista usable sin crash
- [x] 2.4 Exponer selector `sortedTasks` (o derivar en UI) sin mutar el array persistido

## 3. UI de creación y listado

- [x] 3.1 Construir formulario de creación (descripción, fecha, selector de 3 prioridades) con feedback de errores
- [x] 3.2 Construir listado de tareas con distinción visual de completadas
- [x] 3.3 Añadir acciones por ítem: editar (mismos campos/validaciones), eliminar, marcar/desmarcar completada
- [x] 3.4 Manejar estado vacío del listado y evitar mismatch de hidratación SSR/`localStorage`
- [x] 3.5 Componer la feature en `src/app/page.tsx` (Client Components donde corresponda)

## 4. Pruebas unitarias

- [x] 4.1 Tests de validación (descripción vacía/espacios, fecha ausente, prioridad inválida)
- [x] 4.2 Tests del store: crear, editar, eliminar, toggle complete, ordenación
- [x] 4.3 Tests de persistencia/hidratación: reload simulado y `localStorage` corrupto
- [x] 4.4 Tests de componentes de formulario/listado con Testing Library (errores visibles, empty state)

## 5. Pruebas E2E y cierre

- [x] 5.1 Cubrir flujos E2E alineados a TC-001…TC-019 relevantes (crear, validaciones UI, editar, eliminar, completar, orden, reload, empty)
- [x] 5.2 Verificar que `npm test` / cobertura y E2E Playwright pasan según ADR-003/ADR-004
- [x] 5.3 Ejecutar quality gate local (lint, format, `arch:check` si aplica) antes de dar por cerrado el change
