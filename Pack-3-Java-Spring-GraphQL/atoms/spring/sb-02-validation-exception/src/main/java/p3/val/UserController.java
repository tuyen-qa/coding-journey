package p3.val; import org.springframework.web.bind.annotation.*; import jakarta.validation.Valid;
@RestController @RequestMapping("/users")
public class UserController{
  @PostMapping public UserDto create(@Valid @RequestBody UserDto dto){ return dto; }
}
