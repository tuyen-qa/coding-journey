import { strict as assert } from 'assert';
import { exist, solveNQueens } from '../src/index.js';

const board = [
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E'],
];
assert.equal(exist(board.map(r=>r.slice()), 'ABCCED'), true);
assert.equal(exist(board.map(r=>r.slice()), 'SEE'), true);
assert.equal(exist(board.map(r=>r.slice()), 'ABCB'), false);

const n1 = solveNQueens(1);
assert.deepEqual(n1, [['Q']]);
const n4 = solveNQueens(4);
assert.equal(n4.length, 2);

console.log('PB-17 OK');
