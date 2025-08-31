export function reverseString(s: string): string {
  return s.split('').reverse().join('');
}
export function isPalindrome(s: string): boolean {
  const t = s.replace(/[^a-z0-9]/gi,'').toLowerCase();
  return t === reverseString(t);
}
export function twoSumSorted(arr: number[], target: number): [number, number] | null {
  let i=0, j=arr.length-1;
  while(i<j){
    const sum = arr[i]+arr[j];
    if(sum===target) return [i,j];
    if(sum<target) i++; else j--;
  }
  return null;
}
