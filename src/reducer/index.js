import counterreducer from './counter';
import isloggedinreducer from './isloggedin';
import { combineReducers } from 'redux';
const allreducers = combineReducers({
    counter:counterreducer,
    islogged:isloggedinreducer   
});
export default allreducers;