/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-cross-feature-imports',
      comment:
        'ADR-001: una feature no debe importar archivos internos de otra feature. ' +
        'Si necesita algo de otra feature, debe exponerse desde su punto de entrada ' +
        'público (index) o componerse en src/app.',
      severity: 'error',
      from: {
        path: '^src/features/([^/]+)/',
      },
      to: {
        path: '^src/features/([^/]+)/',
        pathNot: ['^src/features/$1/', '^src/features/[^/]+/index\\.(t|j)sx?$'],
      },
    },
  ],
  options: {
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: 'tsconfig.json',
    },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default'],
    },
  },
};
