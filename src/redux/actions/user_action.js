import{ SET_USER, CLEAR_USER } from './types';

export function setUser(user){
    console.log('setUser - user_action.js', user);
    
    return {
        type: SET_USER,
        payload: user
    }
}

export function clearUser(){
    console.log('clearUser - user_action.js');
    
    return {
        type: CLEAR_USER
    }
}