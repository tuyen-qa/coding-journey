package p3.jpa; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/users")
public class UserController{
  private final UserRepo repo; public UserController(UserRepo r){ this.repo=r; }
  @GetMapping public List<User> all(){ return repo.findAll(); }
  @PostMapping public User create(@RequestBody User u){ return repo.save(u); }
  @GetMapping("/{id}") public User one(@PathVariable Long id){ return repo.findById(id).orElseThrow(); }
}
