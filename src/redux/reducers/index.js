import { combineReducers } from "redux";
import user from './user_reducer';

console.log('reducers/index.js');

const rootReducer = combineReducers({
    //combineReducers
    user,
});

export default rootReducer;