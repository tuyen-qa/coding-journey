export function mergeConnections(prev, next){
  if(!prev) return next;
  const ids = new Set(prev.edges.map(e=>e.node.id));
  const edges = prev.edges.concat(next.edges.filter(e=>!ids.has(e.node.id)));
  return { ...next, edges };
}
