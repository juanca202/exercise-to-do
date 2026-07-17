# Code Review — exercise-todo · feature/lab-openspec-superpowers

**Fecha**: 2026-07-17 00:15
**Repositorio**: exercise-todo (exercise-to-do)
**Rama**: feature/lab-openspec-superpowers · **Commit**: aa73c3b
**Working tree**: sucio (2 archivos sin trackear: `docs/specs/user-stories/US-001-gestion-completa-tareas/trace-report.md` y `docs/specs/user-stories/US-002-gestion-notas-texto-libre/trace-report.md` — artefactos de `trace-validate`, no forman parte del diff de código revisado)
**Modo**: default
**Historia**: US-001-gestion-completa-tareas y US-002-gestion-notas-texto-libre (corrida completa de la rama, no de una unidad)
**Veredicto**: ❌ Rechazado

## Resumen

Se revisó la rama completa `feature/lab-openspec-superpowers` (205 archivos, ~2.3K líneas de código de producto/tests en `src/`, el resto son specs y artefactos de OpenSpec/ADR). La etapa automatizada pasó sin fallos bloqueantes (tipado, linter, unit tests, coverage, build y e2e en ✅; Sonar en FAIL informativo por falta de `sonar.organization`, no bloquea). La revisión cualitativa encontró un hallazgo 🟠 Mayor: los fitness functions de ADR-001/006/007 (`arch:check`, `router:check`, `branch:check`) existen y funcionan, pero no están enganchados a ningún hook de Husky ni a CI, por lo que no ofrecen enforcement real. Falta resolver ese hallazgo (corregir o justificar) para llegar a `✅ Aprobado`.

## 1. Verificaciones automatizadas

Símbolos de estado: `✅` PASS · `❌` FAIL · `⏭️` SKIPPED · `—` N/A · `ℹ️` informativo (Sonar).

| # | Check      | Comando                     | Categoría   | Estado | Detalle                                                              | Duración |
| - | ---------- | ---------------------------- | ----------- | ------ | --------------------------------------------------------------------- | -------- |
| 1 | tipado     | `npx tsc --noEmit`            | Bloqueante  | ✅     | 0 errores                                                              | ~2s      |
| 2 | linter     | `npm run lint` (eslint)       | Bloqueante  | ✅     | 0 errors, 0 warnings                                                   | ~2s      |
| 3 | unit tests | `npm test` (vitest run)       | Bloqueante  | ✅     | 58 passed, 0 failed (8 archivos)                                       | 1.49s    |
| 4 | coverage   | `npm run test:coverage`       | Bloqueante  | ✅     | stmts 89.92% · branches 83.53% · funcs 93.13% · lines 89.25% (umbral 80% en las 4) | 1.28s    |
| 5 | build      | `npm run build` (next build)  | Bloqueante  | ✅     | OK — 4 rutas generadas (`/`, `/todo`, `/notes`, `/_not-found`)          | ~3s      |
| 6 | e2e        | `npm run test:e2e` (playwright)| Condicional | ✅     | 28 passed, 0 failed                                                    | 7.7s     |
| 7 | sonar      | `npm run sonar` (sonar-scanner)| Informativo | ℹ️❌    | Falta propiedad obligatoria `sonar.organization`                       | ~3s      |

### Detalle de checks fallidos

- **sonar** (informativo, no bloquea) — `[ERROR] ScannerEngine: You must define the following mandatory properties for 'exercise-todo': sonar.organization`. `sonar-project.properties` es un scaffold local declarado explícitamente como pendiente de conectar (ver comentario en el propio archivo y trade-off documentado en ADR-005: "esa etapa queda como scaffold local no ejecutable en CI" sin `sonar.host.url`/`organization`/`SONAR_TOKEN`).

## 2. Revisión cualitativa

Símbolos de severidad: `🔴` Crítico · `🟠` Mayor · `🟡` Menor · `💡` Sugerencia · `✅` dimensión conforme.

**Intención detectada:** la rama implementa de punta a punta dos historias de usuario — US-001 (gestión completa de tareas: CRUD, validación de descripción/fecha, prioridad restringida, orden por prioridad, distinción visual de completadas, persistencia en localStorage) y US-002 (gestión de notas de texto libre: CRUD sin validación de contenido, navegación compartida To-do/Notes, persistencia) — más tooling de calidad (ESLint + tsdoc, dependency-cruiser, scripts de fitness function para ADR-006/ADR-007, scaffold de Sonar), según los README de ambas US y los mensajes de commit del rango.

### Análisis semántico

