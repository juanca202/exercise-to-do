# ADR-004: Uso de Playwright para pruebas E2E

**Estado**: Draft
**Fecha de creación**: 2026-07-16
**Última actualización**: 2026-07-16
**Decisores**: Equipo de desarrollo
**Etiquetas**: testing, e2e, playwright, calidad

## Contexto

Las pruebas unitarias ([ADR-003](ADR-003-estrategia-pruebas-unitarias.md)) verifican comportamiento aislado, pero no garantizan que los flujos completos de la aplicación funcionen de punta a punta desde la perspectiva de quien la usa (navegación, interacción con la UI real, integración entre capas). El proyecto necesita un lineamiento único sobre qué herramienta usar para ese nivel de prueba, evitando que convivan múltiples frameworks E2E con solapamiento de responsabilidades.

## Decision

El proyecto usa **Playwright** como única herramienta de pruebas end-to-end. Los tests E2E se ubican en el directorio `e2e/` y no se introducen frameworks E2E alternativos (p. ej. Cypress, TestCafe, WebdriverIO) para ese mismo propósito.

## Consecuencias

### Positivas

- Un único framework E2E reduce la curva de aprendizaje y evita duplicar configuración/infraestructura de pruebas.
- Playwright soporta múltiples motores de navegador y ejecución paralela, útil a medida que crece la cantidad de flujos cubiertos.

### Negativas / trade-offs

- Las pruebas E2E son más lentas y costosas de mantener que las unitarias; deben reservarse para flujos críticos, no como sustituto de ADR-003.
- Adoptar Playwright como única opción implica migrar cualquier prueba E2E futura que se escriba con otra herramienta.

## Fitness function

<!--
Es objetivamente verificable que no aparezcan frameworks E2E alternativos como dependencia del
proyecto (comprobación de package.json), pero no fue creada aún: el usuario decidió dejarla
pendiente en esta iteración.
-->
Apto: Sí
Estado: Pendiente
Herramienta: TODO
Ubicación: TODO
Comando: TODO

## Referencias

- [Playwright](https://playwright.dev/)
- [ADR-003: Estrategia de pruebas unitarias](ADR-003-estrategia-pruebas-unitarias.md)
