# Code Review — US-002-gestion-notas-texto-libre

**Fecha**: 2026-07-16 22:04
**Repositorio**: exercise-todo
**Rama**: feature/lab-openspec-superpowers · **Commit**: 520ca95
**Working tree**: limpio
**Modo**: default
**Historia**: [US-002-gestion-notas-texto-libre](README.md)
**Veredicto**: ✅ Apto

## Resumen

Se revisó el rango `5deee87..520ca95` (7 commits): implementación completa de la feature Notes (US-002) — store, componentes, navegación compartida, rutas y e2e — más una corrección de configuración de Vitest surgida al integrar. Los siete checks automatizados aplicables pasan (tipado, linter, unit+coverage, build, e2e); Sonar falla de forma informativa por falta de `sonar.organization` en un scaffold local, sin bloquear. La revisión cualitativa no encontró hallazgos bloqueantes; hay 4 observaciones menores de mantenibilidad/fiabilidad, ninguna que impida el merge.

## 1. Verificaciones automatizadas

Símbolos de estado: `✅` PASS · `❌` FAIL · `⏭️` SKIPPED · `—` N/A · `ℹ️` informativo (Sonar).

| # | Check      | Comando                | Categoría    | Estado | Detalle                                                        | Duración |
| - | ---------- | ----------------------- | ------------ | ------ | --------------------------------------------------------------- | -------- |
| 1 | tipado     | `tsc --noEmit`          | Bloqueante   | ✅     | 0 errores                                                        | ~2s      |
| 2 | linter     | `npm run lint` (eslint) | Bloqueante   | ✅     | 0 problems                                                       | ~3s      |
| 3 | unit tests | `npm run test:coverage` | Bloqueante   | ✅     | 58 passed, 0 failed (8 archivos)                                 | 1.5s     |
| 4 | coverage   | `npm run test:coverage` | Bloqueante   | ✅     | 89.92% stmts / 83.53% branch / 93.13% funcs / 89.25% lines (umbral 80%) | 1.5s     |
| 5 | build      | `npm run build`         | Bloqueante   | ✅     | OK — rutas `/`, `/todo`, `/notes` generadas como estáticas       | ~2s      |
| 6 | e2e        | `npm run test:e2e`      | Condicional  | ✅     | 28 passed (17 notes + 11 tasks)                                 | 7.9s     |
| 7 | sonar      | `npm run sonar`         | Informativo  | ℹ️     | FAIL — falta `sonar.organization` (scaffold local sin conectar, ver nota en `sonar-project.properties`) | ~5s      |

### Detalle de checks fallidos

- **sonar** (informativo, no bloquea) — `[ERROR] ScannerEngine: You must define the following mandatory properties for 'exercise-todo': sonar.organization`. El propio archivo `sonar-project.properties` documenta que es un scaffold pendiente de conectar a un servidor Sonar real (ver ADR-005); no es un regresión de este cambio.

## 2. Revisión cualitativa

Símbolos de severidad: `🔴` Crítico · `🟠` Mayor · `🟡` Menor · `💡` Sugerencia · `✅` dimensión conforme.

**Intención detectada:** implementar US-002 — sección Notes con CRUD de notas de texto libre (crear, listar, editar, eliminar), accesible junto a To-do desde una navegación principal de dos opciones, siguiendo AC-001 a AC-012 del `README.md` de la historia.

### Análisis semántico

✅ Conforme. Los 12 criterios de aceptación (AC-001..AC-012) están cubiertos por el diff y trazados a casos de prueba unitarios y e2e (TC-001..TC-017, con TC-014 correctamente limitado a nivel unit por tratarse de recuperación ante `localStorage` corrupto). No hay lógica añadida fuera del alcance de la historia: el CRUD es estrictamente el pedido (sin campos adicionales, sin validación de contenido mínimo — AC-011 se respeta explícitamente al no exigir contenido no vacío), y no se tocó el comportamiento existente de `tasks` más allá de mover su ruta de `/` a `/todo` (requerido para dar espacio a la navegación de dos opciones).

- 💡 El commit `520ca95` (exclusión de `.worktrees/**` en `vitest.config.ts`) no corresponde a ningún `AC-XXX` de US-002 — es una corrección de infraestructura de testing necesaria para que la suite del repo pasara tras integrar el trabajo (un worktree usado durante la implementación quedó siendo recogido por el glob de Vitest). **Por qué:** en sentido estricto es scope fuera de la historia. **Impacto:** ninguno — es un cambio de una línea, sin riesgo, y necesario para que el propio merge quedara verde. **Sugerencia concreta:** ninguna acción requerida; si se quisiera trazabilidad estricta, podría vivir en un commit `chore` separado de un WI de mantenimiento, pero no amerita revertirlo ni bloquear por esto.

### Arquitectura y diseño

