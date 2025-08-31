import http from 'http'; import fetch from 'node-fetch';
const port = process.env.PORT || 3000;
const server = http.createServer(async (req,res)=>{
  if(req.url==='/'){ res.setHeader('content-type','text/html'); return res.end('<h1>Capstone UI</h1>'); }
  if(req.url==='/bff'){
    const r = await fetch('http://localhost:4000/graphql',{ method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({query:'{ hello }'}) });
    const j = await r.json(); res.setHeader('content-type','application/json'); return res.end(JSON.stringify(j));
  }
  res.statusCode=404; res.end('not found');
});
server.listen(port, ()=> console.log('frontend on', port));
