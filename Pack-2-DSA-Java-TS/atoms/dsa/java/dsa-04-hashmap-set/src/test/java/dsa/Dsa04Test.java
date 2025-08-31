package dsa; import org.junit.jupiter.api.Test; import static org.junit.jupiter.api.Assertions.*;
public class Dsa04Test{
  @Test void basics(){ assertArrayEquals(new int[]{0,1}, Dsa04.twoSum(new int[]{2,7,11,15},9)); assertEquals(0, Dsa04.firstUniqChar("leetcode")); }
}
