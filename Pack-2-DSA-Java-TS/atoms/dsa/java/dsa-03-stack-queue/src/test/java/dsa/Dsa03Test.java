package dsa; import org.junit.jupiter.api.Test; import static org.junit.jupiter.api.Assertions.*;
public class Dsa03Test{
  @Test void structures(){
    MinStack s=new MinStack(); s.push(3); s.push(5); s.push(2); assertEquals(2, s.getMin()); s.pop(); assertEquals(3, s.getMin());
    QueueTwoStacks<Integer> q=new QueueTwoStacks<>(); q.enqueue(1); q.enqueue(2); assertEquals(1, q.dequeue()); q.enqueue(3); assertEquals(2, q.dequeue()); assertEquals(3, q.dequeue());
  }
}
