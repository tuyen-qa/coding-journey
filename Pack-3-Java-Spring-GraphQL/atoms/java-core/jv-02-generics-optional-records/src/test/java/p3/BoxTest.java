package p3; import org.junit.jupiter.api.Test; import static org.junit.jupiter.api.Assertions.*; 
public class BoxTest{
  @Test void mapAndOptional(){
    Box<String> b=new Box<>("10");
    assertEquals("10", b.asOptional().orElse("x"));
    Box<Integer> i = b.map(Integer::parseInt);
    assertEquals(10, i.asOptional().orElse(-1));
  }
}
