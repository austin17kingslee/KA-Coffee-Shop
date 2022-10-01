import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    id:{type:String},
    customer: {
        name:{type:String,required:true},
        phone_number:{type:String,required:true},
        address: {type:String,required:true},
    },
    product: [
        {
            productName: {type:String},
            price: {type: Number},
            quantity: {type: Number}
        }
    ],
    createdAt: {
        type: Date,
        default:new Date()
    }, 
    discount: {type: Number},
    total: {type:Number},
})

export default mongoose.model("Order",orderSchema)