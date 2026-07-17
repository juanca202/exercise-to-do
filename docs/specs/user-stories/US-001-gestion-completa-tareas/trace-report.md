# Reporte de trazabilidad — US-001-gestion-completa-tareas

**Fecha**: 2026-07-17 00:35
**Trabajo**: US-001 · **Documento**: [docs/specs/user-stories/US-001-gestion-completa-tareas/README.md](README.md)
**Tipo**: historia de usuario
**Rama**: feature/lab-openspec-superpowers
**Cobertura**: 8 de 11 criterios cubiertos (73%) — 3 en estado Parcial
**Veredicto**: ⚠️ Aprobado con observaciones

## Resumen

8 de los 11 criterios de aceptación quedan **Cubiertos** con artefactos automatizados que pasan (58/58 unit, 28/28 e2e a nivel de rama). Los otros 3 (AC-005, AC-006, AC-011) quedan **Parcial**: en los tres casos, uno de sus dos casos de prueba está genuinamente cubierto, pero el otro no tiene ningún artefacto que valide el escenario exacto que describe (edición con descripción vacía preservando el original; eliminación con al menos dos tareas verificando que el resto permanece; listado completo tras abrir/recargar con datos preexistentes en localStorage). Ningún test falló ni hay criterios en `No cubierto`.

## Matriz de trazabilidad

| Criterio | Descripción | Caso(s) de prueba | Artefactos | Estado | Automática | Resultado | Observaciones |
|----------|-------------|-------------------|------------|--------|------------|-----------|---------------|
| AC-001 | Crear tarea con descripción, fecha y prioridad | TC-001 | `e2e/tasks.spec.ts:34` (e2e) · `tasks-view.test.tsx:30` (integración, extra) | Cubierto | Sí | Paso | — |
| AC-002 | NO DEBE permitir guardar sin descripción | TC-002, TC-003 | `e2e/tasks.spec.ts:51` (e2e, TC-002) · `validation.test.ts:26` (unit, TC-003) | Cubierto | Sí | Paso | — |
| AC-003 | NO DEBE permitir guardar sin fecha de vencimiento | TC-004 | `e2e/tasks.spec.ts:63` (e2e) | Cubierto | Sí | Paso | — |
| AC-004 | Prioridad restringida a alta/media/baja | TC-005, TC-006 | `e2e/tasks.spec.ts:73` (e2e, TC-005) · `store.test.ts:108` (unit, TC-006, `sanitizeTask`) | Cubierto | Sí | Paso | — |
| AC-005 | Editar descripción, fecha y prioridad de una tarea existente | TC-007, TC-008 | `e2e/tasks.spec.ts:83` (e2e, TC-007) | **Parcial** | Sí (solo TC-007) | Paso (TC-007) | TC-008 (editar dejando la descripción vacía, verificar bloqueo y que se conservan los valores originales) **no tiene artefacto**: los tests existentes que muestran "La descripción es obligatoria" (`tasks-view.test.tsx:68`, `e2e/tasks.spec.ts:57`) validan la **creación** con descripción vacía (AC-002/TC-002), no la edición de una tarea ya existente. |
| AC-006 | Eliminar una tarea existente | TC-009, TC-010 | `e2e/tasks.spec.ts:99` (e2e, cubre TC-010) | **Parcial** | Sí (solo TC-010) | Paso (TC-010) | El test `deletes the last task and shows empty state (TC-009/TC-010)` (`e2e/tasks.spec.ts:99-105`) crea una única tarea y la elimina — coincide con el escenario de TC-010 (eliminar la última tarea), pero **no** con TC-009, cuya precondición exige "al menos dos tareas" y cuyo resultado esperado incluye "el resto de las tareas permanece intacto". Esa verificación (eliminar una tarea y confirmar que las demás siguen en el listado) no está cubierta por ningún artefacto. |
| AC-007 | Marcar/desmarcar una tarea como completada | TC-011, TC-012 | `e2e/tasks.spec.ts:107-133` (e2e) | Cubierto | Sí | Paso | El test cubre ambos casos (marcar y desmarcar) aunque su título solo referencia TC-011/TC-013; TC-012 queda cubierto igualmente por la segunda mitad del test (líneas 124-132). |
| AC-008 | Distinción visual de tareas completadas | TC-013 | `e2e/tasks.spec.ts:107-122` (e2e) | Cubierto | Sí | Paso | TC-013 declara tipo sugerido `Visual Test`, pero el artefacto real es una aserción de clase CSS (`line-through`) en Playwright, no una prueba de regresión visual (screenshot diff). No afecta el estado. |
| AC-009 | Ordenar listado por prioridad por defecto | TC-014, TC-015 | `e2e/tasks.spec.ts:135` (e2e, TC-014) · `sort.test.ts:27` (unit, TC-015) | Cubierto | Sí | Paso | TC-015 declara tipo sugerido `E2E`, pero el artefacto real es un test unitario de `sortTasksByPriority`. No afecta el estado. |
| AC-010 | Persistencia en localStorage, disponible tras recargar | TC-016, TC-017 | `e2e/tasks.spec.ts:147` (e2e, TC-016) · `store.test.ts:198` (unit, TC-017) | Cubierto | Sí | Paso | — |
| AC-011 | Listar todas las tareas registradas al cargar la aplicación | TC-018, TC-019 | `e2e/tasks.spec.ts:157` (e2e, cubre TC-019) | **Parcial** | Sí (solo TC-019) | Paso (TC-019) | TC-018 (localStorage con ≥3 tareas preexistentes, abrir/recargar la app y verificar que el listado muestra las tres con sus datos completos) **no tiene artefacto a nivel de UI**. `store.test.ts:170` (`rehydrates tasks from localStorage`) ofrece evidencia parcial, pero solo verifica el estado del store tras `persist.rehydrate()`, sin renderizar `TasksView` ni comprobar el listado visible. |

