import {GET_USERINFO} from "../actionTypes";
import * as api from "../../api/index";


export const getUserInfo = (phone_number) => async (dispatch)=> {
    try {
        //log in the user and navigate to the homepage
        const { data } = await api.getUserInfo(phone_number);
        dispatch({ type: GET_USERINFO, payload: data });
        // history.push(HOMEPAGE)
    } catch (error) {
        console.log(error)
    }
}