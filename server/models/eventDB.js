import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    id: {type:String},
    title: {type:String},
    photo: {type:String},
    description: {type:String},
    normal_discount_rate: {type:Number},
    silver_discount_rate: {type:Number},
    gold_discount_rate: {type:Number},
    diamond_discount_rate: {type:Number},
    createdAt: {
        type: Date,
        default:new Date()
    }, 
})

export default mongoose.model("Event",eventSchema)