# 🧩 Callback Structure Playbook — Node-style (err, data)

## 1️⃣ What is `(err, data)`?

In Node.js, almost every asynchronous API follows the **error-first callback pattern**:

```js
callback(err, data)
```

It’s a **design protocol** that defines how functions communicate success or failure.

| Parameter | Meaning |
|------------|----------|
| `err` | `Error` object (or `null` if no error) |
| `data` | Result of the operation when successful |

---

## 2️⃣ Why this pattern exists

Node.js is asynchronous and single-threaded.  
Instead of throwing errors synchronously, async operations **report back later** through callbacks.

This pattern ensures that:
- Errors and results share the same callback signature.
- You never need `try/catch` around async functions.
- It’s easy to chain and convert to Promises.

---

## 3️⃣ General structure of a Node-style function

```js
function doTask(input, callback) {
  if (typeof callback !== 'function')
    throw new TypeError('Callback must be a function');

  try {
    if (!input) return callback(new Error('Missing input'), null);

    const result = process(input);
    callback(null, result); // Success
  } catch (err) {
    callback(err, null); // Failure
  }
}
```

💡 **Key point:** The function *always* calls back exactly once, either with an error or with data.

---

## 4️⃣ How it’s used

```js
doTask('hello', (err, result) => {
  if (err) return console.error('❌ Error:', err.message);
  console.log('✅ Success:', result);
});
```

### Flow summary:

| Step | Code | Meaning |
|------|------|----------|
| 1️⃣ | `callback(err)` | Error path |
| 2️⃣ | `callback(null, data)` | Success path |

---

## 5️⃣ Example: Chaining multiple callbacks

```js
function loadUser(id, callback) {
  setTimeout(() => {
    if (typeof id !== 'number') return callback(new Error('Invalid ID'));
    callback(null, { id, name: 'User-' + id });
  }, 50);
}

function loadPosts(user, callback) {
  setTimeout(() => {
    if (!user) return callback(new Error('Missing user'));
    callback(null, [`Post 1 by ${user.name}`, `Post 2 by ${user.name}`]);
  }, 50);
}

loadUser(7, (err, user) => {
  if (err) return console.error(err.message);
  loadPosts(user, (err, posts) => {
    if (err) return console.error(err.message);
    console.log(posts);
  });
});
```

✅ Pattern: **One entry → one exit (error or success)**.

---

## 6️⃣ Relationship with Promises

Because this format is consistent, Node.js can easily convert it into Promises:

```js
import { promisify } from 'node:util';

const readFilePromise = promisify(fs.readFile);
readFilePromise('config.json')
  .then(data => console.log(data.toString()))
  .catch(err => console.error(err));
```

`promisify` works only because the callback always uses `(err, data)`.

---

## 7️⃣ Mental Model

Think of `(err, data)` as a **two-channel communication line**:

```
callback(err, data)
   ├── err != null → failure path
   └── err == null → success path
```

> It’s like an asynchronous `if/else` — but without blocking the main thread.

---

## 8️⃣ Best Practices

| Principle | Why |
|------------|-----|
| **Always call back** | Never leave callback uncalled (avoids hanging logic). |
| **Error first** | Ensures caller checks for problems before using data. |
| **Single call** | Avoid calling callback twice (can break flow). |
| **Async safe** | Use `setTimeout` or async API to avoid sync errors. |
| **Consistent signature** | `(err, data)` is predictable and composable. |

---

## 9️⃣ Standard Flow Diagram

```
try {
  asyncOperation((error, result) => {
    if (error) handleError(error);
    else handleResult(result);
  });
} catch (err) {
  // not for async errors, only sync ones
}
```

> Node-style callback separates **error handling** and **result handling** clearly, even in async context.

---

## 🔍 10️⃣ Anatomy of a well-designed callback function

| Layer | Code element | Purpose |
|--------|---------------|----------|
| Validation | `if (typeof cb !== 'function')` | Defensive check |
| Safety | `try { … } catch (err)` | Catch sync errors |
| Async timing | `setTimeout / fs.readFile` | Non-blocking I/O |
| Error path | `callback(err, null)` | Report errors |
| Success path | `callback(null, result)` | Deliver data |

---

## 🧠 11️⃣ Callback as a micro-protocol

> `callback(err, data)` is not syntax — it’s a **contract** between functions.

| Role | Responsibility |
|------|----------------|
| Caller | Pass a valid callback, handle both paths |
| Callee | Always call back once with correct parameters |

It’s a handshake:  
“I’ll call you back, and you check the first argument to see if it worked.”

---

## 🧭 12️⃣ Summary Formula

> **Node-style callback** = `callback(error, result)`  
> with rules:

| Rule | Description |
|------|-------------|
| 1️⃣ | Always invoke callback |
| 2️⃣ | Pass `Error` as first arg, or `null` if no error |
| 3️⃣ | Pass result as second arg |
| 4️⃣ | Never throw async errors |
| 5️⃣ | Never call callback twice |

---

## ✅ Essence

> 🧩 `callback(err, data)` = a mini-protocol for asynchronous communication.  
> It enforces structure, safety, and composability —  
> and is the foundation of Promises and async/await today.
