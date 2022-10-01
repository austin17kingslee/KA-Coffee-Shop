import React,{useContext} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { SetContext } from "../../context/edit";
import {deleteEvent} from '../../redux/actions/event'

function EventList({DeleteEvent , EditEvent }) {
  const setCurrentId = useContext(SetContext);
  const dispatch = useDispatch();
  const EventData = useSelector((state) => state.eventReducer);

    return (
      <div>
        {EventData.length >0 &&(
          <section className="product-section">
            <div className="product-container">
              <h1 className="product-header">Event</h1>
              <div className="card-container ">
                {EventData.map((event) =>  
                  (<div className="" key={event._id}>
                    <div className="card-body transform duration-150 ease-in sm:hover:scale-110">
                      <img
                        src={event.photo}
                        alt="event"
                        className="card-image"
                      />
                      <div className="card-details">
                        <h1 className="card-heading">{event.title}</h1>
                        <p className="line-clamp-3 mt-3">Discount for:</p>
                        <p className="line-clamp-3 mt-3">- Diamond members: {event.diamond_discount_rate}%</p>
                        <p className="line-clamp-3 mt-3">- Gold members: {event.gold_discount_rate}%</p>
                        <p className="line-clamp-3 mt-3">- Silver members: {event.silver_discount_rate}%</p>
                        <p className="line-clamp-3 mt-3">- Normal members: {event.normal_discount_rate}%</p>
                        <p className="text-card">Description: {event.description}</p>
                        {/* {EditEvent && (
                          <div className="line-clamp-3 mt-3">
                            {" "}
                            {event.description}
                          </div>
                        )} */}
                      </div>
                      {/* {handleClick && (
                        <Link
                          to={`/${event._id}`}
                          onClick={handleClick}
                        >
                          <div className="card-footer">
                            <p> View</p>
                          </div>
                        </Link>
                      )} */}

                      {EditEvent && (
                        <div className="card-footer" onClick={()=>setCurrentId(event._id)}>
                          <p>Edit</p>
                        </div>
                      )}
                      {DeleteEvent && (
                        <div className="card-footer bg-red-400" onClick={()=>dispatch(deleteEvent(event._id))}>
                          <p>Delete</p>
                        </div>
                      )}
                  </div>
                  </div>)
                  )
                }
              </div>
            </div>
          </section>
        )}
        {!EventData.length && (
          <div className="p-10 text-center">
            <h1 className="text-3xl">Event List</h1>
            <h1 className="text-center text-lg animate-pulse font-bold mt-4">
              Loading event...
            </h1>
          </div>
        )}
      </div>
    );
     
}

 export default EventList
