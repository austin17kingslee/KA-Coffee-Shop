import * as api from '../../api';
import { CREATE_EVENT, FETCH_EVENT, UPDATE_EVENT, DELETE_EVENT} from '../actionTypes';

//Action Creators are functions that return actions;
export const getEvent = () => async (dispatch) => {
    try {
        //we get the response from the api and we destructure to get the data, where data represents the products
        const { data } = await api.fetchEvent();

         dispatch({type:FETCH_EVENT,payload:data});
    } catch (error) {
       console.log(error.message) 
    }
};

export const createEvent = (event) =>async(dispatch) =>{
    try {
        const { data } = await api.createEvent(event);
        dispatch({ type: CREATE_EVENT, payload: data })
    } catch (error) {
        console.log(error)
    }
};

export const updateEvent = (id, event) => async (dispatch) => {
    try {
        //destructuring the response to get the updated product
        const { data } = await api.updateEvent(id, event)
        dispatch({type:UPDATE_EVENT,payload:data})
    } catch (error) {
        console.log(error.message)
    }
};

export const deleteEvent = (id) => async (dispatch) => {
    try {
        await api.deleteEvent(id)
        dispatch({type:DELETE_EVENT,payload:id})
    } catch (error) {
        console.log(error)
    }
}