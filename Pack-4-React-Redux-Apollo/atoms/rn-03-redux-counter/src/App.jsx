import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { inc, dec } from './store';
function Counter(){
  const value = useSelector(s=>s.counter.value);
  const dispatch = useDispatch();
  return <div>
    <h1>{value}</h1>
    <button onClick={()=>dispatch(inc())}>+</button>
    <button onClick={()=>dispatch(dec())}>-</button>
  </div>;
}
export default function App(){ return <Provider store={store}><Counter/></Provider>; }
