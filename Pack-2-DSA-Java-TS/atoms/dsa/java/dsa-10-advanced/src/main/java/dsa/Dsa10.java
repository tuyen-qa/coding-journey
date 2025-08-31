package dsa; import java.util.*;
public class Dsa10{
  public static Map<String,Integer> dijkstra(Map<String,List<Map.Entry<String,Integer>>> g, String src){
    Map<String,Integer> dist=new HashMap<>(); Set<String> used=new HashSet<>();
    for(String v: g.keySet()) dist.put(v, v.equals(src)?0:Integer.MAX_VALUE);
    while(true){
      String u=null; int best=Integer.MAX_VALUE;
      for(String v: g.keySet()){ int dv=dist.getOrDefault(v,Integer.MAX_VALUE); if(!used.contains(v) && dv<best){ best=dv; u=v; } }
      if(u==null) break; used.add(u);
      for(Map.Entry<String,Integer> e: g.getOrDefault(u, List.of())){
        int base = dist.get(u);
        int nd = base==Integer.MAX_VALUE? Integer.MAX_VALUE : base + e.getValue();
        if(nd < dist.getOrDefault(e.getKey(), Integer.MAX_VALUE)) dist.put(e.getKey(), nd);
      }
    }
    return dist;
  }
  public static int lisLength(int[] a){
    ArrayList<Integer> tails=new ArrayList<>();
    for(int x: a){
      int i=Collections.binarySearch(tails, x);
      if(i<0) i=-(i+1);
      if(i==tails.size()) tails.add(x); else tails.set(i, x);
    }
    return tails.size();
  }
}
