# BizFlow AI CRM

> A monorepo for BizFlow — a CRM platform with an AI-enabled backend and a Next.js frontend.

**Contents**
- **Overview:** What this repo contains and how pieces fit together.
- **Quick start:** Run locally with Docker or with local services.
- **Development:** Tips for working on the `apps/server` and `web` projects.
- **Prisma / Database:** Migration and generation steps.
- **Contributing & Support**

---

## Project overview

This repository contains the BizFlow AI CRM application split into two primary applications in a monorepo layout:

- [apps/server](apps/server) — Node.js / TypeScript backend with Prisma for database access, API routes, workers and domain modules.
- [web](web) — Next.js frontend (TypeScript) providing the user interface for the CRM.

Infrastructure and orchestration files (Docker, compose) live in the repository root.

## Key features

- Multi-tenant-ready backend with Prisma schema and migrations.
- Next.js frontend with reusable UI components and auth hooks.
- Background workers and queues for asynchronous processing.
- Ready-made Docker setup for local development.

## Prerequisites

- Node.js 18+ (recommended)
- npm or pnpm
- Docker & Docker Compose (for local DB and services)

## Quick start (Docker)

1. Copy or configure environment variables at the repo root or in each app as needed (see Environment section below).
2. Start services with Docker Compose:

```bash
docker-compose up -d
```

3. Run Prisma migrations (server):

```bash
cd apps/server
npx prisma migrate deploy
npx prisma generate
```

4. Start the apps in development:

```bash
# In one terminal (backend)
cd apps/server
npm install
npm run dev

# In another terminal (frontend)
cd web
npm install
npm run dev
```

Open the frontend at http://localhost:3000 (or as configured) and the API at the backend port (default defined in `apps/server` configuration).

## Quick start (local, without Docker)

1. Ensure you have a running Postgres instance and set `DATABASE_URL` in the server `.env`.
2. From `apps/server` run:

```bash
npx prisma migrate dev
npx prisma generate
npm run dev
```

3. From `web` run:

```bash
npm run dev
```

## Environment variables (example)

Create a `.env` file in `apps/server` (and optionally one in `web`) with the following values:

```
DATABASE_URL=postgresql://user:password@localhost:5432/bizflow
NODE_ENV=development
PORT=4000
JWT_SECRET=replace-with-secure-value
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Adjust ports and secrets to match your environment.

## Database & Prisma

Prisma schema and migrations are located under `apps/server/prisma` (schema, migrations).

- Generate Prisma client:

```bash
cd apps/server
npx prisma generate
```

- Apply migrations (development):

```bash
cd apps/server
npx prisma migrate dev
```

- Apply migrations (CI / production):

```bash
cd apps/server
npx prisma migrate deploy
```

## Repository structure (short)

- `apps/server` — backend, Prisma, routes, services, workers
- `web` — Next.js frontend and UI components
- `docker-compose.yml` — local development services

## Useful scripts

Run these from the relevant package folder (either `apps/server` or `web`):

- `npm run dev` — start in development mode
- `npm run build` — produce production build
- `npm run start` — run production build

Check each package.json for exact scripts.

## Testing

If tests are configured in either `apps/server` or `web`, run them from the package root:

```bash
cd apps/server
npm test

cd web
npm test
```

## Docker & deployment

The repository includes `docker-compose.yml` for local development. Production deployments should build and deploy each app using your preferred CI/CD flow.

## Development notes

- The backend exposes modular domains under `apps/server/src/modules`.
- The frontend code lives in `web/src` and uses hooks in `web/src/hooks` to centralize auth and client logic.
- Prisma client is built into `apps/server/prisma` and used across services and repositories.

## Contributing

Contributions are welcome. Please open issues for bugs or feature requests and create pull requests for proposed changes.

1. Fork the repo
2. Create a feature branch
3. Run tests and linting locally
4. Open a PR with a clear description

## Where to look first

- Backend entry: [apps/server/src/app.ts](apps/server/src/app.ts)
- Frontend entry: [web/src/app/page.tsx](web/src/app/page.tsx)
- DB schema & migrations: [apps/server/prisma/schema.prisma](apps/server/prisma/schema.prisma)

## License

Specify your project license here (e.g., MIT) or add a `LICENSE` file in the repository root.

---

If you want, I can:
- add an example `.env.example` file,
- create more detailed setup steps for Windows-specific Docker/docker-compose quirks, or
- scaffold a CONTRIBUTING.md and CODE_OF_CONDUCT.

Tell me which of those you'd like next.

