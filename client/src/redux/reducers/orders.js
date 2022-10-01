import { CREATE_ORDER, GET_ORDER } from "../actionTypes";

// A reducer is a function that accepts the state and a action and based  on the action type dispatches the action.


//state must always be equal to something, so we set an initial value.. here state = products
export const orderReducer = (orders =[], action) => {
    switch (action.type) {
        case GET_ORDER:
            return action.payload; 
        case CREATE_ORDER:
            return [...orders, action.payload];    
        default:
            return orders;
    }
}