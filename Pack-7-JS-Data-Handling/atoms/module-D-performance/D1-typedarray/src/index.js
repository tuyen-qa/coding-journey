export function sumFloat32(buf){
  const a = new Float32Array(buf.buffer || buf);
  let s=0; for(let i=0;i<a.length;i++) s+=a[i]; return s;
}
