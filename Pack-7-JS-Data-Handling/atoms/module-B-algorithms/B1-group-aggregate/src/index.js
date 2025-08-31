export function groupBy(arr, keyFn){
    const out=new Map();
    for(const it of arr){ const k=keyFn(it); if(!out.has(k)) out.set(k, []); out.get(k).push(it); }
    return out;
}
export function aggregate(orders, key='userId'){
    const g = groupBy(orders, o=> o[key]);
    const res=[];
    for(const [k, list] of g.entries()){
        const count=list.length; const sum=list.reduce((a,b)=>a+(b.totalCents||0),0);
        res.push({ key:k, count, sum, avg: count? sum/count: 0 });
    } return res.sort((a,b)=> b.sum-a.sum);
}
