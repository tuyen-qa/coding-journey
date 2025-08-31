export const strategies={
  none:(price)=>price,
  percent:(price, v)=> Math.round(price*(100-v)/100),
  flat:(price, v)=> Math.max(0, price - v)
};
export function applyDiscount(price, {type, value=0}){
  const fn = strategies[type||'none']||strategies.none;
  return fn(price, value);
}
