import { strict as assert } from 'assert'; import { sendEmail } from '../src/index.js';
assert.equal(sendEmail({to:'a@x.com', subject:'Hi'}), 'sent:a@x.com:Hi');
console.log('CS-03 OK');
