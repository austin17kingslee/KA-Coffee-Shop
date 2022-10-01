import { CREATE_EVENT, FETCH_EVENT, UPDATE_EVENT, DELETE_EVENT } from "../actionTypes";

// A reducer is a function that accepts the state and a action and based  on the action type dispatches the action.

//state must always be equal to something, so we set an initial value.. here state = products
export const eventReducer = (events =[], action) => {
    switch (action.type) {
        case FETCH_EVENT:
            return action.payload;
        // case FETCH_BY_CATEGORY:
        //     return action.payload;
        case CREATE_EVENT:
            return [...events, action.payload];
        case UPDATE_EVENT:
            //if the product id(product already in the DB) === payload.id(the new updated product been sent to the DB) we 'swap' the existing product with the updated payload else return the whole events.
            return events.map((event => event._id === action.payload ? action.payload : event));
        case DELETE_EVENT:
            return events.filter((event)=>event._id !== action.payload)
        default:
            return events;
    }
}