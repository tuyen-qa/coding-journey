package p3; import org.junit.jupiter.api.Test; import static org.junit.jupiter.api.Assertions.*; 
public class ResultTest{
  @Test void parse(){
    assertTrue(Parsers.parseInt("5") instanceof Result.Ok<Integer>);
    assertTrue(Parsers.parseInt("a") instanceof Result.Err<Integer>);
  }
}
