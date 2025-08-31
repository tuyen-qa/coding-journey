import http from 'http';
const server=http.createServer((req,res)=>{
  if(req.url==='/health'){ res.setHeader('content-type','application/json'); return res.end(JSON.stringify({ok:true})); }
  if(req.url.startsWith('/hello')){
    const name=new URL(req.url,'http://x').searchParams.get('name')||'world';
    res.setHeader('content-type','application/json'); return res.end(JSON.stringify({hello:name}));
  }
  res.statusCode=404; res.end('not found');
});
server.listen(3000,()=>console.log('mini-node on 3000'));
