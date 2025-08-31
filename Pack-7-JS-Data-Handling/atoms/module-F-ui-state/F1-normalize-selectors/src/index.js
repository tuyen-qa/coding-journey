export function normalizeById(items, idKey='id'){
  const byId={}, allIds=[]; for(const it of items){ const id=String(it[idKey]); byId[id]=it; allIds.push(id); }
  return { byId, allIds };
}
export function createSelector(inputFn, projector){
  let lastArgs=null, lastRes=null;
  return (state)=>{
    const args = inputFn(state);
    if(lastArgs && JSON.stringify(args)===JSON.stringify(lastArgs)) return lastRes;
    lastArgs = JSON.parse(JSON.stringify(args));
    lastRes = projector(...args); return lastRes;
  };
}
