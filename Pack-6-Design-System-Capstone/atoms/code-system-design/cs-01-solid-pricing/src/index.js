export function priceCalculator(items, rules){
  // items: [{sku, qty}] ; rules: { sku -> {unit, discount?} }
  let total = 0;
  for(const it of items){
    const r = rules[it.sku]; if(!r) throw new Error('unknown_sku');
    let subtotal = r.unit * it.qty;
    if(r.discount && r.discount.type==='percent'){
      subtotal = Math.round(subtotal * (100 - r.discount.value)/100);
    }
    total += subtotal;
  }
  return total;
}
