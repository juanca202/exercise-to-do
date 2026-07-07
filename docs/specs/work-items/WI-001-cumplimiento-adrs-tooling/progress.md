# Progreso

## Trabajo: WI-001-cumplimiento-adrs-tooling

- Tipo: work item
- Última actualización: 2026-07-06

### Unidades

- IT-01 Reorganizar src/ a arquitectura feature-based
  Estado: Done
  Implementador: "juanca202"
  Archivos:
  - src/shared/styles/globals.css
  - src/features/home/components/home-page.tsx
  - src/app/page.tsx
  - src/app/layout.tsx
    Notas:
  - Se creó src/features/ (con home/ como primer ejemplo) y src/shared/ (styles/, ui/, stores/, test/) según ADR-005.
  - app/page.tsx queda como capa de enrutamiento delgada que renderiza HomePage desde features/home.
    Decisiones adicionales: []

- IT-02 Instalar y configurar Base UI
  Estado: Done
  Implementador: "juanca202"
  Archivos:
  - package.json
  - src/shared/ui/checkbox.tsx
  - src/shared/ui/checkbox.test.tsx
    Notas:
  - Paquete correcto es @base-ui/react (el nombre @base-ui-components/react fue renombrado y quedó deprecado; se corrigió en package.json).
  - Componente de referencia: Checkbox, wrapper con Tailwind sobre Checkbox.Root/Checkbox.Indicator.
  - TDD Red→Green→Refactor: 4 tests con Testing Library cubren estado no marcado, defaultChecked, onCheckedChange y disabled.
    Decisiones adicionales:
  - No se pasa aria-label manual en Checkbox: Base UI ya asocia el <label> envolvente vía aria-labelledby automáticamente; duplicarlo generaba un nombre accesible repetido.

- IT-03 Instalar Zustand y crear una store de ejemplo
  Estado: Done
  Implementador: "juanca202"
  Archivos:
  - package.json
  - src/shared/stores/task-store.ts
  - src/shared/stores/task-store.test.ts
    Notas:
  - Store de referencia useTaskStore (addTask/toggleTask/removeTask) sobre un modelo Task mínimo (id, title, completed).
  - TDD Red→Green→Refactor: 4 tests AAA, con reset de estado en beforeEach para aislamiento entre tests.
    Decisiones adicionales: []

- IT-04 Configurar lint de TSDoc
  Estado: Done
  Implementador: "juanca202"
  Archivos:
  - package.json
  - eslint.config.mjs
    Notas:
  - Regla tsdoc/syntax (eslint-plugin-tsdoc) en error para .ts/.tsx; valida sintaxis de los comentarios TSDoc existentes, sin exigir su presencia (consistente con ADR-006: no se documenta lógica trivial).
  - Verificado manualmente que un tag TSDoc inválido (@invalidTag) es detectado como error antes de confirmar la regla.
    Decisiones adicionales: []

- IT-05 Instalar y configurar Vitest + Testing Library
  Estado: Done
  Implementador: "juanca202"
  Archivos:
  - vitest.config.ts
  - vitest.setup.ts
  - package.json (scripts test / test:watch / test:coverage)
  - eslint.config.mjs (ignora coverage/**)
  - src/shared/test/object-mother/task.mother.ts
  - src/features/home/components/home-page.test.tsx
    Notas:
  - Umbral de cobertura global 80% (lines/functions/branches/statements) en vitest.config.ts; cobertura real actual 100% tras agregar el smoke test de HomePage.
  - src/app/** excluido de cobertura (glue de enrutamiento de Next.js, no lógica de negocio).
  - cleanup() de Testing Library registrado en afterEach (vitest.setup.ts) para aislamiento entre tests, dado que test.globals está en false.
    Decisiones adicionales:
  - Se agregó un test de HomePage (boilerplate movido en IT-01) para no dejar código sin cubrir en vez de ampliar las exclusiones de cobertura.

- IT-06 Instalar y configurar Playwright
  Estado: Done
  Implementador: "juanca202"
  Archivos:
  - package.json (script test:e2e)
  - playwright.config.ts
  - e2e/home.spec.ts
  - .gitignore (playwright-report/, test-results/, blob-report/)
    Notas:
  - webServer configurado sobre `npm run dev` (reuseExistingServer fuera de CI); proyecto único chromium.
  - Prueba de ejemplo cubre la home (heading visible) y el route handler /api/hello. Ambas en verde.
    Decisiones adicionales: []

- IT-07 Instalar y configurar Prettier
  Estado: Done
  Implementador: "juanca202"
  Archivos:
    - package.json (scripts format / format:check)
    - .prettierrc.json
    - .prettierignore
    - eslint.config.mjs (eslint-config-prettier al final; ignora playwright-report/, test-results/)
    - vitest.config.ts (exclude e2e/** para que Vitest no intente correr las specs de Playwright)
  Notas:
    - Se corrigió el repo completo a la línea base de Prettier (`npm run format`).
    - .prettierignore excluye .agents/, .claude/ y skills-lock.json (tooling de skills, no código del proyecto) y docs/adr/, docs/specs/ (documentos de decisión/planificación con su propia plantilla; no se reformatean).
  Decisiones adicionales:
    - Al correr `prettier --write .` sobre todo el repo, se reformateó por error la indentación del Plan de implementación de este mismo WI-001/README.md; se revirtió a mano para respetar la regla de "solo checkboxes" en artefactos de especificación, y se excluyó docs/adr y docs/specs de Prettier para que no vuelva a ocurrir.

- IT-08 Instalar y configurar Husky + lint-staged
  Estado: Done
  Implementador: "juanca202"
  Archivos:
    - package.json (script prepare)
    - .husky/pre-commit
    - .husky/pre-push
    - .lintstagedrc.json
  Notas:
    - pre-commit ejecuta `npx lint-staged` (eslint --fix + prettier --write acotado a archivos staged); pre-push ejecuta `npm run test:coverage`.
    - Verificado manualmente corriendo `npx lint-staged` con un archivo en staging: corrió eslint/prettier solo sobre los archivos staged, sin errores, y limpió su stash temporal correctamente.
  Decisiones adicionales: []

- IT-09 Configurar Sonar Scanner como scaffold local
  Estado: Done
  Implementador: "juanca202"
  Archivos:
    - package.json (script sonar, dependencia @sonar/scan)
    - sonar-project.properties
    - vitest.config.ts (reporter lcov agregado para sonar.javascript.lcov.reportPaths)
  Notas:
    - Se usó @sonar/scan (paquete npm oficial de SonarSource), no el equivalente comunitario sonarqube-scanner.
    - Verificado con `npm run sonar`: el scanner arranca, descarga su motor y se detiene exactamente donde se esperaba (falta sonar.organization/token de un servidor real), confirmando que el scaffold está bien formado sin necesitar conexión real.
  Decisiones adicionales: []

- IT-10 Verificar el proyecto de punta a punta
  Estado: Done
  Implementador: "juanca202"
  Archivos: []
  Notas:
    - `npm run lint`, `npm run build`, `npm run test:coverage` (100% cobertura, umbral 80% cumplido) y `npx playwright test` (2/2) en verde en la misma corrida final.
    - `npm run format:check` limpio sobre todo el repo (con las exclusiones de .prettierignore).
    - Los 10 criterios de aceptación del WI (AC-001 a AC-010) quedan cubiertos por el código y las pruebas de las unidades IT-01 a IT-09.
  Decisiones adicionales:
    - Se implementa directamente sobre `main` (sin crear rama `feature/WI-001-...` ni exigir working tree limpio previo), por instrucción explícita del usuario.
