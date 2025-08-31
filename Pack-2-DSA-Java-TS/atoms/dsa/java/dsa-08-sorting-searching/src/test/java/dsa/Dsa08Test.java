package dsa; import org.junit.jupiter.api.Test; import static org.junit.jupiter.api.Assertions.*; import java.util.*;
public class Dsa08Test{
  @Test void basics(){
    int[] sorted = Dsa08.mergeSort(new int[]{5,1,4,2,8,0});
    assertArrayEquals(new int[]{0,1,2,4,5,8}, sorted);
    assertEquals(3, Dsa08.binarySearch(sorted,4));
    assertEquals(-1, Dsa08.binarySearch(sorted,7));
  }
}
