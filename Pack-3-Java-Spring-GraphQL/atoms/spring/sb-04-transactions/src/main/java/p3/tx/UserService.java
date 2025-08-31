package p3.tx; import org.springframework.stereotype.*; import org.springframework.transaction.annotation.Transactional;
@Service public class UserService{
  private final UserRepo users; private final AuditRepo audits;
  public UserService(UserRepo u, AuditRepo a){ this.users=u; this.audits=a; }
  @Transactional public void createUserWithAudit(String email, boolean fail){
    users.save(new User(email)); audits.save(new AuditLog("created:"+email));
    if(fail) throw new RuntimeException("boom");
  }
}
