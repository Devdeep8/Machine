import mongoose, { Schema, models } from "mongoose";

const saleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }, 
    paid: {
        type: String,
        enum: ['paid', 'unpaid'],
        default: 'unpaid'
    },
},
{ timestamps: true }
);

const Sale = models.Sale || mongoose.model("Sale" , saleSchema);

export default Sale;