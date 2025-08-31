package dsa;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
public class Dsa01Test{
  @Test void basic(){
    assertEquals("cba", Dsa01.reverse("abc"));
    assertTrue(Dsa01.isPalindrome("A man, a plan, a canal: Panama"));
    assertArrayEquals(new int[]{1,4}, Dsa01.twoSumSorted(new int[]{1,2,3,4,6},7));
  }
}
