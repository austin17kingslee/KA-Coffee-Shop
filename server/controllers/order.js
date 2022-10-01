// this gives us access to the real Model
import Order from "../models/orderDB.js";
import User from '../models/usersDB.js';
import Event from "../models/eventDB.js";
// getting products from the DB
export const createOrder = async (req, res) => {
    const { name, phone_number, address, productList, total } = req.body;

    try {
        const order = await Order.create({
          'customer.name': name, 
          'customer.phone_number': phone_number,
          'customer.address': address,
          'product': productList,
          'total': total,
        });

        const orderID = order._id;
        // console.log(orderID);

        await User.findOneAndUpdate(
            {phone_number: phone_number}, 
            {$inc : {point: 10}},
            (err, doc) => {
                if (err) {
                    console.log("Cannot update data!");
                }
            }
        );

        await User.updateMany(
            {phone_number: phone_number}, 
            [{$set : {rank: { $switch: { 
                branches: [
                    { case: { $and: [{$gte: [{$avg: "$point"}, 30]}, {$lt: [{$avg: "$point"}, 60]}]}, then: "Silver"},
                    { case: { $and: [{$gte: [{$avg: "$point"}, 60]}, {$lt: [{$avg: "$point"}, 90]}]}, then: "Gold"},
                    { case: { $gte: [{$avg: "$point"}, 90]}, then: "Diamond"},
                ],
                default: ""
             }}}},
            ],
            (err, doc) => {
                if (err) {
                    console.log("Cannot update data!");
                }
            }
        );
        
        let userRank = ""
        const temp = await User.findOne(
            {phone_number: phone_number}, {rank: 1, _id: 0}
        );
        if (temp) {
            userRank = JSON.parse(JSON.stringify(temp)).rank;
        }
        
        // const temp = JSON.parse(JSON.stringify(
        //     await Event.findOne(
        //         {"discount.rank": userRank}, {"discount.discount_code.$": 1, _id: 0}
        //     )
        // )).discount;
        // const userDiscountCode = JSON.parse(
        //     JSON.stringify(temp[0])
        // ).discount_code;
        
        // const temp1 = JSON.parse(JSON.stringify(
        //     await Event.findOne(
        //         {"discount.rank": userRank}, {"discount.discount_rate.$": 1, _id: 0}
        //     )
        // )).discount;
        // const userDiscountRate = JSON.parse(
        //     JSON.stringify(temp1[0])
        // ).discount_rate;

        let userDiscountRate = "";
        if (userRank === "Silver") {
            const userDiscount = await Event.findOne(
                {},
                { silver_discount_code: 1, silver_discount_rate: 1, _id: 0 },
                {sort:{$natural:-1}}
            );

            userDiscountRate= JSON.parse(
                JSON.stringify(userDiscount)
            ).silver_discount_rate;
        }

        else if (userRank === "Gold") {
            const userDiscount = await Event.findOne(
                {},
                { gold_discount_code: 1, gold_discount_rate: 1, _id: 0 },
                {sort:{$natural:-1}}
            );
            
            userDiscountRate= JSON.parse(
                JSON.stringify(userDiscount)
            ).gold_discount_rate;
        }

        else if (userRank === "Diamond") {
            const userDiscount = await Event.findOne(
                {},
                { diamond_discount_code: 1, diamond_discount_rate: 1, _id: 0 },
                {sort:{$natural:-1}}
            );
            
            userDiscountRate= JSON.parse(
                JSON.stringify(userDiscount)
            ).diamond_discount_rate;
        }

        else {
            const userDiscount = await Event.findOne(
                {},
                { normal_discount_code: 1, normal_discount_rate: 1, _id: 0 },
                {sort:{$natural:-1}}
            );
            
            userDiscountRate= JSON.parse(
                JSON.stringify(userDiscount)
            ).normal_discount_rate;
        }

        await Order.findOneAndUpdate(
            {_id: orderID}, 
            {$set: {total: total * (100 - userDiscountRate) / 100, discount: userDiscountRate}},
            { returnDocument: 'after' }, 
            (err, doc) => {
                if (err) {
                    console.log("Cannot update data!");
                }
                return res.status(200).json(doc);
            }
        );
        // return res.status(200).json(order);
    } catch (error) {
        return res.status(404).json({message:error.message})
    }

};

export const getOrder = async (req, res) => {

    const {phone_number} = req.body;

    try {
        const order = await Order.find({"customer.phone_number": phone_number});
        return res.status(200).json(order);
    } catch (error) {
        return res.status(404).json({message:error.message});
    }
};