import { strict as assert } from 'assert'; import { encode, decode } from '../src/index.js';
const x=125; const s=encode(x); assert.equal(decode(s), x); console.log('CS-06 OK');
