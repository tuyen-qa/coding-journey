import Button from './Button'; import Card from './Card'; import Input from './Input'; import { useState } from 'react';
export default function App(){ const [txt,setTxt]=useState(''); return <Card><Input value={txt} onChange={e=>setTxt(e.target.value)}/><Button onClick={()=>alert(txt)}>Show</Button></Card>; }
