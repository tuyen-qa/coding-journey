import { strict as assert } from 'assert';
import { reviverDates, parseCsv, toCsv } from '../src/index.js';
const obj = JSON.parse('{"d":"2021-02-03"}', reviverDates); assert.ok(obj.d instanceof Date);
const rows = parseCsv("id,name\n1,Alice\n2,Bob"); assert.equal(rows[1].name,'Bob');
const csv = toCsv([{id:1,name:'Alice'},{id:2,name:'Bob'}]); assert.ok(csv.includes('Alice') && csv.includes('Bob'));
console.log('A4 OK');
