import { createStore } from 'redux';
import rootReducer from './reducer/CombineReducers';
const store = createStore(rootReducer); 
export default store;
