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
  if (productId === 'A') return Promise.resolve(100);
  // - If productId === 'B' -> resolve 50
  if (productId === 'B') return Promise.resolve(50);
  return Promise.reject(('Price not found'));
  // - Otherwise -> reject 'Price not found'
}

// 2) Chain: subtotal -> shipping -> total
export function getShippingFee(address) {
  // TODO:
  // - Return a Promise that resolves fee number (e.g., 10) regardless of address
  return Promise.resolve(10);
}

export function calcOrderSubtotal(cart /* array of {id, qty} */) {
  // TODO:
  // - Return a Promise that uses getPriceFromCache for each item and sums qty*price
  // - Hint: use Promise.all on mapped item-promises then sum
  return Promise.all(
      cart.map(item => getPriceFromCache(item.id))
  ).then(itemPrices =>
      itemPrices.map((price, i) => price * cart[i].qty)
  ). then(subtotals => subtotals.reduce((acc, cur) => acc + cur), 0)
}

export function calcOrderTotal(cart, address) {
  // TODO:
  // - Chain: calcOrderSubtotal(cart) -> then add getShippingFee(address)
  // - Return a Promise<number>
  return calcOrderSubtotal(cart).then(sum => getShippingFee(address).then(fee => sum + fee));
}

// 3) Slow API & Race: product details may be slow
export function getProductDetailsSlow(id) {
  // TODO:
  // - Resolve after ~50ms with { id, name: 'Slow-' + id }
  return new Promise(res => setTimeout(() => res({id, name: 'Slow-' + id}), 50));
}

export function timeout(ms) {
  // TODO:
  // - Reject after ms with 'Timeout!'
  return new Promise((_, reject) => {
    setTimeout(() => reject('Timeout!'), ms);
  })
}

export function getProductFastOrTimeout(id) {
  // TODO:
  // - Race: Promise.race([ getProductDetailsSlow(id), timeout(20) ])
  return Promise.race([
      getProductDetailsSlow(id),
      timeout(20)
  ])
}

// 4) Shape API: getProduct
export function getProduct(id) {
  // TODO:
  // - If id === 'A' -> return Promise.resolve({ id:'A', price: 100 })
  // - Else -> return getProductDetailsSlow(id)
  if(id === 'A') return Promise.resolve({id: 'A', price: 100})
  return getProductDetailsSlow(id)
}
