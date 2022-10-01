import { CREATE_ORDER,  GET_ORDER } from "../actionTypes";
import * as api from "../../api/index";

export const createOrder = (formData) => async(dispatch) =>{
    try {
        const { data } = await api.createOrder(formData);
        dispatch({ type: CREATE_ORDER, payload: data })
    } catch (error) {
        console.log(error)
    }
};

export const getOrder = (phone_number) => async (dispatch)=> {
    try {
        //log in the user and navigate to the homepage
        const { data } = await api.getOrder(phone_number);
        dispatch({ type: GET_ORDER, payload: data });
        // history.push(HOMEPAGE)
    } catch (error) {
        console.log(error)
    }
}