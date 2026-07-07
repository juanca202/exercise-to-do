# WI-001: Cumplimiento de ADRs de tooling, arquitectura y quality gate

Estado: Ready
Tipo: operativa
Repositorio: exercise-todo
Asignado a: juanca202

## Descripción

El proyecto tiene aceptados los ADR-003 a ADR-009, pero el repositorio todavía no refleja esas decisiones: faltan instalar y configurar Base UI, Zustand, la reorganización de `src/` a arquitectura feature-based, el lint de documentación TSDoc, la suite de pruebas unitarias (Vitest + Testing Library), las pruebas E2E (Playwright) y el Quality Gate shift-left (Prettier, Husky, lint-staged, Sonar Scanner). Se necesita alinear el código y la configuración del repositorio con las decisiones arquitectónicas ya tomadas, para que dejen de ser solo documentación y empiecen a aplicarse en el día a día del desarrollo.

ADR-002 (Tailwind CSS) queda fuera de este WI porque ya está instalado y configurado.

## Contexto

Este work item cubre, de forma consolidada, seis frentes de trabajo independientes pero relacionados, todos derivados de ADRs ya `Accepted`:

- Reestructuración de `src/` a arquitectura feature-based (ADR-005) — se ejecuta primero porque condiciona dónde vive el código de los frentes siguientes.
- Integración de Base UI (ADR-003) y de Zustand (ADR-004) como librería de componentes y manejo de estado, respectivamente.
- Lint de documentación TSDoc (ADR-006).
- Suite de pruebas unitarias con Vitest + Testing Library (ADR-007) y pruebas E2E con Playwright (ADR-008).
- Quality Gate shift-left (ADR-009), que integra lint, formato, pruebas y cobertura ya configurados en los frentes anteriores dentro de git hooks (Husky + lint-staged) y añade Prettier y Sonar Scanner.

Alcance del Sonar Scanner en este WI: se configura únicamente como _scaffold_ local (archivo de configuración y script npm con project key de placeholder). La conexión a un servidor Sonar real (SonarCloud o SonarQube self-hosted) con sus credenciales queda fuera de este WI y se resuelve como tarea operativa posterior, cuando exista un destino concreto.

## Dependencias

- Base UI (`@base-ui-components/react` o paquete equivalente vigente en base-ui.com) — librería headless de componentes, estilizada con Tailwind CSS.
- Zustand — manejo de estado global.
- Vitest — test runner de pruebas unitarias.
- @testing-library/react + @testing-library/jest-dom — assertions y utilidades de testing orientadas a comportamiento.
- @vitest/coverage-v8 (o provider de cobertura equivalente) — medición de cobertura para el umbral del 80%.
- Playwright (`@playwright/test`) — pruebas E2E.
- eslint-plugin-tsdoc — validación de comentarios TSDoc vía ESLint.
- Prettier — formato automático de código.
- Husky — git hooks.
- lint-staged — ejecución de verificaciones acotada a archivos modificados.
- Sonar Scanner (`sonar-scanner` / `sonarqube-scanner`) — análisis estático de calidad de código.

## Referencias

- **Arquitectura:** [ADR-003: Uso de Base UI como librería de componentes](../../../adr/ADR-003-uso-de-base-ui.md)
- **Arquitectura:** [ADR-004: Uso de Zustand para manejo de estado](../../../adr/ADR-004-uso-de-zustand.md)
- **Arquitectura:** [ADR-005: Arquitectura del proyecto basada en features](../../../adr/ADR-005-arquitectura-feature-based.md)
- **Arquitectura:** [ADR-006: Documentación de código con TSDoc](../../../adr/ADR-006-documentacion-con-tsdoc.md)
- **Arquitectura:** [ADR-007: Estrategia de pruebas unitarias](../../../adr/ADR-007-estrategia-pruebas-unitarias.md)
- **Arquitectura:** [ADR-008: Uso de Playwright para las pruebas E2E](../../../adr/ADR-008-uso-de-playwright-para-e2e.md)
- **Arquitectura:** [ADR-009: Adopción de un Quality Gate shift-left](../../../adr/ADR-009-quality-gate-shift-left.md)

## Criterios de aceptación

