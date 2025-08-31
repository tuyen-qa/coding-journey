package dsa; import java.util.*;
public class Dsa04{
  public static int[] twoSum(int[] a, int target){
    Map<Integer,Integer> m=new HashMap<>();
    for(int i=0;i<a.length;i++){ int need=target-a[i]; if(m.containsKey(need)) return new int[]{m.get(need),i}; m.put(a[i],i); }
    return new int[]{-1,-1};
  }
  public static int firstUniqChar(String s){
    int[] cnt=new int[256]; for(char ch: s.toCharArray()) cnt[ch]++;
    for(int i=0;i<s.length();i++) if(cnt[s.charAt(i)]==1) return i; return -1;
  }
}
