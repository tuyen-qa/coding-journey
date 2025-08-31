# 🚀 Coding Journey

Repo này ghi lại hành trình học fullstack developer  
với sự hỗ trợ của **ChatGPT Project** acting as mentor.

---

## 🎯 Mục tiêu
- Thành thạo **JavaScript/TypeScript/React**.
- Nắm chắc **DSA (Java + TS)**.
- Làm việc với **Java Spring Boot**.
- Hiểu và áp dụng **GraphQL, Redux, Apollo**.
- Triển khai **Database, Docker, Jenkins, Amazon**.
- Rèn tư duy **problem solving + system design**.

---

## 📂 Cấu trúc thư mục

```bash
coding-journey/
│
├── project-templates/        # 📑 các file template (instructions, daily, weekly, mentor prompt)
│   ├── PROJECT_INSTRUCTION.md
│   ├── DAILY_TEMPLATE.md
│   ├── WEEKLY_REPORT_TEMPLATE.md
│   ├── MENTOR_PROMPT.md
│   └── README.md
│
├── logs/                     # 📒 nhật ký học tập
│   ├── day-1.md
│   ├── day-2.md
│   └── week-1-report.md
│
├── pack-1-js-core/           # 📦 Pack 1 (JavaScript Core)
│   └── atoms/...
│
├── pack-2-dsa/               # 📦 Pack 2 (DSA Java + TS)
│   └── atoms/...
│
├── pack-3-react-ts/          # 📦 Pack 3 (React/TS)
│   └── atoms/...
│
├── pack-4-java-spring/       # 📦 Pack 4 (Java + Spring Boot)
│   └── atoms/...
│
├── pack-5-db-devops/         # 📦 Pack 5 (Database + DevOps + Playwright)
│   └── atoms/...
│
├── pack-6-graphql-project/   # 📦 Pack 6 (GraphQL + Fullstack Project)
│   └── atoms/...
│
├── pack-7-data-processing/   # 📦 Pack 7 (Data Processing in JS)
│   └── atoms/...
│
├── pack-8A-patterns/         # 📦 Pack 8A (Pattern Background)
│   └── atoms/...
│
├── pack-8B-dp-graphs/        # 📦 Pack 8B (Trees, Graphs, Backtracking, DP)
│   └── atoms/...
│
├── pack-8C-lis-string-trie/  # 📦 Pack 8C (LIS, String, Trie, MQ)
│   └── atoms/...
│
└── README.md                 # File bạn đang đọc
```
---

## 🔄 Workflow hàng ngày

1. Chọn atom → /assign <atom> trong ChatGPT.
2. Code trong src/index.js → chạy node test/index.test.js.
3. Viết reflection → update REFLECTION.md.
4. Log học tập → logs/day-X.md.
5. Commit branch day-X-atom → push GitHub.
6. Paste PR link vào ChatGPT → /review + /grade.

---

## 📅 Workflow hàng tuần

1. Cuối tuần tạo logs/week-X-report.md (từ template).
2. Nhờ ChatGPT tổng hợp insight:

```bash
/review week-1-report.md
```
3. Update roadmap cá nhân.

---

## 🧭 Giai đoạn học

### Giai đoạn 1 — Nền tảng JavaScript (Pack 1 + Pack 7 + Pack 8A)
⏳ 3 tuần
- JS core (scope, closure, async, OOP/FP).
- Data processing (map/filter/reduce, sorting, grouping, CSV parser).
- Pattern cơ bản (hash map, two pointers, sliding window, prefix sum, binary search).

### Giai đoạn 2 — Data Structures & Algorithms (Pack 2 + Pack 8B + Pack 8C)
⏳ 6 tuần
- DSA cơ bản (stack, queue, heap, union-find, BFS/DFS, greedy).
- Trees, graphs, shortest path, islands.
- Backtracking + DP (subsets, permutations, word search, DP 1D/2D).
- LIS, KMP, Rabin–Karp, Trie, Monotonic Queue.

### Giai đoạn 3 — Frontend & Backend Core (Pack 3 + Pack 4)
⏳ 4 tuần
- React + Redux + TS.
- Java Spring Boot (REST API, CRUD, auth).

