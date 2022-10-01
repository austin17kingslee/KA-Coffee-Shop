import React, { useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {getOrder} from '../redux/actions/orders'
import { getUserInfo } from '../redux/actions/userinfo';
import EventList from '../components/EventList/EventList';

function UserInfo(){
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("profile"))
      );
    console.log(user);  
    const dispatch = useDispatch();
    const Orders = useSelector((state) => state.orderReducer);
    const Rank = useSelector((state) => state.userInfoReducer);
    console.log(Orders); 

    useEffect(() => {
      let phone_number ={
        phone_number: user?.result.phone_number
      };
      dispatch(getOrder(phone_number));  
      dispatch(getUserInfo(phone_number));  
     console.log(phone_number); 

    }, [])

    // dispatch(getOrder());

      return (
        <div className="user-info-container">
          {/* <EventList /> */}
            Hello, here is your information
            <div>Name: {user?.result.name}</div>
            <div>Phone number: {user?.result.phone_number}</div>
            <div>Email: {user?.result.email}</div>
            <div>Rank: {Rank.rank} </div>
            <div>
              Order history: 
              {Orders.map((order) => 
              <div>{order.total}</div>
              )}
            </div>
        </div>
      )
}

export default UserInfo;