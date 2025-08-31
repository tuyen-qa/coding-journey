package p3;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
public class MoneyTest {
  @Test void basic(){
    Money a=new Money("usd", 150); Money b=new Money("USD", 50);
    Money c=a.add(b); assertEquals(200, c.cents()); 
    assertEquals("USD", c.currency());
    Money d=c.subtract(b); assertEquals(150, d.cents());
    assertThrows(IllegalArgumentException.class, ()-> a.add(new Money("VND",1)));
  }
}
