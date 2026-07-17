## 1. UI modal

- [x] 1.1 Refactorizar `TasksView`: quitar formulario inline; CTA “Nueva tarea” en cabecera; estado `closed | create | edit`
- [x] 1.2 Envolver `TaskForm` en Base UI `Dialog` (títulos Nueva/Editar; Cancelar + submit; cierre Esc/backdrop sin confirmación)
- [x] 1.3 Tras submit válido de create/edit, cerrar el diálogo y actualizar el listado

## 2. Pruebas

- [x] 2.1 Actualizar tests unitarios de `TasksView` para abrir el modal antes de crear/editar/validar
- [x] 2.2 Actualizar E2E (`e2e/tasks.spec.ts`) al flujo modal; cubrir descarte sin confirmación
- [x] 2.3 Verificar Select de prioridad dentro del Dialog (create con prioridad Alta)

## 3. Cierre

- [x] 3.1 Pasar `npm test` / cobertura y `npm run test:e2e`
- [x] 3.2 Pasar lint y `arch:check`
