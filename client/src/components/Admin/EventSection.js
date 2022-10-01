import React, { useState, useContext,useEffect } from 'react';
import { useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
// import { createProducts,updateProduct,getProducts } from '../../redux/actions/products';
import { createEvent, getEvent, updateEvent } from '../../redux/actions/event';

import { CurrentContext, SetContext } from '../../context/edit';

function EventSection() {
  
   const currentId = useContext(CurrentContext);
   const setCurrentId = useContext(SetContext)
  
//when we click the edit button we want to return only the product with the id equal to the id we clicked on and not the entire products state. or else return null
  //const Product because we only return a single product
  const Event = useSelector((state) => currentId ? state.eventReducer.find((e) => e.id === currentId):null);
//   const Event = useSelector((state) => state.eventReducer);
 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvent());
    //when the edit button is clicked the form is populated with the product details.
    if(Event) setEventData(Event)
  }, [Event]);


  const [eventData, setEventData] = useState({
    title: "",
    description:"",
    diamond_discount_rate: "",
    gold_discount_rate: "",
    silver_discount_rate: "",
    normal_discount_rate: "",
    photo: "",
  })

  const Isinvalid = eventData.title === "" || eventData.description==="" || eventData.photo===""

  console.log(Isinvalid)

  const handleSubmit = (e) => {
    e.preventDefault();
//if there is a current id  then we will update the product instead
    if (currentId) {
      //for updating we need to pass the currentId also
      dispatch(updateEvent(currentId, eventData));
         dispatch(getEvent());
      alert("Event updated")
    } else {
      //if there is no current id this means we are creating a new Product
       dispatch(createEvent(eventData));
       alert("Event Added to Database");
       
    }
    clear();
  }

  const clear = () => {
    setCurrentId(null)
    setEventData({
        title: "",
        description:"",
        diamond_discount_rate: "",
        gold_discount_rate: "",
        silver_discount_rate: "",
        normal_discount_rate: "",
        photo: "",
    });
  }
    return (
      <div className="dash-form-container">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <h1 className="dash-form-head">{currentId ? 'Editing an Event' : 'Add an Event'}</h1>
            <div className="form-body">
              <input
                name="title"
                value={eventData.title}
                onChange={(e) =>
                  setEventData({ ...eventData, title: e.target.value })
                }
                type="text"
                className="form-input"
                placeholder="Event Title"
              />
            </div>

            <div className="form-body mt-4">
              <textarea
                value={eventData.description}
                onChange={(e) =>
                  setEventData({
                    ...eventData,
                    description: e.target.value,
                  })
                }
                className="dash-textarea"
                placeholder="Event Description"
              ></textarea>
            </div>

            Discount details

            <div className="form-body ">
            * For diamond members 
              <input
                name="discount_rate"
                value={eventData.diamond_discount_rate}
                onChange={(e) =>
                  setEventData({ ...eventData, diamond_discount_rate: e.target.value })
                }
                type="number"
                className="form-input"
                placeholder="Discount rate"
              />
            </div>

            <div className="form-body ">
            * For gold members 
              <input
                name="discount_rate"
                value={eventData.gold_discount_rate}
                onChange={(e) =>
                  setEventData({ ...eventData, gold_discount_rate: e.target.value })
                }
                type="number"
                className="form-input"
                placeholder="Discount rate"
              />
            </div>

            <div className="form-body ">
            * For silver members 
              <input
                name="discount_rate"
                value={eventData.silver_discount_rate}
                onChange={(e) =>
                  setEventData({ ...eventData, silver_discount_rate: e.target.value })
                }
                type="number"
                className="form-input"
                placeholder="Discount rate"
              />
            </div> 

            <div className="form-body ">
            * For normal members 
              <input
                name="discount_rate"
                value={eventData.normal_discount_rate}
                onChange={(e) =>
                  setEventData({ ...eventData, normal_discount_rate: e.target.value })
                }
                type="number"
                className="form-input"
                placeholder="Discount rate"
              />
            </div>       
            
            <div>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setEventData({ ...eventData, photo: base64 })
                }
              />
            </div>
            <div className="button-container">
              <button className={Isinvalid? "cursor-not-allowed create-button opacity-60" :"create-button"} disabled={Isinvalid} type="submit">
                Create
              </button>
            </div>
          </form>
          <div className="button-container">
            <button className="clear-button" onClick={clear}>
              Clear
            </button>
          </div>
        </div>
      </div>
    );
}

export default EventSection
