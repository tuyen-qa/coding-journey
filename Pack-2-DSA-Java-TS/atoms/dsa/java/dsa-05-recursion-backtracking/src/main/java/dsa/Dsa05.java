package dsa; import java.util.*;
public class Dsa05{
  public static long factorial(int n){ if(n<0) throw new IllegalArgumentException(); return n<=1? 1: n*factorial(n-1); }
  public static List<List<Integer>> subsets(int[] nums){
    List<List<Integer>> res=new ArrayList<>(); ArrayList<Integer> path=new ArrayList<>();
    dfs(nums,0,path,res); return res;
  }
  private static void dfs(int[] a,int i, ArrayList<Integer> path, List<List<Integer>> res){
    if(i==a.length){ res.add(new ArrayList<>(path)); return; }
    dfs(a,i+1,path,res); path.add(a[i]); dfs(a,i+1,path,res); path.remove(path.size()-1);
  }
}
