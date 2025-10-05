// src/callback-basic.js
// ESM module. Fill TODOs. Practice callback fundamentals (sync + async).
// No Promises or async/await here.

//////////////////////////////////////////////////////////////
// 1. Basic synchronous callback
//////////////////////////////////////////////////////////////

export function greetUser(name, callback) {
  // TODO:
  // - Call callback(name) and return the result
  // - Example: greetUser('Tuyen', n => `Hello ${n}`) -> "Hello Tuyen"
    return callback(name);
}

//////////////////////////////////////////////////////////////
// 2. Higher-order callback: transform array
//////////////////////////////////////////////////////////////

export function mapArray(arr, callback) {
  // TODO:
  // - Return a new array with callback(value, index) applied to each item
  // - Example: mapArray([1,2,3], x => x*2) -> [2,4,6]
    return arr.map(callback);
}

//////////////////////////////////////////////////////////////
// 3. Asynchronous callback via setTimeout
//////////////////////////////////////////////////////////////

export function delayedMessage(msg, delayMs, callback) {
  // TODO:
  // - After delayMs milliseconds, call callback(msg)
  // - Return immediately (do not block)
    return setTimeout(() => callback(msg), delayMs);
}

//////////////////////////////////////////////////////////////
// 4. Error-first callback pattern (Node style)
//////////////////////////////////////////////////////////////

export function readConfig(path, callback) {
  // TODO:
  // - If path === 'valid.json' -> callback(null, { env:'dev' })
  // - Else -> callback('File not found', null)
    if(path === 'valid.json') {
        return callback(null, {env: 'dev'})
    }
    return callback('File not found', null)
}

//////////////////////////////////////////////////////////////
// 5. Chained callbacks (simulate async flow)
//////////////////////////////////////////////////////////////

export function loadUser(id, callback) {
  // TODO:
  // - After 20ms, call callback(null, { id, name: 'User-' + id })
    return setTimeout(() => callback(null, {id, name: 'User-' + id}), 20)
}

export function loadPosts(user, callback) {
  // TODO:
  // - After 20ms, call callback(null, [`Post 1 by ${user.name}`, `Post 2 by ${user.name}`])
    return setTimeout(() => callback(null, [`Post 1 by ${user.name}`, `Post 2 by ${user.name}`]), 20)
}

export function loadUserAndPosts(id, callback) {
  // TODO:
  // - Use loadUser -> then loadPosts inside callback chain
  // - Follow error-first style:
  //   loadUser(id, (err, user) => {
  //       if (err) return callback(err);
  //       loadPosts(user, callback);
  //   });
    loadUser(id, (err, user) => {
        if (err) return callback(err);
        loadPosts(user, callback);
    })
}
