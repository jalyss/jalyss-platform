<h1 align="center">Tamakan ERP Platform</h1>

## About

- [Nest.js](https://nestjs.com/) + JWT + GraphQL (code-first) + REST + Swagger
- [Prisma](https://prisma.io/) + utilities
- Front-end app **
- Full Typescript support
- Common package 
- Core package + NestJS utilites
- ESLint Ready (`yarn lint`)
- Prettier Ready
- CI for GitHub Actions
- Yarn (berry) version `3.2.0` (PnP disabled since it's not supported by NestJs and Prisma yet)

## Structure

This template follows [Nest.js's convention](https://docs.nestjs.com/cli/monorepo) of monorepo, so there are Apps and then there are Libraries.

```
📦 tamakan-erp-monorepo
 ┣ 📂 apps
 ┃ ┣ 📂 api
 ┃ ┣ 📂 web
 ┃ ┗ 📂 etc.
 ┣ 📂 libs
 ┃ ┣ 📂 common 
 ┃ ┣ 📂 core 
 ┃ ┣ 📂 prisma
 ┃ ┗ 📂 etc.
 ┣ 📜.eslintrc.js
 ┣ 📜.prettierrc
 ┣ 📜.yarnrc.yml
```

- core and common are imported from your back-end apps.
- prisma is used by your back-end apps that need database.
- common is shared between all of your apps.

## How to import from other apps/libraries

To import an package (app or library) into another one:

1. Add the package as a dependency like so:

```json apps/api/package.json
{
  "dependencies": {
    "@tamakan-erp/common": "workspace:*"
  }
}
```

Note that the `@tamakan-erp/common` name, comes from `libs/common/package.json`'s name key:

```json
{
  "name": "@tamakan-erp/common"
}
```

2. Use it in your code like this:

```ts
import { MyCommonModule } from '@tamakan-erp/common';
```

## Note about Prisma

Instead of importing your Prisma modules from `@prisma/client`, now you import them from `@tamakan-erp/prisma`.

This way you can defined your schema in a "library" and then import the prisma client in different apps, accessing the same database.

For instance:

```ts
import { PrismaClient } from '@tamakan-erp/prisma';

const prisma = new PrismaClient();
```

## Todos?

- [Turborepo](https://turborepo.org/)
- [NX](https://nx.dev/)
