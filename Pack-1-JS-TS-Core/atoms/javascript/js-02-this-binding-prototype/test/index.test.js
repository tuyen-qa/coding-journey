import {describe, it} from "node:test"
import assert from "node:assert/strict"
import {
    whoAmI,
    introduce,
    Person,
    timer,
    car,
    bike,
    user,
    // call/apply/bind
    greet,
    // bindOnce/safeMethod/autoBind
    bindOnce, safeMethod, autoBind,
    // constructor/prototype/chain
    Person, Entity, User, shadowIncDemo,
    // method borrowing
    formatter,
    // api client + this loss
    ApiClient,
    // debounce
    debounce,
} from "../src/index.js";

let alice = {name: 'Alice', whoAmI}
let bob = {name: 'Bob', whoAmI}

describe("whoAmI", () => {
    it("this thay doi theo object goi,", () => {
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

/* ========================================
   call / apply / bind
   ======================================== */
describe('call / apply / bind', () => {
    it(`call & apply ep this va goi ngay`, () => {
        assert.equal(greet.call(alice, 'Hello'), 'Hello Alice!');
        assert.equal(greet.apply(bob, ['Yo', '?']), 'Yo Bob?')
    });

    it(`bind tra ve ham moi co dinh this`, () => {
        const hiAlice = greet.bind(alice);
        assert.equal(hiAlice('Hi'), 'Hi Alice!');
        const yoBob = greet.bind(bob, 'Yo');
        assert.equal(yoBob('?'), 'YoBob?');
    });
})

/* ========================================
   bindOnce / safeMethod / autoBind
   ======================================== */
describe('bindOnce / sasfeMethod / autoBind', () => {
    it('bindOnce: luôn dùng this = obj đã bind', () => {
        function say(g) { return g + ' ' + this.name; }
        const hiAlice = bindOnce(say, alice);
        assert.equal(hiAlice('Hi'), 'Hi Alice');
        // gán vào object khác: vẫn là Alice
        const other = { name: 'Other', f: hiAlice };
        assert.equal(other.f('Yo'), 'Yo Alice');
    });

    it('safeMethod: bind một method cụ thể mà không sửa object gốc', () => {
        const svc = { name: 'Service', info(msg){ return `[${this.name}] ${msg}`; } };
        const loose = svc.info;
        assert.equal(loose('up'), '[undefined] up');
        const safe = safeMethod(svc, 'info');
        assert.equal(safe('up'), '[Service] up');
        assert.notEqual(svc.info, safe); // không thay method gốc
    });

    it('autoBind: class methods an toàn khi tách ra gọi', () => {
        class Repo {
            constructor(url){ this.url = url; }
            getAll(){ return `GET ${this.url}/items`; }
            getById(id){ return `GET ${this.url}/items/${id}`; }
        }
        const r = new Repo('https://api.example.com');
        let threw = false;
        try { const f = r.getAll; f(); } catch { threw = true; }
        assert.equal(threw, true); // rơi this

        autoBind(r);
        const f = r.getAll, g = r.getById;
        assert.equal(f(), 'GET https://api.example.com/items');
        assert.equal(g(42), 'GET https://api.example.com/items/42');
    });
})

/* ========================================
   Constructor + Prototype + Prototype Chain
   ======================================== */
describe('Constructor / Prototype / Chain', () => {
    it('Person: dữ liệu trên instance, method ở prototype', () => {
        const p1 = new Person('Alice');
        const p2 = new Person('Bob');
        assert.equal(p1.sayName(), 'My name is Alice');
        assert.equal(p2.sayName(), 'My name is Bob');
        assert.equal(p1.sayName, p2.sayName); // cùng 1 function reference (prototype)
    });

    it('Kế thừa (Entity -> User) & override; chain fallback khi xóa override', () => {
        const u = new User('Carol');
        assert.equal(u.describe(), 'User: Carol'); // override hoạt động
        // tạm xóa override để thấy fallback về Entity.prototype.describe
        const backup = User.prototype.describe;
        delete User.prototype.describe;
        assert.equal(u.describe(), 'Entity: user');
        // khôi phục
        User.prototype.describe = backup;
    });

    it('Shadowing: che method prototype trên 1 instance', () => {
        const { Counter, c1, c2, sameRefBefore, sameRefAfter } = shadowIncDemo();
        assert.equal(sameRefBefore, true);
        assert.equal(sameRefAfter, false);
        assert.equal(c1.inc(), 10); // shadow: +10
        assert.equal(c2.inc(), 1);  // proto:  +1
        assert.equal(Object.getPrototypeOf(c1).inc, Counter.prototype.inc);
    });
});

/* ========================================
   Method Borrowing (mượn method giữa objects)
   ======================================== */
describe('Method borrowing via call/apply', () => {
    it('mượn formatter.format cho context khác', () => {
        const note = { prefix: '[*] ', msg: 'Hello' };
        // Nếu format nhận msg từ args:
        const format = function(msg) { return this.prefix + msg; };
        assert.equal(format.call({ prefix: '[! ] ' }, 'Danger'), '[! ] Danger');
        // hoặc dùng formatter.format nhưng cung cấp this có prefix và truyền msg
        assert.equal(formatter.format.call({ prefix: '[*] ' }, 'Hello'), '[*] Hello');
    });
});

/* ========================================
   API Client (constructor + prototype) & rơi this
   ======================================== */
describe('ApiClient', () => {
    it('chia sẻ method ở prototype; this là instance', () => {
        const c1 = new ApiClient('https://a.com');
        const c2 = new ApiClient('https://b.com');
        assert.equal(c1.get, c2.get); // cùng 1 function
        assert.equal(c1.get('/users'), 'GET https://a.com/users');
        assert.equal(c2.get('/users'), 'GET https://b.com/users');
    });

    it('tách method → rơi this; fix bằng bind', () => {
        const c = new ApiClient('https://x.com');
        const loose = c.get;
        let threw = false;
        try { loose('/v'); } catch { threw = true; }
        assert.equal(threw, true);
        const bound = c.get.bind(c);
        assert.equal(bound('/v'), 'GET https://x.com/v');
    });
});

/* ========================================
   Debounce (wrapper thực tế, giữ this/args của lần cuối)
   ======================================== */
describe('debounce', () => {
    it('chỉ thực thi 1 lần với lần gọi cuối, giữ đúng this/args', async () => {
        const calls = [];
        const obj = {
            v: 10,
            fn(x) { calls.push({ thisV: this.v, x }); return this.v + x; }
        };
        const d = debounce(obj.fn, 20).bind(obj);
        d(1); d(2);
        const p = d(3);
        const res = await p;
        assert.equal(res, 13);
        assert.equal(calls.length, 1);
        assert.deepEqual(calls[0], { thisV: 10, x: 3 });
    });
});

