# 🧠 Event Loop Basic Playbook — Understanding Callbacks, Queue, and Execution Flow

---

## 1️⃣ Single-threaded — One worker, one job at a time

JavaScript has **only one main worker** (thread).  
It can do **only one thing at a time**.

Imagine:
- One chef in the kitchen 👨‍🍳
- He can cook only one dish at a time.

```js
console.log("A");
console.log("B");
```

✅ Output:
```
A
B
```

The chef finishes A, then cooks B.  
He never multitasks.

---

## 2️⃣ Environment — The kitchen helpers (Browser / Node.js)

JavaScript doesn’t live alone.  
It runs inside an environment:
- **Browser** → has timers, DOM, network requests, etc.
- **Node.js** → has file system, timers, network sockets.

These environments have **helpers** (like waiters) who can do side jobs —  
so JS can keep cooking without waiting.

---

## 3️⃣ Asynchronous — “Don’t wait, call me later!”

Asynchronous = **do not block**, **don’t wait for results**.

Example:

```js
console.log("Start");
setTimeout(() => console.log("Coffee ready!"), 2000);
console.log("Keep reading...");
```

✅ Output:
```
Start
Keep reading...
Coffee ready!
```

JS asks the timer helper:  
> “Remind me in 2 seconds!”  
Then keeps running other code.

---

## 4️⃣ Call Stack — The to-do pile 🍽️

The **Call Stack** is like a pile of dishes:
- Each time a function runs, one dish is added (pushed).
- When it finishes, it’s removed (popped).

```js
function a() { b(); }
function b() { console.log("Hello"); }
a();
```

Order inside the stack:
```
a()
  ↳ b()
    ↳ console.log()
```

When `console.log()` finishes → remove it → back to `b()` → back to `a()`.

JS can only touch **the top plate** — that’s what makes it single-threaded.

---

## 5️⃣ Callback — “Call me when you’re done”

A **callback** is a function you hand to someone else to run **later**.

```js
setTimeout(() => {
  console.log("Time's up!");
}, 1000);
```

JS tells the timer:
> “When 1s passes, please call this function.”

While waiting, JS keeps running other code.  
When the timer finishes, it **adds the callback to the queue**.

---

## 6️⃣ Queue — The waiting line 🧍🧍🧍

A **queue** is a waiting line for callbacks.

When the main stack is empty,  
the **event loop** will take the first callback from the queue and run it.

Think of a bank:
> Only one teller (call stack).  
> Many customers (callbacks) waiting in line.

---

## 7️⃣ Event Loop — The traffic controller 🔁

**Event Loop** = the person watching both the stack and the queue.

He keeps asking:
> “Is the stack empty now?  
> If yes, who’s first in line (queue)? Let’s run that callback!”

Example:

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
```

✅ Output:
```
A
C
B
```

Because:
1. JS runs “A”, “C”.
2. Timer callback “B” goes into queue.
3. Event Loop runs “B” **after** the stack is clear.

---

## 8️⃣ Microtask vs Macrotask — Two kinds of lines

There are two queues:

| Queue type | Examples | Priority |
|-------------|-----------|-----------|
| **Microtask** | Promise, queueMicrotask | 🥇 Runs first |
| **Macrotask** | setTimeout, setInterval, IO events | 🥈 Runs later |

```js
console.log('A');

Promise.resolve().then(() => console.log('B'));

setTimeout(() => console.log('C'), 0);

console.log('D');
```

✅ Output:
```
A
D
B
C
```

- Promise (`then`) = microtask → runs before `setTimeout`.
- Timeout callback waits for the next loop.

---

## 9️⃣ Browser vs Node.js — Slightly different kitchens 🍳

| Feature | Browser | Node.js |
|----------|----------|---------|
| Async APIs | DOM, fetch, timers | File system, timers, network |
| Event loop owner | Browser engine | libuv (Node internal library) |
| Microtasks | Promises | Promises, process.nextTick |
| Macrotasks | setTimeout, setInterval | Timers, setImmediate |

But the **logic stays the same**:
1. Stack runs first  
2. Then microtasks  
3. Then macrotasks  
4. Repeat

---

## 🔟 Visual Summary — How JS runs your callbacks

```
📜 JS runs main code
⏳ Async tasks start (timer, fetch, IO)
📥 Their callbacks are stored in queue
🔁 Event Loop checks: "Stack empty?"
🚀 If yes, take callback from queue and run
```

### Priority:
```
Microtask Queue (Promises) → always runs first
Macrotask Queue (setTimeout, IO) → runs next
```

---

## 🧩 Simple mental image

```
Call Stack  (doing now)
┌──────────────┐
│ console.log()│
└──────────────┘
       ↓
Event Loop checks 👀
       ↓
Callback Queue (waiting)
┌──────────────┐
│ setTimeout() │
└──────────────┘
```

---

## 🧠 Key Summary

| Concept | One-line meaning |
|----------|------------------|
| **Single-threaded** | JS only does one thing at a time |
| **Asynchronous** | JS doesn’t wait for slow tasks |
| **Environment** | Browser/Node runs async parts |
| **Callback** | Function called later |
| **Call Stack** | Where JS runs right now |
| **Queue** | Where callbacks wait |
| **Event Loop** | The watcher moving callbacks from queue to stack |
| **Microtask** | VIP queue (Promise, faster) |

---

> ✅ **In one sentence:**  
> JavaScript runs one thing at a time,  
> delegates async work to its environment,  
> and uses queues + the event loop to call your callbacks when it’s safe to do so.
