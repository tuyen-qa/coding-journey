package p3.val; import jakarta.validation.constraints.*;
public record UserDto(@NotBlank @Email String email) {}
