package dsa; import org.junit.jupiter.api.Test; import static org.junit.jupiter.api.Assertions.*; import java.util.*;
public class Dsa05Test{
  @Test void basics(){ assertEquals(120, Dsa05.factorial(5)); List<List<Integer>> ss=Dsa05.subsets(new int[]{1,2}); assertEquals(4, ss.size()); }
}
