package dsa; import org.junit.jupiter.api.Test; import static org.junit.jupiter.api.Assertions.*; import java.util.*;
public class Dsa07Test{
  @Test void basics(){
    Map<String,List<String>> g=new HashMap<>(); g.put("A", List.of("B","C")); g.put("B", List.of("D")); g.put("C", List.of("D")); g.put("D", List.of());
    assertTrue(Dsa07.pathExists(g,"A","D")); assertEquals(List.of("A","B","D","C"), Dsa07.dfsOrder(g,"A"));
  }
}
