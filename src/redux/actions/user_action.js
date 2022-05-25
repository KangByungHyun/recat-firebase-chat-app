import{
    SET_USER
} from './types';

export function setUser(user){
    console.log('setUser - user_action.js', user);
    
    return {
        type: SET_USER,
        payload: user
    }
}