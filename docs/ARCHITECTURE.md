# Architecture

## Web

Next.js App Router renders the marketing site, booking flow, customer dashboard, admin CRM, calendar, technician panel and chat widget. TanStack Query owns server state, Zustand owns local booking drafts, Zod validates forms, Axios talks to the API and Socket.io streams chat and availability events.

## API

NestJS modules are split by capability: auth, booking, user, technician, chat, notifications, uploads and analytics. Prisma maps domain models to PostgreSQL. Redis is used for slot locks, websocket presence, throttling and cache. Swagger is exposed at `/docs`.

## Booking Availability

Slots are computed from working hours, holidays, existing non-cancelled bookings and Redis checkout locks. `POST /api/bookings/locks` stores a 10-minute lock with `NX` semantics so two customers cannot hold the same slot.

## Security

- Argon2 password hashing.
- JWT access and refresh tokens.
- Role guards for admin and technician operations.
- Helmet headers, CORS allowlist and request validation.
- Uploads are isolated behind an upload module ready for Cloudinary signed uploads.
- Rate limiting through Nest throttler and Redis-ready architecture.

## Deployment

- Vercel can deploy `apps/web`.
- Railway or DigitalOcean can deploy `apps/api`.
- Docker Compose provides full local stack.
- Nginx config routes `/api` and websocket traffic.
