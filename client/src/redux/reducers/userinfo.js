import { GET_USERINFO} from "../actionTypes";

// A reducer is a function that accepts the state and a action and based  on the action type dispatches the action.


//state must always be equal to something, so we set an initial value.. here state = products
export const userInfoReducer = (users =[], action) => {
    switch (action.type) {
        case GET_USERINFO:
            return action.payload;    
        default:
            return users;
    }
}