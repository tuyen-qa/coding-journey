import { strict as assert } from 'assert';
import { rollingSum, movingAvg } from '../src/index.js';
const a=[1,2,3,4]; assert.deepEqual(rollingSum(a,2), [1,3,5,7]);
const mv = movingAvg([1,2,3,4], 3); assert.equal(Math.round(mv[3]*10)/10, 3.0);
console.log('B3 OK');
