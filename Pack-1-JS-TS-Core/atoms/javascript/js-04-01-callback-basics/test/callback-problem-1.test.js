// test/callback-problem-1.test.js
'use strict';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { traverseTree, findInTree, countNodes } from '../src/callback-problem-1.js';

const tree = {
  value: 'root',
  children: [
    { value: 'a', children:[{value:'a1'}, {value:'a2'}] },
    { value: 'b' }
  ]
};

describe('callback-problem-1 (Tree traversal)', ()=>{
  it('traverseTree visits all nodes', ()=>{
    const res=[];
    traverseTree(tree, v=>res.push(v));
    assert.deepEqual(res.sort(), ['a','a1','a2','b','root']);
  });

  it('findInTree finds correct node', ()=>{
    const found = findInTree(tree, v=>v==='a2');
    assert.deepEqual(found.value, 'a2');
  });

  it('countNodes counts based on predicate', ()=>{
    const count = countNodes(tree, v=>v.startsWith('a'));
    assert.equal(count,3);
  });
});
