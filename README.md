# HVAC SaaS Platform

Production-oriented monorepo for an HVAC and air conditioner installation service company.

## Apps

- `apps/web`: Next.js customer website, booking flow, CRM admin, technician and customer dashboards.
- `apps/api`: NestJS API with Prisma, JWT auth, role guards, booking, chat, uploads, notifications, analytics and Swagger.
- `apps/mobile`: Expo React Native app for customers and technicians.
- `packages/shared`: Shared TypeScript domain types and constants.

## Quick Start

```bash
npm install
cp .env.example .env
npm run db:generate
npm run dev
```

Web: `http://localhost:3000`

API: `http://localhost:4000/api`

Swagger: `http://localhost:4000/docs`

## Production Shape

The platform is designed around:

- PostgreSQL with Prisma migrations and indexed scheduling tables.
- Redis for rate limiting, slot locks, cache, queues and websocket presence.
- Socket.io for booking slot updates, chat, typing indicators and admin alerts.
- Cloudinary-compatible secure upload module.
- JWT access tokens plus refresh token storage.
- Role-based access for customer, technician, admin and super admin.
- Docker Compose for local infrastructure and Nginx for production reverse proxy.
- Netlify web deployment and Render API deployment configs.
- Admin panel is hidden and blocked unless the logged-in JWT user has `ADMIN` or `SUPER_ADMIN`.

## Environment

See `.env.example` for all required variables.
# coolmaster-web
