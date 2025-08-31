# Pack 6 — Code/System Design + Capstone
## Atoms (code & system design)
- CS-01 SRP Pricing — pure logic + tests.
- CS-02 Clean Slugify — normalize tiếng Việt.
- CS-03 Parameter Object — EmailOptions builder.
- CS-04 Strategy Pattern — discount engines.
- CS-05 System Design Notes — idempotency, rate limit, cache, saga.
- CS-06 URL Shortener — base62 encode/decode + tests.

## Capstone (mock runnable)
- Gateway GraphQL (Node) `/graphql` trả `hello: "world"`.
- Frontend dev server `/bff` gọi gateway.
- Postgres schema cho users/orders.
- Docker Compose: `db + gateway + frontend`.
- Tests Playwright API hit `/graphql`.

### Chạy nhanh
```bash
# 1) Gateway
cd capstone/repo/gateway && npm i && node index.js

# 2) Frontend
cd ../frontend && npm i node-fetch && node src/dev-server.js

# 3) E2E
cd ../../tests && npm i && npm run test:e2e
```
