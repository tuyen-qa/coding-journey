package dsa; import java.util.*;
public class Dsa09{
  public static long fibMemo(int n, Map<Integer,Long> memo){ if(n<=1) return n; if(memo.containsKey(n)) return memo.get(n); long v=fibMemo(n-1,memo)+fibMemo(n-2,memo); memo.put(n,v); return v; }
  public static long fibBottomUp(int n){ if(n<=1) return n; long a=0,b=1; for(int i=2;i<=n;i++){ long c=a+b; a=b; b=c;} return b; }
  public static int coinChangeMin(int[] coins, int amount){ int INF=1_000_000; int[] dp=new int[amount+1]; Arrays.fill(dp, INF); dp[0]=0; for(int c: coins) for(int x=c;x<=amount;x++) dp[x]=Math.min(dp[x], dp[x-c]+1); return dp[amount]>=INF? -1: dp[amount]; }
}
