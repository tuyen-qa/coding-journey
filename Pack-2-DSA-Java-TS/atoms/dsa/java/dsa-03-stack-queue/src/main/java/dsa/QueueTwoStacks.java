package dsa;
import java.util.*;
public class QueueTwoStacks<T>{
  private Deque<T> in = new ArrayDeque<>(), out = new ArrayDeque<>();
  public void enqueue(T x){ in.push(x); }
  public T dequeue(){ if(out.isEmpty()) while(!in.isEmpty()) out.push(in.pop()); return out.pop(); }
  public int size(){ return in.size()+out.size(); }
}
