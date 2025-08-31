class Node{
  constructor(){ this.children=new Map(); this.end=false; }
}
export class Trie{
  constructor(){ this.root=new Node(); }
  insert(word){
    let cur=this.root;
    for(const ch of word){
      if(!cur.children.has(ch)) cur.children.set(ch,new Node());
      cur=cur.children.get(ch);
    }
    cur.end=true;
  }
  search(word){
    let cur=this.root;
    for(const ch of word){
      if(!cur.children.has(ch)) return false;
      cur=cur.children.get(ch);
    }
    return cur.end===true;
  }
  startsWith(prefix){
    let cur=this.root;
    for(const ch of prefix){
      if(!cur.children.has(ch)) return false;
      cur=cur.children.get(ch);
    }
    return true;
  }
}
