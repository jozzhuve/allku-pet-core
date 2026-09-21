module.exports = {
  forbidden: [
    {
      name: 'domain-must-not-depend-on-outer-layers',
      severity: 'error',
      from: { path: '/domain/' },
      to: { path: '/(application|api|infrastructure)/' }
    },
    {
      name: 'application-must-not-depend-on-adapters',
      severity: 'error',
      from: { path: '/application/' },
      to: { path: '/(api|infrastructure)/' }
    },
    {
      name: 'domain-must-not-depend-on-frameworks',
      severity: 'error',
      from: { path: '/domain/' },
      to: { path: 'node_modules/(?:@nestjs|@prisma|fastify)' }
    },
    {
      name: 'no-circular',
      severity: 'error',
      from: {},
      to: { circular: true }
    }
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: 'tsconfig.json' }
  }
};
