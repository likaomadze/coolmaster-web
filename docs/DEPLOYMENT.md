# Deployment

## Local

```bash
npm install
cp .env.example .env
docker compose up postgres redis
npm run db:migrate
npm run dev
```

## Web on Vercel

Set the project root to `apps/web` and provide:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_WS_URL`
- `NEXT_PUBLIC_GOOGLE_MAPS_KEY`

## Web on Netlify

Use the repository root as the Netlify base directory. `netlify.toml` runs:

```bash
npm run netlify:build
```

Set:

- `NEXT_PUBLIC_API_URL=https://YOUR_RENDER_SERVICE.onrender.com/api`
- `NEXT_PUBLIC_WS_URL=https://YOUR_RENDER_SERVICE.onrender.com`
- `NEXT_PUBLIC_GOOGLE_MAPS_KEY`

Replace the placeholder Render URL in `netlify.toml` if you want Netlify rewrites for `/api/*`.

## API on Railway or DigitalOcean

Run:

```bash
npm run prisma:deploy -w apps/api
npm run start -w apps/api
```

Required managed services:

- PostgreSQL
- Redis
- Cloudinary
- SMTP provider
- SMS provider

## API on Render

`render.yaml` is included. Create PostgreSQL and Redis on Render, then set:

- `DATABASE_URL`
- `REDIS_URL`
- `WEB_ORIGIN=https://YOUR_NETLIFY_SITE.netlify.app`
- `SEED_ADMIN_EMAIL`
- `SEED_ADMIN_PASSWORD`
- `SEED_ADMIN_NAME`

Render build command:

```bash
npm run render:build
```

Render start command:

```bash
npm run render:start
```

The seed creates production service catalog records and the first `SUPER_ADMIN`. After login, only `ADMIN` and `SUPER_ADMIN` users can see `/admin`.

## Docker

```bash
docker compose up --build
```

Nginx gateway is available on `http://localhost:8080`.
