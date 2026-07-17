# ADR-001: Arquitectura feature-based

**Estado**: Draft
**Fecha de creación**: 2026-07-16
**Última actualización**: 2026-07-16
**Decisores**: Equipo de desarrollo
**Etiquetas**: nextjs, react, frontend, feature-based, arquitectura

## Contexto

El proyecto usa Next.js (App Router) con `src/app` para el enrutamiento y `src/shared` para código transversal. A medida que crece el número de funcionalidades, organizar el código por capa técnica global (componentes, hooks, servicios y estado dispersos en carpetas compartidas por tipo) dificulta localizar todo el código relacionado con una funcionalidad, incrementa el acoplamiento entre partes no relacionadas del dominio y complica delimitar responsabilidades de equipo sobre cada área del producto.

Se necesita un lineamiento transversal sobre cómo se organiza el código de cualquier funcionalidad nueva o existente, para que la estructura del proyecto escale de forma predecible.

## Decision

La arquitectura del proyecto es **feature-based**: el código específico de cada funcionalidad se agrupa bajo `src/features/<nombre-de-la-feature>/`, colocando junto a la feature sus componentes, hooks, estado, servicios/clientes de datos y pruebas.

Reglas:

- Todo código exclusivo de una funcionalidad vive dentro de su carpeta en `src/features/`; no se dispersa en carpetas compartidas por tipo técnico (p. ej. un `components/` o `hooks/` global para todo el proyecto).
- El código realmente transversal (utilidades genéricas, primitivas de UI del design system, hooks sin lógica de dominio) vive en `src/shared/`.
- Una feature no importa directamente archivos internos de otra feature. Si una funcionalidad necesita algo de otra, se expone mediante un punto de entrada público de esa feature (p. ej. `index.ts`) o se compone en la capa de rutas (`src/app`).
- `src/app` actúa como capa de composición/enrutamiento: importa y ensambla features, pero no contiene lógica de dominio propia.

## Consecuencias

### Positivas

- Todo el código de una funcionalidad queda localizado en un mismo lugar, facilitando onboarding y mantenimiento.
- Reduce el acoplamiento accidental entre funcionalidades no relacionadas.
- Permite escalar el proyecto y, potencialmente, dividir ownership por feature entre personas o equipos.

### Negativas / trade-offs

- Requiere disciplina para no filtrar imports directos entre features; sin verificación automática tiende a degradarse con el tiempo.
- Código existente en `src/app`/`src/shared` requiere migración progresiva hacia `src/features`.
- Puede introducir cierta duplicación deliberada entre features frente a una organización por capa técnica.

## Fitness function

Apto: Sí
Estado: Creada
Herramienta: dependency-cruiser
Ubicación: .dependency-cruiser.cjs (regla `no-cross-feature-imports`)
Comando: npm run arch:check

## Referencias

- [Next.js — Project Organization](https://nextjs.org/docs/app/getting-started/project-structure)
