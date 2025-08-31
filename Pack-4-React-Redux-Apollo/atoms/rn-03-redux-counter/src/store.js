import { configureStore, createSlice } from '@reduxjs/toolkit';
const slice = createSlice({
  name:'counter',
  initialState:{ value:0 },
  reducers:{ inc:(s)=>{s.value++}, dec:(s)=>{s.value--} }
});
export const { inc, dec } = slice.actions;
const store = configureStore({ reducer: { counter: slice.reducer } });
export default store;
