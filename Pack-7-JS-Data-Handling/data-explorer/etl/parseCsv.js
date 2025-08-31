export function reviverDates(key, value){
  if(typeof value==='string' && /^\d{4}-\d{2}-\d{2}/.test(value)) return new Date(value);
  return value;
}
export function parseCsv(text){
  const [head, ...lines] = text.trim().split(/\r?\n/);
  const cols = head.split(',').map(s=>s.trim());
  return lines.map(ln=>{
    const cells = ln.split(','); const o={};
    cols.forEach((c,i)=> o[c]=cells[i]!==undefined? cells[i].trim(): '' );
    return o;
  });
}
export function toCsv(rows){
  if(!rows.length) return '';
  const cols = Object.keys(rows[0]);
  const head = cols.join(',');
  const body = rows.map(r=> cols.map(c=> String(r[c]??'')).join(',')).join('\n');
  return head+'\n'+body;
}
