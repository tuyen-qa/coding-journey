package p3.rest;
import org.springframework.web.bind.annotation.*;
@RestController
public class HelloController{
  @GetMapping("/hello")
  public String hello(@RequestParam(defaultValue="world") String name){ return "Hello " + name; }
}
