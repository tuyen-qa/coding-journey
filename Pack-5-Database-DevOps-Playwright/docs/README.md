# Pack 5 — Database + DevOps + Playwright
## Atoms
- **DB-01 SQL Basics (Postgres)** — schema/seed/query.
- **DB-02 Index & EXPLAIN** — composite index + benchmark.
- **DB-03 Mongo Aggregation** — pipeline JSON.
- **DO-01 Dockerfile Basics** — app Node tối giản.
- **DO-02 Docker Compose** — Postgres + app Node (PG client).
- **DO-03 Jenkins** — Jenkinsfile chạy Playwright E2E.
- **tests/** — Playwright API tests dùng `request` fixture.

## Chạy nhanh (local)
1) **Dockerfile basics**:
   ```bash
   cd atoms/do-01-dockerfile-basics
   docker build -t mini-node .
   docker run -p 3000:3000 mini-node
   ```
2) **Docker Compose (Postgres + app)**:
   ```bash
   cd atoms/do-02-docker-compose
   docker compose up -d --build
   # sau đó
   cd ../../tests && npm i && npm run test:e2e
   ```
3) **Jenkins CI**: trỏ job vào repo, chạy pipeline theo `Jenkinsfile`.

## Ghi chú
- `users.spec.ts` đòi hỏi service `/users` từ compose app. Nếu chưa bật compose, test này có thể fail.
- Để seed dữ liệu trong compose, xem `db-init/001_schema.sql` và thêm `002_seed.sql` nếu muốn.
