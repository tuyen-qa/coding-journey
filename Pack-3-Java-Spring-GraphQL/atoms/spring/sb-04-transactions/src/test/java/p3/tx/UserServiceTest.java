package p3.tx; import org.junit.jupiter.api.*; import org.springframework.boot.test.context.SpringBootTest; import org.springframework.beans.factory.annotation.Autowired; import static org.junit.jupiter.api.Assertions.*; 
@SpringBootTest class UserServiceTest{
  @Autowired UserService svc; @Autowired UserRepo users; @Autowired AuditRepo audits;
  @Test void rollback(){
    assertThrows(RuntimeException.class, ()-> svc.createUserWithAudit("a@x.com", true));
    assertEquals(0, users.count()); assertEquals(0, audits.count());
  }
}
