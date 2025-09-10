import {describe, it} from "node:test"
import assert from "node:assert/strict"
import {whoAmI, introduce, Person, timer, car, bike, user} from "../src/index.js";


describe("whoAmI", () => {
    it("this thay doi theo object goi,", () => {
        const alice = {name: 'Alice', whoAmI}
        const bob = {name: 'Bob', whoAmI}

        assert.equal(typeof alice.whoAmI, "function");
        assert.equal(alice.whoAmI(), "Alice");
        assert.equal(bob.whoAmI(), "Bob");
    })

    it("goi roi rac thi this bi mat", () => {
        const loose = whoAmI();
        assert.equal(loose, undefined);
    })
});

describe("ung dung cua this", () => {
    it("this cho phep reuse function", () => {
        const alice = {name: "Alice", introduce: introduce }
        const bob = {name: "Bob", introduce: introduce }

        assert.equal(alice.introduce(), "Hello, I'm Alice");
        assert.equal(bob.introduce(), "Hello, I'm Bob");
    });

    it("this trong object method", () => {
        assert.equal(user.greet(), "Hi, I'm Alice");
    });

    it("this trong constructor/prototype", () => {
        const p1 = new Person("Alice");
        const p2 = new Person("Bob");

        assert.equal(p1.sayHi(), "Hi, I'm Alice");
        assert.equal(p2.sayHi(), "Hi, I'm Bob");
    });

    it("this trong callback: loose vs arrow vs bind",  async () => {
        const t1 = await timer.runLoose();
        const t2 = await timer.runArrow();
        const t3 = await timer.runBind();

        assert.equal(t1, undefined);
        assert.equal(t2, "Clock");
        assert.equal(t3, "Clock");

        const t4 = timer.outerLoose();
        const t5 = timer.outerArrow();
        const t6 = timer.outerBind();
        const t7 = timer.outerCall();

        assert.equal(t4, undefined);
        assert.equal(t5, "Clock");
        assert.equal(t6, "Clock");
        assert.equal(t7, "Clock");

    })

    it('this voi .call de chia se method', () => {
        assert.equal(car.showSpeed(), 60);
        assert.equal(car.showSpeed.call(bike), 20);
    })
})
