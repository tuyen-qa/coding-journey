// src/orders-basic.js
// ESM module. Fill the TODOs. Use only Promise + .then/.catch (no async/await).

// Helpers (suggested to use in tests, you may keep or edit)
export function smallDelay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

// 1) Cache resolve / reject
export function getPriceFromCache(productId) {
  // TODO:
  // - If productId === 'A' -> resolve 100
  // - If productId === 'B' -> resolve 50
  // - Otherwise -> reject 'Price not found'
}

// 2) Chain: subtotal -> shipping -> total
export function getShippingFee(address) {
  // TODO:
  // - Return a Promise that resolves fee number (e.g., 10) regardless of address
}

export function calcOrderSubtotal(cart /* array of {id, qty} */) {
  // TODO:
  // - Return a Promise that uses getPriceFromCache for each item and sums qty*price
  // - Hint: use Promise.all on mapped item-promises then sum
}

export function calcOrderTotal(cart, address) {
  // TODO:
  // - Chain: calcOrderSubtotal(cart) -> then add getShippingFee(address)
  // - Return a Promise<number>
}

// 3) Slow API & Race: product details may be slow
export function getProductDetailsSlow(id) {
  // TODO:
  // - Resolve after ~50ms with { id, name: 'Slow-' + id }
}

export function timeout(ms) {
  // TODO:
  // - Reject after ms with 'Timeout!'
}

export function getProductFastOrTimeout(id) {
  // TODO:
  // - Race: Promise.race([ getProductDetailsSlow(id), timeout(20) ])
}

// 4) Shape API: getProduct
export function getProduct(id) {
  // TODO:
  // - If id === 'A' -> return Promise.resolve({ id:'A', price: 100 })
  // - Else -> return getProductDetailsSlow(id)
}
