# ALLKU-PET Core

Backend principal de ALLKU-PET.

## Stack

- Node.js 22+
- TypeScript
- NestJS
- Fastify
- PostgreSQL
- Prisma
- Zod
- Vitest
- ESLint + SonarJS
- dependency-cruiser
- OpenAPI/Swagger

## Arquitectura

Monolito modular con arquitectura hexagonal por módulo:

```text
src/modules/<module>/
├── api/
├── application/
├── domain/
└── infrastructure/
```

Reglas:

- `domain` no depende de NestJS, Prisma, Fastify ni adapters.
- `application` depende del dominio y sus puertos.
- `infrastructure` implementa puertos.
- `api` adapta HTTP hacia casos de uso.
- Los módulos no acceden directamente a internals de otros módulos.
- Las reglas críticas de negocio viven en Core.

## Primera vertical

`customer` incluye:

- entidad de dominio;
- puerto de repositorio;
- caso de uso;
- adapter Prisma;
- controller HTTP;
- validación Zod;
- unit tests.

También se incluye `health`.

## Preparación local

```bash
cp .env.example .env
npm install
npm run prisma:generate
```

Crear PostgreSQL local con base `allku_pet` y configurar `DATABASE_URL`.

## Ejecutar

```bash
npm run start:dev
```

Endpoints iniciales:

```text
GET  /api/v1/health
POST /api/v1/customers
GET  /docs
```

## Quality gates locales

```bash
npm run typecheck
npm run lint
npm run format
npm run architecture
npm run test:coverage
npm run build
```

O todo junto:

```bash
npm run quality
```

Cobertura mínima inicial:

```text
lines      >= 80%
functions  >= 80%
branches   >= 80%
statements >= 80%
```

## Equivalencia aproximada con Java

| Java | ALLKU-PET Core |
|---|---|
| Checkstyle | ESLint + Prettier |
| PMD | ESLint + typescript-eslint + SonarJS |
| FindBugs/SpotBugs | TypeScript strict + ESLint/SonarJS |
| ArchUnit | dependency-cruiser |
| JUnit | Vitest |
| JaCoCo | Vitest coverage (V8) |

Los pipelines no deben ejecutarse automáticamente desde ramas feature.
