import { strict as assert } from 'assert'; import { slugify } from '../src/index.js';
assert.equal(slugify('Xin Chào Việt Nam!'), 'xin-chao-viet-nam');
assert.equal(slugify('  Hello   World  '), 'hello-world');
console.log('CS-02 OK');
