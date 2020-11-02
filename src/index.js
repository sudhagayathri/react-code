import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import { createStore} from "redux";
import allreducers from  "./reducer"
import { Provider } from "react-redux";
//using this global store in calendar component

import Calendar from "./components/calendar/calendar";

console.log(React.version);
const store = createStore(
  allreducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
  );

// function App() {
//   return (
//     <div className="App">
//       <Calendar />
//     </div>
//   );
// }
//store-global states
//action -increment->just a function that returns object
// const increment = ()=>{
//   return{
//     type: 'INCREMENT'//name of action
//   }
// }
// const decrement = ()=>{
//   return{
//     type: 'DECREMENT'//name of action
//   }
// };
// //reducer- on action reducer checks what actin and update the state
// const counter =(state=0, action)=>{
//   switch(action.type){
//     case 'INCREMENT':
//       return state + 1;
//     case 'DECREMENT':
//       return state-1;
//   }
// };
// let store = createStore(counter);
// store.subscribe(()=>console.log(store.getState()));
// //dispatch - dispatches the action
// store.dispatch(decrement());

const rootElement = document.getElementById("root");
ReactDOM.render(
<Provider store = {store}><App /></Provider>,
 rootElement);