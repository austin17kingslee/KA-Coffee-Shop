import React, { useEffect,useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import EventSection from '../components/Admin/EventSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ADMIN_LOGIN, ADMIN_DASHBOARD } from '../constants/routes';
import { ADMIN_LOGOUT } from '../redux/actionTypes';
import EventList from '../components/EventList/EventList';


function Eventboard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [admin,setAdmin] =useState( JSON.parse(localStorage.getItem("admin")));
  const admin_firstname = admin?.result.name.split(" ")[0]
  
  const adminLogout = () => {
    dispatch({ type: ADMIN_LOGOUT });
    history.push(ADMIN_LOGIN);
    setAdmin(null);
  };

    useEffect(() => {
      document.title = "Coffee Shop | Admin Event";
      if(!admin) return history.push(ADMIN_LOGIN)
    }, [admin,history]);
    return (
      <div className="dash-container bg-gray-100">
        <div className="dash-nav">
          <div>Welcome, { admin_firstname}</div>
          <Link to={ADMIN_DASHBOARD}>
            <div className="nav-item-account">
              <p>Add Product</p>
            </div>
          </Link>
          <div className="dash-icon cursor-pointer" onClick={adminLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <p>Logout</p>
          </div>
        </div>
        <EventSection />
        <EventList DeleteEvent ="Delete" EditEvent ="Edit" />
      </div>
    );
}

export default Eventboard
