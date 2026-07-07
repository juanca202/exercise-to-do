# WI-002: Aplicar GitFlow y Conventional Commits (rama develop + commitlint)

Estado: Ready
Tipo: operativa
Repositorio: exercise-todo
Asignado a: juanca202

## Descripción

El proyecto adoptó GitFlow y Conventional Commits en ADR-010, pero el repositorio todavía no tiene la rama `develop` creada ni una verificación automática de que los mensajes de commit sigan Conventional Commits. Sin esa rama y sin esa verificación, la decisión queda solo documentada sin aplicarse en el flujo real de trabajo.

## Contexto

Husky ya está instalado en el repositorio (WI-001, según ADR-009) con hooks `pre-commit` y `pre-push`. Este work item añade el hook `commit-msg` de Husky para validar Conventional Commits con commitlint, y crea la rama `develop` como rama de integración de GitFlow a partir de `main`.

## Dependencias

- @commitlint/cli — motor de validación de mensajes de commit.
- @commitlint/config-conventional — reglas de la convención Conventional Commits.
- Husky (ya instalado) — ejecuta commitlint en el hook `commit-msg`.

## Referencias

- **Arquitectura:** [ADR-010: Estrategia de branching GitFlow con Conventional Commits](../../../adr/ADR-010-branching-gitflow-conventional-commits.md)
- **Arquitectura:** [ADR-009: Adopción de un Quality Gate shift-left](../../../adr/ADR-009-quality-gate-shift-left.md)

## Criterios de aceptación

- **AC-001 (Mantenibilidad):** El repositorio DEBE tener una rama `develop` creada a partir de `main`.
- **AC-002 (Mantenibilidad):** El proyecto DEBE tener commitlint configurado con la convención Conventional Commits (`@commitlint/config-conventional`).
- **AC-003 (Mantenibilidad):** El hook `commit-msg` de Husky DEBE ejecutar commitlint sobre cada mensaje de commit.
- **AC-004 (Idoneidad funcional):** Un commit con un mensaje que no sigue Conventional Commits DEBE ser rechazado por el hook; un commit con un mensaje válido DEBE ser aceptado.

## Archivos afectados

```text
exercise-todo/
├── ~ package.json              # dependencia @commitlint/cli, @commitlint/config-conventional
├── + commitlint.config.mjs     # reglas de Conventional Commits
└── + .husky/commit-msg         # hook: commitlint sobre el mensaje del commit
```

## Plan de implementación

- [x] **IT-01** — Instalar y configurar commitlint
  Agregar `@commitlint/cli` y `@commitlint/config-conventional`; crear `commitlint.config.mjs` extendiendo `@commitlint/config-conventional`. Ref: ADR-010.
- [x] **IT-02** — Agregar el hook `commit-msg` de Husky
  Crear `.husky/commit-msg` ejecutando `commitlint --edit` sobre el mensaje del commit. Ref: ADR-009, ADR-010.
- [x] **IT-03** — Verificar el hook con un commit inválido y uno válido
  Confirmar que un mensaje que no sigue Conventional Commits es rechazado y que uno válido es aceptado.
- [x] **IT-04** — Crear la rama `develop`
  Crear `develop` a partir de `main` como rama de integración de GitFlow. Ref: ADR-010.