- 🟠 [ISO-25010: Adecuación funcional] El commit `fef56e2` ("Wires up dependency-cruiser..., branch-name and App-Router-only checks... quality-gate tooling") y los propios ADR-001/ADR-006/ADR-007 declaran sus fitness functions (`npm run arch:check`, `node scripts/check-app-router-only.mjs`, `node scripts/check-branch-name.mjs`) como `Apto: Sí` / `Estado: Creada`, pero ninguno de los tres está enganchado a un hook de `.husky/` ni a un pipeline de CI (no existe `.github/workflows`) — solo se ejecutan si alguien recuerda invocarlos manualmente. Verificado: los tres scripts corren y pasan correctamente en el estado actual del repo, confirmando que el problema es de *wiring*, no de lógica.
  **Por qué:** sin un punto de enforcement automático, una rama con nombre inválido o la reintroducción de un directorio `pages/` pasarían desapercibidas hasta muy tarde (o nunca). El propio ADR-005 ya resuelve este mismo problema para lint/tests/coverage enganchándolos a `.husky/pre-commit` y `.husky/pre-push` — estos tres scripts nuevos no siguen ese patrón ya establecido en el repo.
  **Impacto:** gobernanza de ADR-001 (aislación por feature), ADR-006 (nombres de rama GitFlow) y ADR-007 (App Router exclusivo) en todo el repositorio — el gate documentado queda como intención, no como control real.
  **Sugerencia concreta:** agregar `npm run branch:check` y `npm run router:check` a `.husky/pre-push` (o `pre-commit`), junto al `npm run test:coverage` que ya vive ahí; considerar sumar `npm run arch:check` al mismo hook o a un futuro workflow de CI.

### Arquitectura y diseño

- 🟡 [ISO-25010: Mantenibilidad] `src/features/notes/store.ts` y `src/features/tasks/store.ts` duplican verbatim el wrapper `safeLocalStorage` (manejo de errores de acceso a `localStorage`) y la función generadora de id (`createNoteId`/`createTaskId`); `src/features/notes/hooks/use-notes-hydrated.ts` y `src/features/tasks/hooks/use-tasks-hydrated.ts` son idénticos salvo el store al que apuntan.
  **Por qué:** es lógica de infraestructura sin relación con el dominio de cada feature (no es "razón de cambio" propia de tasks o de notes); un cambio futuro (p. ej. telemetría en fallos de `localStorage`, o cambiar el algoritmo de generación de id) obliga a tocar ambos archivos en paralelo, con riesgo de que diverjan silenciosamente.
  **Impacto:** ambos features actuales, y cualquier feature futuro que persista en localStorage repetiría el mismo patrón.
  **Sugerencia concreta:** extraer `safeLocalStorage` y el generador de id a `src/shared/lib/` (p. ej. `safe-local-storage.ts`, `create-id.ts`) y un hook genérico `useHydrated(store)` en `src/shared/hooks/`, reutilizados por `tasks` y `notes`.

### Feedback adicional

Lo que está bien hecho, vale decirlo explícitamente:

- Manejo robusto de datos corruptos en `localStorage`: `sanitizeNote`/`sanitizeTask` + `merge` del middleware `persist` cubren exactamente los casos límite que las US piden (TC de "localStorage corrupto"), sin que el error se propague a la UI.
- Cobertura de pruebas sólida y alineada a los AC-XXX: 58 unit tests + 28 e2e, incluyendo casos límite (contenido vacío, prioridad inválida, última tarea/nota eliminada, cancelar edición sin confirmación).
- Formularios accesibles y consistentes entre `TaskForm`/`NoteForm`: `aria-invalid`, `aria-describedby`, `role="alert"` en errores, `aria-label` en el `<form>` según modo crear/editar.
- Estructura feature-based (ADR-001) y TSDoc en funciones públicas (ADR-002) respetados de forma consistente en ambos features.

💡 Sugerencia (no bloqueante): las clases Tailwind de los campos de formulario (`fieldClassName`, `labelClassName`, `errorClassName` en `task-form.tsx`) están inlineadas de nuevo en `note-form.tsx` en vez de compartirse; si aparece un tercer formulario, vale la pena extraerlas a un componente/constante en `shared/`.

## Próximas acciones

1. Resolver el hallazgo 🟠 (fitness functions de ADR-001/006/007 sin enganchar a un hook/CI): corregir enganchándolos a `.husky/` (o a un workflow de CI), o justificar por qué se acepta dejarlos como verificación manual por ahora.
2. Sonar informativo: configurar `sonar.organization` (o `sonar.host.url` para SonarQube self-hosted) y `SONAR_TOKEN` para que el análisis corra contra un servidor real — ya documentado como trade-off esperado en ADR-005; no bloquea el veredicto.
3. (No bloqueante) Considerar extraer `safeLocalStorage`, el generador de id y el hook de hidratación a `src/shared/` para eliminar la duplicación entre `tasks` y `notes`.

## Justificaciones aceptadas

Ninguna (pendiente de que el usuario decida corregir o justificar el hallazgo 🟠 de la sección anterior).
