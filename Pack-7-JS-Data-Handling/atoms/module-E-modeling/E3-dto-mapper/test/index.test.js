import { strict as assert } from 'assert';
import { toDTO, fromDTO } from '../src/index.js';
const e={id:1,totalCents:1200}; const dto=toDTO(e); assert.deepEqual(dto,{id:'1',total:1200});
const back=fromDTO(dto); assert.deepEqual(back,{id:'1', totalCents:1200});
console.log('E3 OK');