- **AC-001 (Mantenibilidad):** La estructura de `src/` DEBE reorganizarse a un modelo feature-based, con un módulo compartido explícito separado de las features, según ADR-005.
- **AC-002 (Mantenibilidad):** El proyecto DEBE tener Base UI instalado e integrado con Tailwind CSS, con al menos un componente construido o migrado sobre Base UI como referencia, según ADR-003.
- **AC-003 (Mantenibilidad):** El proyecto DEBE tener Zustand instalado, con al menos una store de ejemplo bajo el módulo compartido, según ADR-004.
- **AC-004 (Mantenibilidad):** El proyecto DEBE tener un lint de TSDoc configurado en ESLint, aplicado a símbolos públicos no triviales, según ADR-006.
- **AC-005 (Fiabilidad):** El proyecto DEBE tener Vitest + Testing Library configurados, con un umbral de cobertura mínimo del 80%, al menos un Object Mother de ejemplo y al menos una prueba de referencia estructurada en AAA, según ADR-007.
- **AC-006 (Fiabilidad):** El proyecto DEBE tener Playwright configurado, con al menos una prueba E2E de ejemplo que cubra un flujo de la aplicación, según ADR-008.
- **AC-007 (Mantenibilidad):** El proyecto DEBE tener Prettier, Husky y lint-staged configurados, de forma que el pre-commit ejecute lint y formato solo sobre los archivos modificados, según ADR-009.
- **AC-008 (Mantenibilidad):** El proyecto DEBE tener un pre-push (u otro hook equivalente) que ejecute pruebas unitarias con cobertura, según ADR-009.
- **AC-009 (Mantenibilidad):** El proyecto DEBE tener un archivo de configuración de Sonar Scanner (`sonar-project.properties`) y un script npm para ejecutarlo, sin requerir conexión a un servidor real para este WI, según ADR-009.
- **AC-010 (Idoneidad funcional):** `npm run build`, `npm run lint`, la suite de Vitest y la suite de Playwright DEBEN ejecutarse sin errores tras aplicar todos los cambios de este WI.

## Archivos afectados

```text
exercise-todo/
├── ~ package.json                          # nuevas dependencias y scripts (test, test:coverage, test:e2e, format, sonar, prepare)
├── ~ eslint.config.mjs                     # plugin de lint para TSDoc
├── + .prettierrc.json                      # configuración de Prettier
├── + .prettierignore                       # exclusiones de formato (.next, node_modules, etc.)
├── + .husky/pre-commit                     # hook: lint-staged
├── + .husky/pre-push                       # hook: pruebas unitarias con cobertura
├── + .lintstagedrc.json                    # comandos de lint-staged por tipo de archivo
├── + vitest.config.ts                      # configuración de Vitest y umbral de cobertura 80%
├── + vitest.setup.ts                       # setup de Testing Library (jest-dom, cleanup)
├── + playwright.config.ts                  # configuración de Playwright
├── + sonar-project.properties              # configuración de Sonar Scanner (project key placeholder)
├── ~ src/app/                              # ajustado tras mover código compartido a src/shared/
├── + src/features/                         # nuevo: módulos de features
├── + src/shared/ui/                        # nuevo: wrappers/composición sobre componentes de Base UI
├── + src/shared/stores/                    # nuevo: store de ejemplo con Zustand
├── + src/shared/test/object-mother/        # nuevo: Object Mother de ejemplo
└── + e2e/                                  # nuevo: pruebas E2E con Playwright
```

## Plan de implementación

- [x] **IT-01** — Reorganizar `src/` a arquitectura feature-based
  Crear `src/features/` y `src/shared/`; mover el código existente de `src/app/` a la convención acordada, dejando `src/shared/` para lo verdaderamente transversal. Ref: ADR-005.
- [x] **IT-02** — Instalar y configurar Base UI
  Agregar la dependencia, integrarla con Tailwind CSS y construir/migrar un componente de referencia en `src/shared/ui/`. Ref: ADR-003.
- [x] **IT-03** — Instalar Zustand y crear una store de ejemplo
  Agregar la dependencia y crear una store de referencia en `src/shared/stores/` siguiendo la convención acordada. Ref: ADR-004.
- [x] **IT-04** — Configurar lint de TSDoc
  Agregar `eslint-plugin-tsdoc` (o equivalente) a `eslint.config.mjs`, aplicado a símbolos públicos no triviales. Ref: ADR-006.
- [x] **IT-05** — Instalar y configurar Vitest + Testing Library
  Agregar dependencias, `vitest.config.ts` con umbral de cobertura 80%, `vitest.setup.ts`, un Object Mother de ejemplo en `src/shared/test/object-mother/` y una prueba de referencia en AAA co-localizada con su código. Ref: ADR-007.
- [x] **IT-06** — Instalar y configurar Playwright
  Agregar la dependencia, `playwright.config.ts` y una prueba E2E de ejemplo en `e2e/` que cubra un flujo real de la aplicación. Ref: ADR-008.
- [x] **IT-07** — Instalar y configurar Prettier
  Agregar la dependencia, `.prettierrc.json`, `.prettierignore` y el script `format` en `package.json`. Ref: ADR-009.
- [x] **IT-08** — Instalar y configurar Husky + lint-staged
  Agregar las dependencias, el script `prepare`, `.lintstagedrc.json` y los hooks `pre-commit` (lint-staged) y `pre-push` (pruebas unitarias con cobertura). Ref: ADR-009.
- [x] **IT-09** — Configurar Sonar Scanner como scaffold local
  Agregar `sonar-project.properties` con project key de placeholder y un script npm para ejecutarlo; sin conectar a un servidor real en este WI. Ref: ADR-009.
- [x] **IT-10** — Verificar el proyecto de punta a punta
  Confirmar que `npm run build`, `npm run lint`, la suite de Vitest (con cobertura) y la suite de Playwright se ejecutan sin errores tras todos los cambios anteriores.
