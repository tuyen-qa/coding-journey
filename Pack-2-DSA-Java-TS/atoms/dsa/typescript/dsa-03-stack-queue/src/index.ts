export class MinStack{
  private s: number[] = []; private mins: number[] = [];
  push(x:number){ this.s.push(x); this.mins.push(this.mins.length? Math.min(this.mins[this.mins.length-1], x): x); }
  pop(){ this.mins.pop(); return this.s.pop(); }
  top(){ return this.s[this.s.length-1]; }
  getMin(){ return this.mins[this.mins.length-1]; }
}
export class QueueTwoStacks<T>{
  private in:T[]=[]; private out:T[]=[];
  enqueue(x:T){ this.in.push(x); }
  dequeue():T|undefined{ if(!this.out.length) while(this.in.length) this.out.push(this.in.pop()!); return this.out.pop(); }
  size(){ return this.in.length + this.out.length; }
}
