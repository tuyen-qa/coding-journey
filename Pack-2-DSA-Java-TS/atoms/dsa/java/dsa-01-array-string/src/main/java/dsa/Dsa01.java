package dsa;
public class Dsa01 {
  public static String reverse(String s){ return new StringBuilder(s).reverse().toString(); }
  public static boolean isPalindrome(String s){
    String t = s.replaceAll("[^A-Za-z0-9]", "").toLowerCase();
    return t.equals(reverse(t));
  }
  public static int[] twoSumSorted(int[] a, int target){
    int i=0,j=a.length-1;
    while(i<j){
      int sum=a[i]+a[j];
      if(sum==target) return new int[]{i,j};
      if(sum<target) i++; else j--;
    }
    return new int[]{-1,-1};
  }
}
