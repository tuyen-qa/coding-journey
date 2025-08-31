package dsa; import java.util.*;
public class Dsa08{
  public static int[] mergeSort(int[] a){
    if(a.length<=1) return Arrays.copyOf(a,a.length);
    int mid=a.length/2; int[] L=mergeSort(Arrays.copyOfRange(a,0,mid)); int[] R=mergeSort(Arrays.copyOfRange(a,mid,a.length));
    int[] res=new int[a.length]; int i=0,j=0,k=0; while(i<L.length && j<R.length) res[k++]= (L[i]<=R[j]? L[i++]: R[j++]);
    while(i<L.length) res[k++]=L[i++]; while(j<R.length) res[k++]=R[j++]; return res;
  }
  public static int binarySearch(int[] a, int x){
    int l=0,r=a.length-1; while(l<=r){ int m=(l+r)/2; if(a[m]==x) return m; if(a[m]<x) l=m+1; else r=m-1; } return -1;
  }
}
