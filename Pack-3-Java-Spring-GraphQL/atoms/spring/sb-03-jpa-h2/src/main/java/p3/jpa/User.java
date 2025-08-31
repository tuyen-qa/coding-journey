package p3.jpa; import jakarta.persistence.*;
@Entity public class User{
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
  @Column(unique=true, nullable=false) String email;
  public User(){} public User(String e){ this.email=e; }
  public Long getId(){ return id; } public String getEmail(){ return email; } public void setEmail(String e){ this.email=e; }
}
