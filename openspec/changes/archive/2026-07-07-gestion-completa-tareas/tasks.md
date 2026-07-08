## 1. Limpieza de código huérfano

- [x] 1.1 Confirmar por `grep` que `src/shared/stores/task-store.ts` y `src/shared/ui/checkbox.tsx` no tienen consumidores actuales
- [x] 1.2 Eliminar `src/shared/stores/task-store.ts` y `src/shared/stores/task-store.test.ts`
- [x] 1.3 Eliminar `src/shared/ui/checkbox.tsx` y `src/shared/ui/checkbox.test.tsx`
- [x] 1.4 Eliminar `src/shared/test/object-mother/task.mother.ts` (se recrea equivalente dentro de la feature si hace falta)

## 2. Modelo y store de la feature

- [x] 2.1 Crear `src/features/tasks/types.ts` con los tipos `Priority` y `Task`
- [x] 2.2 Crear `src/features/tasks/lib/validate-task.ts` con la validación de `description` (no vacía tras trim) y `dueDate` (obligatoria, no anterior a hoy)
- [x] 2.3 Crear `src/features/tasks/lib/sort-tasks.ts` con `sortTasks(tasks): Task[]` (estado → prioridad → `createdAt` FIFO), sin mutar el array de entrada
- [x] 2.4 Crear `src/features/tasks/stores/task-store.ts` con Zustand + middleware `persist` (localStorage), acciones `addTask`, `updateTask`, `removeTask`, `toggleCompleted`
- [x] 2.5 Manejar en el store la recuperación ante `localStorage` con JSON inválido o forma inesperada (fallback a `tasks: []`)

## 3. Componentes de UI

- [x] 3.1 Crear `src/features/tasks/components/task-form-dialog.tsx` (modal de alta/edición sobre `Dialog` de Base UI: descripción, fecha, prioridad)
- [x] 3.2 Crear `src/features/tasks/components/delete-confirm-dialog.tsx` (modal de confirmación antes de eliminar)
- [x] 3.3 Crear `src/features/tasks/components/task-item.tsx` (fila de tarea: checkbox de completada, descripción, fecha, badge de prioridad, acciones editar/eliminar, distinción visual de completada)
- [x] 3.4 Crear `src/features/tasks/components/task-list.tsx` (lista ordenada vía `sortTasks`, estado vacío "sin tareas")
- [x] 3.5 Crear `src/features/tasks/components/tasks-page.tsx` como contenedor de la feature (botón "nueva tarea" + `task-list`)
- [x] 3.6 Aplicar los tokens de `DESIGN.md` ("Precision Focus": color, tipografía, spacing, radios) vía Tailwind

## 4. Integración en la app

- [x] 4.1 Reemplazar el contenido de `src/app/page.tsx` (o la ruta correspondiente) para renderizar `tasks-page.tsx` en lugar del scaffold de `create-next-app`
- [x] 4.2 Retirar el uso de `src/features/home/components/home-page.tsx` si queda sin propósito, o dejarlo documentado si se conserva como ejemplo

## 5. Pruebas unitarias (Vitest + Testing Library)

- [x] 5.1 Tests de `validate-task.ts`: descripción vacía, un carácter válido, fecha vacía, fecha anterior a hoy, fecha igual a hoy, prioridad inválida
- [x] 5.2 Tests de `sort-tasks.ts`: orden por prioridad, empate FIFO, agrupación de completadas al final
- [x] 5.3 Tests de `task-store.ts`: alta, edición, eliminación, toggle completada, recuperación ante `localStorage` corrupto o con forma inesperada
- [x] 5.4 Tests de `task-list.tsx` / `task-item.tsx`: distinción visual de completadas, estado vacío
- [x] 5.5 Tests de `task-form-dialog.tsx`: validación en creación y edición, precarga de valores al editar
- [x] 5.6 Tests de `delete-confirm-dialog.tsx`: eliminación confirmada vs. cancelada
- [x] 5.7 Verificar cobertura ≥ 80% (líneas/branches/funciones/statements) con `npm run test:coverage`

## 6. Verificación de quality gate y ADRs

- [x] 6.1 `npm run lint` sin errores (incluye regla TSDoc de ADR-006)
- [x] 6.2 `npm run format:check` sin diffs
- [x] 6.3 Ejecutar `src/architecture/adr-005-feature-isolation.test.ts` y confirmar que sigue en verde con la nueva feature `tasks`
- [x] 6.4 `npm run build` sin errores
