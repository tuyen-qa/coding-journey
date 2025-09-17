// src/promises-basic.js
// ESM module. Fill the TODOs to make tests pass.
// NOTE: Use only Promise + .then/.catch in your implementations (avoid async/await).

// 1) Resolve / Reject
export function getUserFromCache(id) {
  // TODO:
  // - If id === 1 -> return Promise that resolves to { id: 1, name: "Alice" }
  // - Otherwise -> return Promise that rejects with "User not found"
    if(id === 1) return Promise.resolve({id: 1, name: "Alice"})
    return Promise.reject(('User not found'));
}

// 2) Chain step
export function getProfile(user) {
  // TODO:
  // - Return a Promise that resolves to an object: { ...user, age: 20 }
    return Promise.resolve({...user, age: 20});
}

// 3) Parallel helper
export function getPosts(userId) {
  // TODO:
  // - Return a Promise that resolves to an array like: [ "Post1 of <userId>", "Post2 of <userId>" ]
    return Promise.resolve([ `Post1 of ${userId}`, `Post2 of ${userId}` ]);
}

// 4) Slow API & Timeout
export function getUserSlow(id) {
  // TODO:
  // - Return a Promise that resolves after ~3000ms with { id, name: "SlowUser" }
    return new Promise(resolve => {
        setTimeout(() => resolve({id, name: "SlowUser"}), 3000)
    })
}

export function timeout(ms) {
  // TODO:
  // - Return a Promise that rejects after `ms` milliseconds with the string "Timeout!"
    return new Promise ((_, reject) => {
        setTimeout(() => { reject(('Timeout!') )}, ms)
    })
}

// 5) Shape the API
export function getUser(id) {
  // TODO:
  // - If id === 1 -> return Promise.resolve({ id: 1, name: "Alice" })
  // - Else -> return getUserSlow(id)
    if (id === 1) return Promise.resolve({id: 1, name: "Alice"})
    return getUserSlow(id)
}
