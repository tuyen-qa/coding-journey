package dsa;
import java.util.*;
public class MinStack {
  private Deque<Integer> s = new ArrayDeque<>();
  private Deque<Integer> mins = new ArrayDeque<>();
  public void push(int x){ s.push(x); mins.push(mins.isEmpty()? x : Math.min(mins.peek(), x)); }
  public int pop(){ mins.pop(); return s.pop(); }
  public int top(){ return s.peek(); }
  public int getMin(){ return mins.peek(); }
}