En general conforme: `src/features/notes/` replica fielmente el patrón ya validado en `src/features/tasks/` (store Zustand + `persist` con saneamiento ante `localStorage` corrupto, hook de hidratación vía `useSyncExternalStore`, Dialog de Base UI, Tailwind puro), sin importar internals de `tasks` (respeta la regla `no-cross-feature-imports` de `dependency-cruiser`/ADR-001), y `MainNav` está correctamente ubicado en `src/shared/components/` por ser código transversal (ADR-001). `src/app/*` se mantiene como capa de composición pura. No se detectaron problemas de Seguridad (el contenido de las notas se renderiza como texto de React, sin `dangerouslySetInnerHTML`) ni de Eficiencia (no hay acceso a datos ni listados sin límite relevantes).

- 🟡 [ISO-25010: Mantenibilidad] `selectRecentNotes` es código muerto en producción — **Qué:** `store.ts:166-167` exporta `selectRecentNotes(state)` (y se reexporta en `index.ts:6`), pero `notes-view.tsx:7,22` usa directamente `sortNotesByRecency(notes)` sobre el array ya suscrito, no `selectRecentNotes` sobre el estado completo; el único consumidor de `selectRecentNotes` es `store.test.ts`. **Por qué:** dos funciones que expresan la misma intención (una envolviendo a la otra) en la API pública, una de las cuales solo existe para ser testeada, es redundancia evitable en el barrel de la feature. **Impacto:** bajo — solo legibilidad de la API pública, no hay riesgo funcional. **Sugerencia concreta:** eliminar `selectRecentNotes` del export público y testear `sortNotesByRecency` directamente, o hacer que `NotesView` la consuma en vez de llamar dos funciones equivalentes.

- 🟡 [ISO-25010: Mantenibilidad] Rama `onCancel` ausente de `NoteForm` nunca se ejercita — **Qué:** `note-form.tsx:11` declara `onCancel?: () => void` y `note-form.tsx:67` renderiza condicionalmente el botón "Cancelar" solo si se pasa `onCancel`; todos los call-sites actuales (`notes-view.tsx`) siempre lo pasan. **Por qué:** es superficie de API especulativa (YAGNI) que ningún test ni caso de uso real ejercita en `false`. **Impacto:** ninguno hoy; si en el futuro alguien confía en que el formulario puede renderizarse sin cancelar y no lo prueba, el camino queda sin cobertura. **Sugerencia concreta:** o bien hacer `onCancel` obligatorio (si siempre se usa con Dialog, como hoy), o agregar un test que cubra el caso sin `onCancel`, para que la opcionalidad tenga respaldo real.

- 🟡 [ISO-25010: Fiabilidad] Contenido de solo espacios se muestra como "Nota vacía" pero se persiste tal cual — **Qué:** `note-item.tsx:13-18` (`previewContent`) hace `content.trim()` para decidir si mostrar el placeholder, pero el store (`store.ts`, sin trim en `addNote`/`updateNote`) persiste el contenido exactamente como se escribió, incluidos espacios. **Por qué:** es un comportamiento deliberado y documentado en el diseño (preservar texto libre multilínea sin alterar), pero puede sorprender a un futuro mantenedor que vea "Nota vacía" en el listado y asuma que no hay datos, cuando en realidad hay espacios en blanco guardados. **Impacto:** cosmético, sin pérdida de datos ni error funcional. **Sugerencia concreta:** un comentario de una línea junto a `previewContent` explicando que el trim es solo de presentación (no de persistencia) evitaría la confusión futura.

- 🟡 [ISO-25010: Fiabilidad] Orden entre notas creadas en el mismo milisegundo no tiene desempate determinista — **Qué:** `store.ts:158-159` (`sortNotesByRecency`) ordena por `b.updatedAt - a.updatedAt`; si dos notas se crean con el mismo `Date.now()`, `toSorted` (estable) conserva el orden de inserción, dejando la más antigua de las dos empatadas arriba entre sí. **Por qué:** es un caso borde de baja probabilidad (requiere creación en el mismo tick de reloj) sin ningún test que lo cubra explícitamente. **Impacto:** cosmético — el listado sigue siendo válido, solo el orden relativo entre esas dos notas concretas podría no ser "la más nueva primero" en ese caso extremo. **Sugerencia concreta:** si en algún momento importa el desempate estricto, un contador monótono o usar `createdAt` como criterio secundario resolvería la ambigüedad; no es necesario para el alcance actual de US-002.

### Feedback adicional

Buen trabajo en general: la decisión de replicar 1:1 el patrón de `tasks` (en vez de inventar uno nuevo) mantiene el repo consistente y reduce la carga cognitiva de mantenimiento. El manejo de `localStorage` corrupto está bien resuelto y testeado en los tres niveles (unit del store, integración de `NotesView`, y el equivalente ya cubierto en `tasks`). La trazabilidad AC↔TC↔test es completa y explícita (nombres de test referencian `TC-XXX`), lo cual facilita auditar cobertura sin releer el código. El manejo del redirect `/` → `/todo` preserva la clave de `localStorage` de `tasks`, así que usuarios existentes no pierden datos — buen detalle de compatibilidad hacia atrás no trivial.

## Próximas acciones

Sin acciones pendientes — el veredicto es Apto y no hay hallazgos bloqueantes. Las 4 observaciones 🟡 quedan documentadas como mejoras opcionales de mantenimiento futuro, no requieren acción antes de integrar.

## Justificaciones aceptadas

Ninguna.
