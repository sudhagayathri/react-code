import logo from './logo.svg';
import './App.css';
import { useSelector, useDispatch } from  "react-redux";
import { increment } from './action';
import { decrement } from './action';


function App() {
  const counter = useSelector(state=> state.counter);
  const isloggedin = useSelector(state=> state.islogged);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <h3>Counter {counter}</h3>
      <button onClick = {()=>dispatch(increment(5))}>+</button>
      <button onClick = {()=>dispatch(decrement(3))}>-</button>
      {isloggedin?<p>show this</p>:""}
    </div>
  );
}

export default App;
