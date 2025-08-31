package p3;
import java.util.Optional;
public class Box<T>{
  private final T value;
  public Box(T value){ this.value=value; }
  public Optional<T> asOptional(){ return Optional.ofNullable(value); }
  public <R> Box<R> map(java.util.function.Function<T,R> f){ return new Box<>(value==null? null: f.apply(value)); }
}