## Artefactos de prueba automatizada disponibles

| Tipo | Presente | Artefactos |
|------|----------|------------|
| Unit | Sí | `src/features/tasks/store.test.ts`, `src/features/tasks/sort.test.ts`, `src/features/tasks/validation.test.ts` |
| Integración | Sí | `src/features/tasks/components/tasks-view.test.tsx` |
| E2E | Sí | `e2e/tasks.spec.ts` (11 tests, referenciando TC-001, TC-002, TC-004, TC-005, TC-007, TC-009/TC-010, TC-011/TC-013, TC-014, TC-016, TC-019) |

## Ejecución automática

Los resultados de pruebas los produce `code-review` (trace-validate no ejecuta la suite).

| | |
|--|--|
| **Procedencia** | Caché fresca de `code-review` (commit `aa73c3b`, 2026-07-17) — `docs/specs/test-run.json`, fingerprint coincide, sin cambios de código desde esa corrida |
| **Comando(s)** | `npm test` (vitest run) · `npm run test:coverage` · `npm run test:e2e` (playwright test) |
| **Resultado global** | Vitest: 58 pasaron, 0 fallaron (8 archivos, toda la rama) · Coverage: 89.92% stmts / 83.53% branches / 93.13% funcs / 89.25% lines (umbral 80%) · Playwright: 28 pasaron, 0 fallaron (toda la rama, incluye `e2e/tasks.spec.ts` y `e2e/notes.spec.ts`) |

## Observaciones y pendientes

- **AC-005 / TC-008:** falta un artefacto que edite una tarea existente, borre su descripción, intente guardar y verifique tanto el mensaje de error como que los valores originales se conservan en el listado (no se pierden). Sugerencia: agregar un test e2e o de integración análogo a `edits a task (TC-007)` pero limpiando el campo descripción antes de guardar.
- **AC-006 / TC-009:** falta un artefacto que cree al menos dos tareas, elimine una y verifique explícitamente que la(s) restante(s) siguen en el listado. El test actual solo cubre el caso límite de eliminar la última tarea (TC-010).
- **AC-011 / TC-018:** falta un artefacto a nivel de UI que precargue ≥3 tareas en `localStorage`, abra/recargue la aplicación y verifique que el listado renderizado muestra las tres con descripción, fecha, prioridad y estado completos. La cobertura actual a nivel de store (`rehydrates tasks from localStorage`) no sustituye esta verificación end-to-end.
- Estos tres huecos corresponden a una feature ya implementada (`Estado: Ready`, US-001); por el handoff del ciclo, cerrarlos requiere volver a `work-implement` (fase de pruebas con `quality-specialist`) para agregar los artefactos faltantes, y revalidar después con este mismo skill.

<!-- trace-validate:fingerprint=8abba15a9401c2fa6b69af6c3128592bfacdd49d · generado=2026-07-17 -->
