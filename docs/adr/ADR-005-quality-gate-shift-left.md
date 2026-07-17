# ADR-005: Quality Gate shift-left

**Estado**: Draft
**Fecha de creación**: 2026-07-16
**Última actualización**: 2026-07-16
**Decisores**: Equipo de desarrollo
**Etiquetas**: quality-gate, shift-left, ci, husky, sonar, calidad

## Contexto

Detectar defectos de calidad (estilo inconsistente, regresiones, código no probado, code smells) recién en integración o producción es más costoso de corregir que detectarlos en el momento en que se escribe el código. El proyecto necesita un lineamiento transversal que empuje ("shift left") las verificaciones de calidad lo más temprano posible en el ciclo de desarrollo, en lugar de depender únicamente de revisión manual o de etapas tardías del pipeline.

## Decision

El proyecto adopta un **Quality Gate shift-left** compuesto por las siguientes etapas, ejecutadas lo más temprano posible (localmente, antes de llegar a integración):

- **Lint** (ESLint): reglas de código estático.
- **Formato** (Prettier): formato consistente del código.
- **Pruebas y cobertura** (Vitest): ver [ADR-003](ADR-003-estrategia-pruebas-unitarias.md).
- **Git hooks** (Husky): automatizan la ejecución de las verificaciones en puntos del flujo de git (commit, push).
- **Ejecución solo en archivos modificados** (lint-staged): lint y formato corren únicamente sobre los archivos staged en cada commit, no sobre todo el repositorio.
- **Pruebas E2E** (Playwright): ver [ADR-004](ADR-004-playwright-e2e.md).
- **Calidad de código** (Sonar scanner): análisis estático de calidad (code smells, duplicación, vulnerabilidades) mediante un servidor Sonar (SonarCloud o SonarQube self-hosted).

## Consecuencias

### Positivas

- Los defectos se detectan y corrigen cerca de donde se introducen, reduciendo el costo de arreglarlos más tarde.
- `lint-staged` mantiene los hooks de git rápidos al limitar el chequeo a los archivos modificados.
- Cada etapa referencia una decisión propia (ADR-003, ADR-004) o una herramienta concreta, evitando ambigüedad sobre qué se ejecuta y cuándo.

### Negativas / trade-offs

- Más pasos automatizados antes de poder commitear/pushear añaden fricción al flujo de trabajo local.
- Sonar scanner requiere un servidor (SonarCloud o SonarQube) y credenciales; sin esa infraestructura conectada, esa etapa queda como scaffold local no ejecutable en CI.

## Fitness function

<!--
Es objetivamente verificable que cada etapa declarada (lint, formato, tests+cobertura, husky,
lint-staged, e2e, sonar) esté efectivamente configurada y wireada (scripts en package.json, hooks
en .husky/, configuración de cada herramienta presente). No fue creada aún: el usuario decidió
dejarla pendiente en esta iteración.
-->
Apto: Sí
Estado: Pendiente
Herramienta: TODO
Ubicación: TODO
Comando: TODO

## Referencias

- [ADR-003: Estrategia de pruebas unitarias](ADR-003-estrategia-pruebas-unitarias.md)
- [ADR-004: Uso de Playwright para pruebas E2E](ADR-004-playwright-e2e.md)
- [SonarQube / SonarCloud](https://docs.sonarsource.com/)
- Sonar scanner reinstalado como parte de este ADR: `@sonar/scan`, script `npm run sonar` y `sonar-project.properties` (scaffold local — requiere conectar `sonar.host.url` u `organization`/`SONAR_TOKEN` antes de poder ejecutarse contra un servidor real).
