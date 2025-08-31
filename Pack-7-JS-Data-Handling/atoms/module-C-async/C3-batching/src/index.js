export function batchingSink({maxItems=5, maxMs=50, onFlush}){
  let buf=[]; let timer=null;
  function flush(){ if(buf.length){ const batch=buf; buf=[]; onFlush(batch); } if(timer){ clearTimeout(timer); timer=null; } }
  return {
    push(item){
      buf.push(item);
      if(buf.length>=maxItems) return flush();
      if(!timer) timer=setTimeout(flush, maxMs);
    },
    flush
  };
}
