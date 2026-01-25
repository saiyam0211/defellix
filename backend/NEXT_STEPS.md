# Next Steps — Backend
## Where we are and what to do next

**Always use:** [RULES_OF_BACKEND.md](./RULES_OF_BACKEND.md) in every backend-related prompt.  
**Source of truth for product:** User flow in [execution.md](./execution.md#1-user-flow-source-of-truth).

---

## Where we are now

- **Auth:** ✅ Done (login/signup, JWT, OAuth).
- **User:** ✅ Done (profile CRUD, skills, projects, search). Pending: `user_name`, public profile, visibility.
- **Contract:** ✅ Create/update/list/get, save as draft, send to client, delete draft.  
  ❌ Pending: draft 14-day auto-delete, shareable link, email on send, client view/sign/send-for-review, wallets, blockchain on sign.

---

## Recommended order of work

Do these in sequence so each step has a clear input/output.

### 1. Draft auto-delete (14 days)

- **What:** Remove contracts with `status = draft` and `updated_at` (or `created_at`) older than 14 days.
- **Where:** Contract service (or a small jobs runner that calls contract-service logic).
- **How:** Cron or internal ticker; use a single DB query + delete in a transaction. Idempotent and safe to run daily/hourly.
- **Rules:** [RULES_OF_BACKEND.md](./RULES_OF_BACKEND.md) — jobs off hot path, no PII in logs.

---

### 2. Send experience: shareable link + email

- **Shareable link:** For a contract in `sent` (or after send), expose a URL the freelancer can copy. Example: `GET /api/v1/contracts/:id/share-link` returning `{ "url": "https://ourdomain.com/contract/xxx" }` where `xxx` is a UUID or signed token. Frontend uses this for “Copy link”.
- **Email on send:** When `POST /api/v1/contracts/:id/send` succeeds, enqueue or call a notification step that sends email to `contract.client_email` with the same link (or magic link). Don’t block the send API on email delivery.

---

### 3. Client: view contract by link

- **What:** Client opens the contract via the shareable link (no login required for view).
- **Backend:** 
  - Public or tokenised endpoint, e.g. `GET /api/v1/public/contracts/:token` that returns contract details needed for the “view + sign or send for review” screen.
  - Token should be a UUID or signed payload (e.g. contract_id + expiry) so it can’t be guessed.

---

### 4. Client: sign or send for review

- **Sign:**  
  - Accept payload: required fields (e.g. company address: remote | full address | Google Maps URL), optional (GST, business mail, Instagram, LinkedIn).  
  - Validate (e.g. GST format if implemented).  
  - Then: create/use wallets, write contract to blockchain, save tx id/hash/timestamp/deadline/amount/gas, set status `signed`.  
  - Do not require the user to manage keys; wallets are created/used by the backend.

- **Send for review:**  
  - Client sends a comment; status becomes e.g. `pending_review`.  
  - Freelancer can update contract and call “send” again; client sees updated version and can sign or send for review again.

---

### 5. Wallets and blockchain on sign

- **Wallets:** Backend creates and stores custodial wallets for freelancer and client (e.g. on first contract or on sign). No UI for private keys.
- **On sign:** One service (e.g. blockchain-service) writes the contract record on-chain and returns transaction id, hash, timestamp, etc. Contract service stores these on the contract row and sets status `signed`.
- **Rules:** [RULES_OF_BACKEND.md](./RULES_OF_BACKEND.md) — “Zero blockchain friction”, “Legalising contracts”.

---

### 6. Submission and client review

- **Submission:**  
  - Freelancer submits: one field that matches “submission criteria” + one “detailed description” field.  
  - Store submission; trigger email to client.

- **Review:**  
  - Client can **Accept** or **Ask for revision** (with optional comment).  
  - Accept/revision updates submission/contract state and can trigger emails.

---

### 7. Reputation and profile link

- **Reputation:** Compute per-contract score from: client review, on-time vs late, accepted vs not. Persist; later you can expose it on profile and optionally on-chain.
- **Profile:**  
  - Link contract to freelancer profile (e.g. `contract_id` or summary on profile).  
  - Add visibility: freelancer chooses which contracts (and which fields) show on public profile.

---

### 8. Public profile and `user_name`

- **user_name:** Add to user profile; unique; used in `ourdomain.com/user_name`.
- **Public profile API:** e.g. `GET /api/v1/public/profile/:user_name` that returns only allowed fields based on visibility.
- **Visibility:** Which parts of profile, projects, and contracts are shown (already referenced in execution plan).

---

## Quick reference

| Document | Use |
|----------|-----|
| [RULES_OF_BACKEND.md](./RULES_OF_BACKEND.md) | Attach to every backend prompt; principles, stack, conventions. |
| [execution.md](./execution.md) | User flow (source of truth), phases, done/not-done, deliverables. |
| [Learning/executionAccordingLearning.md](../Learning/executionAccordingLearning.md) | How we implemented each phase. |
| [Learning/TestBackend.md](../Learning/TestBackend.md) | How to test each phase. |

---

**Last updated:** January 2026
