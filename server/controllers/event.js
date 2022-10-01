// this gives us access to the real Model
import mongoose from "mongoose";
import Event from "../models/eventDB.js";
// getting products from the DB
export const createEvents = async (req, res) => {
    const {title, photo, description, normal_discount_rate, silver_discount_rate, gold_discount_rate, diamond_discount_rate} = req.body;

    // discount contains {discount_rate, rank, discount_code}
    
    try{
      const event = await Event.create ({
        'title': title,
        'photo': photo,
        'description': description,
        'normal_discount_rate': normal_discount_rate,
        'silver_discount_rate': silver_discount_rate,
        'gold_discount_rate': gold_discount_rate,
        'diamond_discount_rate': diamond_discount_rate,
      });
      return res.status(200).json(event);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};


// getting events from the DB
export const getEvents = async (req, res) => {
  try {
    // this is an async action to get products from the DB
    const events = await Event.find();

    res.status(200).json(events);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateEvents = async (req, res) => {
  //extracting the id
  const { id: _id } = req.params;
  const event = req.body

  //checking the id is a mongoose id
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

 
  const updatedEvent = await Event.findByIdAndUpdate(_id, {...event,_id}, { new: true })
  
  res.json(updatedEvent);
  
};

export const deleteEvents = async (req, res) => {
  const { id } = req.params;

  //checking the id is a mongoose id
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  
  await Event.findByIdAndRemove(id);
  return res.json('Event Deleted Successfully')
}