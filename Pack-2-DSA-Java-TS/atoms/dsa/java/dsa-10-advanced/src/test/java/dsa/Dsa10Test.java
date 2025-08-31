package dsa; import org.junit.jupiter.api.Test; import static org.junit.jupiter.api.Assertions.*; import java.util.*;
public class Dsa10Test{
  @Test void basics(){
    Map<String,List<Map.Entry<String,Integer>>> g=new HashMap<>();
    g.put("A", List.of(Map.entry("B",2), Map.entry("C",5)));
    g.put("B", List.of(Map.entry("C",1)));
    g.put("C", List.of());
    Map<String,Integer> d = Dsa10.dijkstra(g,"A");
    assertEquals(0, d.get("A")); assertEquals(2, d.get("B")); assertEquals(3, d.get("C"));
    assertEquals(4, Dsa10.lisLength(new int[]{10,9,2,5,3,7,101,18}));
  }
}
