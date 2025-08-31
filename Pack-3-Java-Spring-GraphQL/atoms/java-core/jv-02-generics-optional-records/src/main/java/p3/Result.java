package p3;
public sealed interface Result<T> permits Result.Ok, Result.Err {
  record Ok<T>(T value) implements Result<T>{}
  record Err<T>(String message) implements Result<T>{}
  static <T> Result<T> ok(T v){ return new Ok<>(v); }
  static <T> Result<T> err(String m){ return new Err<>(m); }
}
