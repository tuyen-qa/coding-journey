package p3;
public class Parsers{
  public static Result<Integer> parseInt(String s){
    try{ return Result.ok(Integer.parseInt(s)); } catch(Exception e){ return Result.err("NaN"); }
  }
}
