export async function fetchAllPages(fetchPage, { concurrency=2, backoffMs=50 }={}){
  let next=1, busy=0, results=[]; let done=false;
  return await new Promise((resolve, reject)=>{
    const run = async () => {
      while(busy<concurrency && !done){
        busy++; const page = next++;
        fetchPage(page).then(r=>{
          if(r.items.length) results=results.concat(r.items);
          if(!r.hasNext){ done=true; }
        }).catch(reject).finally(()=>{ busy--; setTimeout(run, backoffMs); if(done && busy===0) resolve(results); });
      }
    };
    run();
  });
}
