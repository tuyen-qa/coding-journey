import fs from 'fs';
import { parseCsv } from './parseCsv.js';
const csv = fs.readFileSync(process.argv[2], 'utf-8');
const rows = parseCsv(csv).map(r=>({ id: r.id, userId: r.userId, totalCents: Number(r.totalCents), createdAt: r.createdAt }));
const byUser = new Map();
for(const r of rows){
  const u=r.userId; const cur=byUser.get(u)||{count:0,sum:0}; cur.count++; cur.sum+=r.totalCents; byUser.set(u, cur);
}
const out = Array.from(byUser, ([userId,{count,sum}])=>({ userId, count, sum, avg: Math.round(sum/count) }))
  .sort((a,b)=> b.sum - a.sum);
console.log(JSON.stringify({ orders: rows, aggregates: out }, null, 2));
