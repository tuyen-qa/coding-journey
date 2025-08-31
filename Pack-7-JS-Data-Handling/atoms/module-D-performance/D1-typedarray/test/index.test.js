import { strict as assert } from 'assert';
import { sumFloat32 } from '../src/index.js';
const arr = new Float32Array([0.5,1.5,2.0]); const sum = sumFloat32(arr);
assert.ok(Math.abs(sum-4.0) < 1e-6);
console.log('D1 OK');
