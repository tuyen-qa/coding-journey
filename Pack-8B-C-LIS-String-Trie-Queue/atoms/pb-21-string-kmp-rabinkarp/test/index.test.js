import { strict as assert } from 'assert';
import { kmpSearch, rabinKarp } from '../src/index.js';

const tests = [
  ['hello', 'll', 2],
  ['aaaaa', 'bba', -1],
  ['abcxabcdabxabcdabcdabcy', 'abcdabcy', 15],
  ['', '', 0],
  ['abc', '', 0],
];

for(const [t,p,ans] of tests){
  if(ans===-1){ 
    assert.equal(kmpSearch(t,p), -1);
    assert.equal(rabinKarp(t,p), (p.length? -1: 0));
  }else{
    assert.equal(kmpSearch(t,p), ans);
    assert.equal(rabinKarp(t,p), ans);
  }
}

console.log('PB-21 OK');
