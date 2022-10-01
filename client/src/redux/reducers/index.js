import { combineReducers } from "redux";

import { productReducer } from './products';
import { cartReducer } from "./cart";
import { authReducer } from "./auth";
import { adminReducer } from "./admin";
import { eventReducer } from "./event";
import { orderReducer } from "./orders";
import {userInfoReducer} from "./userinfo";

export default combineReducers({
productReducer,cartReducer,authReducer,adminReducer, eventReducer, orderReducer, userInfoReducer
})