# 🧠 Callback Thinking Playbook — Mindset, Formula & Patterns

## 1️⃣ Callback is not syntax — it's a control model

**Callback = giving control away.**
> You don't decide *when* the code runs — you only decide *what* it does.

A callback means:
> “Here’s what to do.  
> You decide *when* to do it.”

---

## 2️⃣ Universal Formula

> ⚙️ **callback pattern = define → pass → invoke (+ optionally transform or guard)**  

| Step | Meaning | Ask yourself |
|------|----------|---------------|
| **1. Define** | Write the callback function (the behavior) | “What should happen when called?” |
| **2. Pass** | Give that function to another function | “Who is controlling when it runs?” |
| **3. Invoke** | The receiver calls it at the right time | “When should it be invoked?” |
| **4. Transform (optional)** | Modify data or wrap behavior | “Should I adjust or decorate it?” |
| **5. Guard / Control (optional)** | Limit, protect, or cancel execution | “Do I need to check or restrict?” |

---

## 3️⃣ The General Code Shape

All callback problems reduce to this core pattern:

```js
function mainTask(input, callback) {
  try {
    // 1️⃣ Do something (sync or async)
    const result = compute(input);

    // 2️⃣ Optional transformation
    const transformed = transform ? transform(result) : result;

    // 3️⃣ Optional guard
    if (condition && !condition(transformed)) return;

    // 4️⃣ Invoke callback
    callback(null, transformed);
  } catch (err) {
    // 5️⃣ Safe callback
    callback(err, null);
  }
}
```

Every exercise (callTwice, wrapCallback, safeCallback, applyIf…)  
is just a variant of this structure.

---

## 4️⃣ Mapping to Common Exercises

| Exercise | Hidden Pattern | Main Step |
|-----------|----------------|-----------|
| `callTwice`, `repeatCallback` | pure invocation | Step 3 (Invoke) |
| `callAll`, `sequence` | multi invocation | Step 3 loop |
| `wrapCallback` | decorator | Step 4 (transform) |
| `safeCallback` | error boundary | Step 5 (guard) |
| `applyIf` | conditional execution | Step 3 + guard |
| `delayedCallback` | async scheduling | Step 1 (timing) |
| `composeCallbacks` | composition | Step 2 + Step 4 |
| `createPipeline` | chain of responsibility | Step 2 + Step 3 recursive |

---

## 5️⃣ FP Perspective

Functional programming treats callbacks as **behavior injection**:
> “I don’t know what you’ll do — I just know when to call you.”

### Common FP forms:
| Pattern | Meaning |
|----------|----------|
| `map`, `filter`, `reduce` | callback iteration |
| `compose`, `pipe` | callback chaining |
| `wrap`, `once`, `debounce` | callback guarding / transformation |

All of them are just:
> **Compose behavior + control when it runs.**

---

## 6️⃣ The 3-element Mental Model

> **Callback = behavior + timing + control**

| Element | Example | Pattern outcome |
|----------|----------|----------------|
| **Behavior** | `fn(x)` | What to do |
| **Timing** | `setTimeout`, `next()`, `onClick` | When to do it |
| **Control** | `if`, `try/catch`, `once`, `cancel()` | Whether / how often to do it |

Every callback question can be answered by:
1. When is it called?  
2. With what data?  
3. Under what condition?

---

## 7️⃣ Callback Types and Mindsets

| Category | Example | Mindset trained |
|-----------|----------|----------------|
| Invocation | `callTwice`, `callAll` | Triggering callbacks |
| Composition / Chain | `chainTwo`, `sequence` | Control flow through callbacks |
| Wrapper / Higher-order | `makeLogger`, `wrapCallback` | Behavior injection |
| Async / Timing | `delayedCallback` | Non-blocking scheduling |
| Guard / Condition | `safeCallback`, `applyIf` | Controlling or restricting calls |

---

## 8️⃣ Callback as a Design Principle

| Principle | Explanation |
|------------|-------------|
| **Inversion of Control** | You give away control — another function decides when to call back. |
| **Behavior Plug-in** | You define *what happens*; the host defines *when it happens*. |
| **Composability** | Callbacks make logic modular, replaceable, and chainable. |

---

## 9️⃣ Quick Reflection Checklist

Ask these 3 questions every time you solve a callback problem:

1. **When** is the callback invoked?  
2. **What** data does it receive or return?  
3. **How** is its execution controlled (loop, condition, async, guard)?  

Answer these — and you’ll never be “lost” in any callback exercise.

---

## 🧭 Summary Formula

| Callback essence | Description |
|------------------|-------------|
| 🧩 Behavior | What to do |
| ⏰ Timing | When to do |
| 🔒 Control | How / whether to do |

> Callback = **Function (Behavior)** + **Event or Timing (When)** + **Rule or Guard (Control)**

That’s the entire playbook behind every callback exercise.
