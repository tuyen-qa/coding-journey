package dsa; import org.junit.jupiter.api.Test; import static org.junit.jupiter.api.Assertions.*; import java.util.*;
public class Dsa09Test{
  @Test void basics(){
    assertEquals(55, Dsa09.fibMemo(10, new HashMap<>()));
    assertEquals(55, Dsa09.fibBottomUp(10));
    assertEquals(3, Dsa09.coinChangeMin(new int[]{1,2,5}, 11));
  }
}
