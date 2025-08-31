import { strict as assert } from 'assert';
import { fetchAllPages } from '../src/index.js';
let maxBusy=0, busy=0;
async function mock(page){
  busy++; maxBusy=Math.max(maxBusy,busy);
  await new Promise(r=>setTimeout(r, 10));
  busy--;
  return { items: [page], hasNext: page<5 };
}
const data = await fetchAllPages(mock, { concurrency:3, backoffMs:1 });
assert.equal(data.length,5); assert.ok(maxBusy<=3);
console.log('C2 OK');
