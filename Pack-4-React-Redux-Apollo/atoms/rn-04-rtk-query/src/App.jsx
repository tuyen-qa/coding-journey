import { Provider } from 'react-redux'; import store from './store'; import { useUsersQuery } from './api';
function Users(){ const { data,isLoading }=useUsersQuery(); if(isLoading) return <p>Loading...</p>; return <ul>{data.map(u=><li key={u.id}>{u.name}</li>)}</ul>; }
export default function App(){ return <Provider store={store}><Users/></Provider>; }
