package p3.sec; import org.springframework.web.bind.annotation.*; import org.springframework.security.core.annotation.AuthenticationPrincipal; import org.springframework.security.core.userdetails.UserDetails;
@RestController public class Controller{
  @GetMapping("/public") public String pub(){ return "ok"; }
  @GetMapping("/secure") public String sec(@AuthenticationPrincipal Object principal){ return "hi " + (principal==null? "anon":"dev"); }
}
