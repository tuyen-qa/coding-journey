import http from 'http'; import fs from 'fs'; import path from 'path'; import url from 'url';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const dist = path.join(__dirname, '..', 'dist');
const server = http.createServer((req,res)=>{
  if(req.url==='/'){ res.setHeader('content-type','text/html'); return res.end('<h1>Data Explorer</h1><p>GET /data</p>'); }
  if(req.url==='/data'){ const file = path.join(dist, 'orders.json'); if(!fs.existsSync(file)){ res.statusCode=404; return res.end('no data'); } res.setHeader('content-type','application/json'); return res.end(fs.readFileSync(file)); }
  res.statusCode=404; res.end('not found');
});
server.listen(3200, ()=> console.log('Data Explorer UI at http://localhost:3200'));
