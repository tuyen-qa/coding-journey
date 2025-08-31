# Pack 3 — Java + Spring Boot + GraphQL
## Nội dung
- **Java Core**: OOP/Immutability, Generics/Optional/Records, Concurrency + CompletableFuture.
- **Spring Boot**: REST, Validation/Exception, JPA+H2, Transactions, Security (fake JWT), GraphQL + DataLoader, Testcontainers Postgres.

## Cách chạy nhanh
1) Mỗi atom là một Maven project độc lập. `mvn -q -DskipTests package` để build; `mvn spring-boot:run` để chạy app Spring.
2) Tests: `mvn -q -Dtest=*Test test`.
3) GraphQL: `sb-06-graphql-dataloader` mở `/graphiql` nếu bạn thêm UI, mặc định gọi HTTP POST `/graphql`.
