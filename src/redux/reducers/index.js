import { combineReducers } from "redux";
import user from './user_reducer';

const rootReducer = combineReducers({
    //combineReducers
    user,
});

export default rootReducer;