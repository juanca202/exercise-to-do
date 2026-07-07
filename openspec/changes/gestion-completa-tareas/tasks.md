## 1. Modelo y store del feature `tasks`

- [ ] 1.1 Crear `src/features/tasks/` y definir el tipo `Priority` (`"alta" | "media" | "baja"`) y la interfaz `Task` (`id`, `description`, `dueDate`, `priority`, `completed`).
- [ ] 1.2 Crear el store Zustand del feature (`useTaskStore`) con acciones `addTask`, `editTask`, `removeTask`, `toggleTask`, generando `id` con `crypto.randomUUID()`.
- [ ] 1.3 Envolver el store con el middleware `persist` de Zustand (`createJSONStorage(() => localStorage)`), `skipHydration: true` y un `storage` custom que capture errores de `JSON.parse` y recurra a lista vacía ante datos corruptos.
- [ ] 1.4 Implementar funciones puras de validación: `validateDescription`, `validateDueDate`, `validatePriority`.
- [ ] 1.5 Implementar el helper de orden (`sortTasksByPriority`) que mapea prioridad a rango numérico (alta:0, media:1, baja:2) y ordena con `Array.prototype.sort`.

## 2. Componentes de UI del feature `tasks`

- [ ] 2.1 Añadir a `src/shared/ui/` los primitivos genéricos necesarios (input de texto, input de fecha, select de prioridad) basados en Base UI + Tailwind, siguiendo el estilo de `checkbox.tsx`.
- [ ] 2.2 Crear `TaskForm` en `src/features/tasks/components/` reutilizable para creación y edición, con validación en el `submit` y mensajes de error por campo.
- [ ] 2.3 Crear `TaskItem` que muestre descripción, fecha de vencimiento, prioridad, el `Checkbox` de completada/pendiente y la acción de eliminar, con estilo visual distinto para tareas completadas (BR-04).
- [ ] 2.4 Crear `TaskList` que consuma el store, aplique `sortTasksByPriority` y renderice `TaskItem` por cada tarea.
- [ ] 2.5 Crear `TasksPage` (componente raíz del feature) que orqueste `TaskForm` (alta/edición) y `TaskList`, incluyendo el estado de carga mientras se rehidrata `localStorage`.

## 3. Persistencia y resiliencia

- [ ] 3.1 Disparar `useTaskStore.persist.rehydrate()` en un `useEffect` de `TasksPage` y exponer un flag de hidratación (p. ej. `hasHydrated`) para no renderizar el listado real hasta que la rehidratación concluya.
- [ ] 3.2 Verificar manualmente en el navegador el caso de datos corruptos: escribir un valor no-JSON en la clave de `localStorage` usada por el store y confirmar que la aplicación carga sin errores no controlados.
- [ ] 3.3 Verificar manualmente el caso de primera visita (storage limpio): confirmar listado vacío sin errores en consola.

## 4. Integración en la aplicación

- [ ] 4.1 Reemplazar el contenido de `src/app/page.tsx` para renderizar `TasksPage` del feature `tasks` en lugar de `HomePage`.
- [ ] 4.2 Eliminar `src/features/home/` (placeholder del template) y sus pruebas asociadas.
- [ ] 4.3 Eliminar `src/shared/stores/task-store.ts` (reemplazado por el store dentro de `src/features/tasks/`).

## 5. Pruebas

- [ ] 5.1 Actualizar `src/shared/test/object-mother/task.mother.ts` al nuevo modelo `Task` (`description`, `dueDate`, `priority`, `completed`).
- [ ] 5.2 Escribir pruebas unitarias del store (`addTask`, `editTask`, `removeTask`, `toggleTask`, validaciones, `sortTasksByPriority`, incluyendo el caso de orden estable con igual prioridad).
- [ ] 5.3 Escribir pruebas unitarias de `TaskForm` (bloqueo de guardado con descripción/fecha vacía, valores límite: descripción de un carácter, fecha igual a hoy, prioridad inválida rechazada).
- [ ] 5.4 Escribir pruebas unitarias de `TaskList`/`TaskItem` (orden por prioridad, distinción visual de completadas, eliminación, marcado/reversión de completada, caso de única tarea eliminada).
- [ ] 5.5 Actualizar/crear el e2e de Playwright (`e2e/home.spec.ts` o su reemplazo) cubriendo el flujo completo: crear, editar, completar, revertir, eliminar y persistencia tras recarga.

## 6. Cierre

- [ ] 6.1 Ejecutar `npm run lint`, `npm run test` y `npm run test:e2e`, confirmando cobertura de los AC-001 a AC-011 de US-001.
- [ ] 6.2 Ejecutar `openspec validate gestion-completa-tareas --strict` (o equivalente) antes de solicitar `work-implement`/aprobación.
