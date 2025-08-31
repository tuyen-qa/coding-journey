import { strict as assert } from 'assert';
import { hasPairWithSum } from '../src/index.js';
assert.equal(hasPairWithSum([1,2,3,4,6],7),true);
assert.equal(hasPairWithSum([1,2,3,4,6],20),false);
assert.equal(hasPairWithSum([-3,-1,0,2,5],1),true);
assert.equal(hasPairWithSum([],0),false);
console.log('PB-02 OK');
