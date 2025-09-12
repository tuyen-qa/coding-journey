import {describe, it} from 'node:test';
import assert from 'node:assert/strict';

import {methodizeBasic, unmethodizeBasic,} from "../src/methodize-unmethodize-basic.js";

/* ==========  Methodize Basic and Unmethodize Basic  ========== */
describe('MethodDize and Unmethodize Basic', () => {
    it('unmethodizeBasic basic should work', () => {
        const user = {
            name: "Alice",
            sayHi() { return "Hi " + this?.name; }
        };
        const sayHiFn = user.sayHi;
        assert.equal(sayHiFn(), "Hi undefined");

        const sayHiFnWithUnmethodize = unmethodizeBasic(user.sayHi);
        assert.equal(sayHiFnWithUnmethodize(user, user.name), "Hi Alice");
        assert.equal(sayHiFnWithUnmethodize({name: "Tuyen"}), "Hi Tuyen");
    });

    it('Methodize basic with object function should work', () => {
        function User(name) {
            this.name = name
        }

        function sayHitoKey(obj) {
            return "Hi " + obj.name;
        }
        const alice = new User('Alice');
        const tuyen = new User('Tuyen');
        alice.sayHi = methodizeBasic(sayHitoKey);

        assert.equal(alice.sayHi(), "Hi Alice");
        assert.throws(() => {
            tuyen.sayHi();
        }, TypeError);
    });

    it('Methodize basic with prototype function should work', () => {
        function User(name) {
            this.name = name
        }

        function sayHi(obj) {
            return "Hi " + obj.name;
        }

        User.prototype.sayHi = methodizeBasic(sayHi);

        const diem = new User('Diem');
        const tuyen = new User('Tuyen');

        assert.equal(diem.sayHi(), "Hi Diem");
        assert.equal(tuyen.sayHi(), "Hi Tuyen");
        assert.equal(sayHi({name: "Phi Phi"}), "Hi Phi Phi");
    });
})
