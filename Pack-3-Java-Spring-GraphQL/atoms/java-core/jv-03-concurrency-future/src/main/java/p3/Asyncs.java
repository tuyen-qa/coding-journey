package p3;
import java.util.concurrent.*;
public class Asyncs {
  public static int sumAsync(Callable<Integer> a, Callable<Integer> b, long timeoutMs) throws Exception {
    ExecutorService pool = Executors.newFixedThreadPool(2);
    try {
      Future<Integer> fa = pool.submit(a);
      Future<Integer> fb = pool.submit(b);
      return fa.get(timeoutMs, TimeUnit.MILLISECONDS) + fb.get(timeoutMs, TimeUnit.MILLISECONDS);
    } finally {
      pool.shutdownNow();
    }
  }
}
