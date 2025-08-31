export function twoSum(nums:number[], target:number): [number,number] | null {
  const m = new Map<number, number>();
  for(let i=0;i<nums.length;i++){ const need=target-nums[i]; if(m.has(need)) return [m.get(need)!, i]; m.set(nums[i], i); }
  return null;
}
export function firstUniqChar(s:string): number {
  const cnt: Record<string, number> = {}; for(const ch of s) cnt[ch]=(cnt[ch]||0)+1;
  for(let i=0;i<s.length;i++) if(cnt[s[i]]===1) return i;
  return -1;
}
