// src/feed-basic.js
// ESM module. Fill TODOs. Promise + .then/.catch only.

// 1) Cache vs reject
export function getUserFromCache(id) {
  // TODO:
  // - If id === 1 -> resolve { id:1, name:'Alice' }
  // - Else -> reject 'User not found'
}

// 2) Chain: user -> feed
export function getFeedForUser(user) {
  // TODO:
  // - Return Promise that resolves to array of strings: [ 'Feed for <name> #1', 'Feed for <name> #2' ]
}

// 3) Parallel: user + notifications
export function getNotifications(userId) {
  // TODO:
  // - Return Promise that resolves to [ 'N1 for <userId>', 'N2 for <userId>' ]
}

// 4) Race: cache vs network
export function getUserFromNetworkSlow(id) {
  // TODO:
  // - Resolve after ~60ms with { id, name:'Net-' + id }
}

export function timeout(ms) {
  // TODO:
  // - Reject after ms with 'Timeout!'
}

export function getUserFromCacheOrNetwork(id) {
  // TODO:
  // - Try cache first: return getUserFromCache(id)
  // - If cache rejects, return Promise.race([ getUserFromNetworkSlow(id), timeout(30) ])
  // - Hint: use .catch to switch path
}
