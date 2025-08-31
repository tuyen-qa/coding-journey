import http from 'http'; import { Client } from 'pg';
const url = process.env.POSTGRES_URL || 'postgres://postgres:postgres@localhost:5432/appdb';
const client = new Client({ connectionString: url });
const start = client.connect().catch(e=>console.error('pg connect fail',e.message));
const server=http.createServer(async (req,res)=>{
  if(req.url==='/health'){ res.setHeader('content-type','application/json'); return res.end(JSON.stringify({ok:true})); }
  if(req.url==='/users'){
    await start; const rs = await client.query('SELECT id,email FROM users ORDER BY id'); res.setHeader('content-type','application/json'); return res.end(JSON.stringify(rs.rows));
  }
  res.statusCode=404; res.end('not found');
});
server.listen(3000,()=>console.log('compose-app on 3000'));