### Giai đoạn 4 — Database + DevOps + Testing (Pack 5)
⏳ 3 tuần
- SQL, schema design, queries, indexes.
- Docker, Docker Compose, Jenkins.
- Playwright E2E testing.

### Giai đoạn 5 — GraphQL & Project (Pack 6)
⏳ 3 tuần
- Apollo GraphQL server + client.
- Fullstack mini project (React + Spring Boot + GraphQL + DB).

### Giai đoạn 6 — Capstone Project
⏳ 1 tuần
- Build + deploy project end-to-end.

---

## 📝 Workflow hàng ngày
- **15 phút**: đọc ABOUT.md, tự giải thích khái niệm.
- **30 phút**: code trong `src/index.js` + chạy `test/index.test.js`.
- **15 phút**: viết Reflection.md.
- Commit branch `day-X-atom` → push GitHub → nhờ ChatGPT `/review` & `/grade`.

---

## 📅 Timeline chi tiết (20 tuần)

### Tuần 1 — Pack 1: JS Core
- Ngày 1: Variables & Scope
- Ngày 2: Functions & Closure
- Ngày 3: Async (Promise/await)
- Ngày 4: OOP vs FP
- Ngày 5: Mini Project CLI
- Ngày 6: Ôn + LeetCode Easy
- Ngày 7: Weekly Report

### Tuần 2 — Pack 7: Data Processing
- Ngày 1: map/filter/reduce
- Ngày 2: Sorting
- Ngày 3: Group by & aggregate
- Ngày 4: JSON/CSV parser
- Ngày 5: Mini log summarizer
- Ngày 6–7: Ôn + Report

### Tuần 3 — Pack 8A: Pattern Background
- Ngày 1: Hash Map
- Ngày 2: Two Pointers
- Ngày 3: Sliding Window
- Ngày 4: Prefix Sum + Hash
- Ngày 5: Binary Search Answer
- Ngày 6–7: Ôn + Report

### Tuần 4–5 — Pack 2: DSA Core
- Stack/Queue → Heap → Union-Find → BFS/DFS → Monotonic Stack
- Greedy → Monotonic Queue → Range Query → Mixed problems
- Ôn cuối tuần + mini challenge

### Tuần 6–7 — Pack 8B-A: Trees + Graphs
- BST basics → Diameter → Level Order
- Topo Sort → Detect Cycle → Dijkstra
- Number of Islands → Connected Components
- Mini challenge + Report

### Tuần 8–9 — Pack 8B-B: Backtracking + DP
- Subsets → Permutations → Combination Sum
- Word Search → N-Queens
- Climb Stairs → House Robber → Coin Change
- Unique Paths → Edit Distance
- Mini challenge + Report

### Tuần 10 — Pack 8B-C: LIS + String + Trie
- LIS → KMP → Rabin–Karp
- Trie → Monotonic Queue
- Mini challenge + Report

### Tuần 11–12 — Pack 3: React/TS
- Components, hooks, routing, Redux
- Async Redux (RTK Query), forms
- Mini Todo app React + Redux
- Report cuối tuần

### Tuần 13–14 — Pack 4: Java + Spring Boot
- Hello Spring Boot → REST → Service/Repo
- DB CRUD → JWT Auth → Middleware → Testing
- Mini CRUD API project
- Report cuối tuần

### Tuần 15–17 — Pack 5: DB + DevOps + Testing
- SQL basics → Joins → Indexes
- Schema design + mini DB project
- Docker basics → Docker Compose
- Jenkins → CI/CD pipeline
- Unit test → Integration test → Playwright E2E
- Report cuối tuần

### Tuần 18–19 — Pack 6: GraphQL
- Apollo Server → Query → Mutation
- Schema design → Apollo Client
- Frontend query + mutation
- Mini GraphQL + React project
- Report cuối tuần

### Tuần 20 — Capstone Project
- Setup repo (frontend + backend + DB)
- Auth flow → CRUD features
- Deploy (Docker + Jenkins + AWS)
- E2E test Playwright
- Demo + Final Report

---

## ✅ Kết quả mong đợi
- Repo GitHub có đầy đủ code, reflection, log học tập.
- Giải được LeetCode Medium.
- Biết build + deploy fullstack app.
- Đạt mindset middle engineer: clean code, hiểu pattern, biết trade-off.
