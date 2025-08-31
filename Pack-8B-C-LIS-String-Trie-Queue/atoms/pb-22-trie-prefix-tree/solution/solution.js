class Node{ constructor(){ this.children=new Map(); this.end=false; } }
export class Trie{
  constructor(){ this.root=new Node(); }
  insert(w){ let cur=this.root; for(const ch of w){ if(!cur.children.has(ch)) cur.children.set(ch,new Node()); cur=cur.children.get(ch);} cur.end=true; }
  search(w){ let cur=this.root; for(const ch of w){ if(!cur.children.has(ch)) return false; cur=cur.children.get(ch);} return !!cur.end; }
  startsWith(p){ let cur=this.root; for(const ch of p){ if(!cur.children.has(ch)) return false; cur=cur.children.get(ch);} return true; }
}
