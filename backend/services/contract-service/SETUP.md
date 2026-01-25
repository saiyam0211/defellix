# Contract Service – Setup (Phase 3)

## What this service does

- **Create contract (draft)** – Project details, client details, milestones, terms.
- **Update contract** – Only when status is `draft`.
- **Send to client** – Status `draft` → `sent`, sets `sent_at`; response includes `shareable_link` when `SHAREABLE_LINK_BASE_URL` is set; triggers “email to client” notification (hook; no-op by default).
- **List / get** – By freelancer; when sent, `shareable_link` is included if base URL is set.
- **Draft auto-delete** – Background job deletes drafts older than `DRAFT_EXPIRY_DAYS` (default 14) every `DRAFT_CLEANUP_INTERVAL_MINS` (default 360 = 6h).

Uses the **same PostgreSQL database** as auth-service and user-service: `freelancer_platform`.

---

## Prerequisites

- Go 1.24+
- PostgreSQL (already used by auth-service and user-service)

---

## Database

Reuse the existing database. Contract-service will create:

- `contracts`
- `contract_milestones`

No extra DB setup if auth/user are already running against `freelancer_platform`.

---

## Environment variables

Copy from example and adjust:

```bash
cp .env.example .env
```

Required:

- **DB_*** – Same as auth/user (host, port, user, password, `DB_NAME=freelancer_platform`, SSL mode).
- **JWT_SECRET** – Same value as auth-service, so access tokens from login can be validated here.

Optional:

- **SERVER_PORT** – Default `8082`.
- **APP_ENV**, **LOG_LEVEL** – As needed.
- **SHAREABLE_LINK_BASE_URL** – Base for contract links (e.g. `https://app.ourdomain.com/contract`). When set, send/get responses include `shareable_link`.
- **DRAFT_EXPIRY_DAYS** – Delete drafts older than this (default `14`).
- **DRAFT_CLEANUP_INTERVAL_MINS** – How often the draft-cleanup job runs in minutes (default `360`).

---

## Run

```bash
cd backend/services/contract-service
go run cmd/server/main.go
```

Default base URL: `http://0.0.0.0:8082`

---

## Verify

```bash
curl -s http://localhost:8082/health
```

Expected shape: `{"status":"healthy","service":"contract-service",...}`

---

## API overview (all require `Authorization: Bearer <access_token>`)

- `POST /api/v1/contracts` – Create contract (draft). Body: project + client + milestones + terms.
- `GET /api/v1/contracts` – List contracts. Query: `?status=draft|sent&page=1&limit=20`.
- `GET /api/v1/contracts/:id` – Get one contract.
- `PUT /api/v1/contracts/:id` – Update contract (draft only).
- `POST /api/v1/contracts/:id/send` – Mark as sent (draft → sent). Response includes `shareable_link` when configured.
- `DELETE /api/v1/contracts/:id` – Delete contract (draft only).

Use the same access token you get from auth-service login. Drafts are automatically deleted by a background job after 14 days (configurable).
