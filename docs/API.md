# API Modules

## Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/password-reset`
- `POST /api/auth/phone/verify`

## Booking

- `GET /api/bookings/availability?date=2026-05-16&serviceId=...`
- `POST /api/bookings/locks`
- `POST /api/bookings`
- `GET /api/bookings`
- `PATCH /api/bookings/:id`

## CRM Operations

- `GET /api/users`
- `GET /api/technicians`
- `GET /api/analytics/overview`
- `GET /api/notifications`
- `POST /api/uploads`

## Websocket Events

- `chat:message`
- `chat:typing`
- `presence:join`
- `presence:online`
- `chat:sent`
