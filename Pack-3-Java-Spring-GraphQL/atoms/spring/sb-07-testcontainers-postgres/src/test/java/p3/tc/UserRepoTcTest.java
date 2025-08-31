package p3.tc; import org.junit.jupiter.api.*; import org.springframework.boot.test.context.SpringBootTest; import org.springframework.beans.factory.annotation.Autowired; import org.springframework.test.context.DynamicPropertyRegistry; import org.springframework.test.context.DynamicPropertySource; import org.testcontainers.containers.PostgreSQLContainer; import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest class UserRepoTcTest{
  static PostgreSQLContainer<?> pg = new PostgreSQLContainer<>("postgres:15-alpine");
  @DynamicPropertySource static void props(DynamicPropertyRegistry r){
    pg.start();
    r.add("spring.datasource.url", pg::getJdbcUrl);
    r.add("spring.datasource.username", pg::getUsername);
    r.add("spring.datasource.password", pg::getPassword);
    r.add("spring.jpa.hibernate.ddl-auto", ()->"update");
  }
  @Autowired UserRepo repo;
  @Test void roundtrip(){
    User u = repo.save(new User("a@x.com"));
    assertTrue(repo.findById(u.getId()).isPresent());
  }
}
