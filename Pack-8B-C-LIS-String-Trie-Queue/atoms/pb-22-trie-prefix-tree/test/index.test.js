import { strict as assert } from 'assert';
import { Trie } from '../src/index.js';

const t = new Trie();
t.insert('apple');
assert.equal(t.search('apple'), true);
assert.equal(t.search('app'), false);
assert.equal(t.startsWith('app'), true);
t.insert('app');
assert.equal(t.search('app'), true);

console.log('PB-22 OK');
