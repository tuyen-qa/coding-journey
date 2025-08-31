package p3; import org.junit.jupiter.api.Test; import static org.junit.jupiter.api.Assertions.*; import java.util.concurrent.*;
public class AsyncsTest{
  @Test void sum() throws Exception {
    int s = Asyncs.sumAsync(()->{Thread.sleep(10);return 2;}, ()->{Thread.sleep(10);return 3;}, 1000);
    assertEquals(5, s);
  }
}
