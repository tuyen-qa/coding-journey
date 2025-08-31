package p3.tx; import jakarta.persistence.*; @Entity public class AuditLog{
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id; String message;
  public AuditLog(){} public AuditLog(String m){ this.message=m; }
  public Long getId(){ return id; } public String getMessage(){ return message; }
}
