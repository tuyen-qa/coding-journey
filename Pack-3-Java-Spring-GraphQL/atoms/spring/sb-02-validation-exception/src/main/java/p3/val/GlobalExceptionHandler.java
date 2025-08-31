package p3.val; import org.springframework.web.bind.annotation.*; import org.springframework.http.*; import org.springframework.web.bind.MethodArgumentNotValidException;
@RestControllerAdvice public class GlobalExceptionHandler{
  @ExceptionHandler(MethodArgumentNotValidException.class) public ResponseEntity<String> bad(MethodArgumentNotValidException ex){ return ResponseEntity.badRequest().body("validation_error"); }
}
