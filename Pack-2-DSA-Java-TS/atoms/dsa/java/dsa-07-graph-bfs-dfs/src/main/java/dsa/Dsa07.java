package dsa; import java.util.*;
public class Dsa07{
  public static boolean pathExists(Map<String,List<String>> g, String s, String t){
    Deque<String> q=new ArrayDeque<>(); Set<String> seen=new HashSet<>(); q.add(s); seen.add(s);
    while(!q.isEmpty()){ String u=q.remove(); if(u.equals(t)) return true; for(String v: g.getOrDefault(u, List.of())) if(seen.add(v)) q.add(v); }
    return false;
  }
  public static List<String> dfsOrder(Map<String,List<String>> g, String s){
    List<String> out=new ArrayList<>(); Set<String> seen=new HashSet<>(); dfs(g,s,seen,out); return out;
  }
  private static void dfs(Map<String,List<String>> g, String u, Set<String> seen, List<String> out){
    if(seen.contains(u)) return; seen.add(u); out.add(u); for(String v: g.getOrDefault(u, List.of())) dfs(g,v,seen,out);
  }
}
