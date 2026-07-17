# ADR-003: Estrategia de pruebas unitarias

**Estado**: Draft
**Fecha de creación**: 2026-07-16
**Última actualización**: 2026-07-16
**Decisores**: Equipo de desarrollo
**Etiquetas**: testing, vitest, testing-library, cobertura, calidad

## Contexto

El proyecto necesita confianza objetiva de que el código se comporta como se espera al modificarlo o refactorizarlo. Sin una estrategia de pruebas unitarias uniforme, la cobertura de casos queda librada al criterio individual, los tests se vuelven frágiles o acoplados a detalles de implementación, y las pruebas no determinísticas o dependientes entre sí generan falsos positivos/negativos que erosionan la confianza en la suite.

## Decision

El proyecto usa **Vitest** como test runner y **Testing Library** para pruebas de componentes/UI.

Reglas:

- **Ubicación**: los archivos de prueba se colocan junto al código bajo prueba (co-localizados dentro de la feature o módulo correspondiente, no en un directorio `tests/` centralizado), en línea con la organización feature-based del proyecto.
- **Patrón AAA** (Arrange-Act-Assert): cada test estructura su cuerpo en las tres fases, separadas y reconocibles.
- **Object Mother Pattern**: la construcción de objetos/datos de prueba complejos se centraliza en funciones o factories reutilizables ("mothers") en lugar de duplicar la construcción de fixtures en cada test.
- **Cobertura mínima del 80%** (líneas, funciones, branches y statements) como umbral obligatorio.
- **Aislamiento y determinismo**: cada test debe poder ejecutarse de forma independiente y en cualquier orden, sin depender de estado compartido, tiempo real, red o el resultado de otro test.

## Consecuencias

### Positivas

- Mayor confianza para refactorizar y evolucionar el código sin introducir regresiones.
- Tests legibles y consistentes gracias a AAA y a la reutilización de fixtures vía Object Mother.
- Una suite determinista y aislada es reproducible en cualquier entorno (local, CI) sin resultados intermitentes.

### Negativas / trade-offs

- Mantener el umbral de cobertura exige escribir pruebas también para casos menos evidentes, incrementando el esfuerzo de desarrollo.
- El cumplimiento de AAA y Object Mother Pattern depende de revisión de código; no toda desviación es detectable automáticamente.

## Fitness function

<!--
El umbral de cobertura del 80% ya está implementado como thresholds de Vitest (v8 provider) en
vitest.config.ts y se ejecuta en el hook pre-push de Husky (npm run test:coverage). AAA, Object
Mother Pattern, ubicación exacta de archivos, aislamiento y determinismo dependen de revisión de
código humana; no existe una regla determinista de bajo costo que los valide de forma completa.
-->
Apto: Sí (parcial)
Estado: Creada
Herramienta: Vitest (coverage thresholds, provider v8)
Ubicación: vitest.config.ts (`test.coverage.thresholds`)
Comando: npm run test:coverage

## Referencias

- [Vitest](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Object Mother Pattern](https://martinfowler.com/bliki/ObjectMother.html)
