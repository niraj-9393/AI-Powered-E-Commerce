import mongoose from "mongoose";
import { Iorder } from "../types/orderType";

const cartItemSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const orderSchema = new mongoose.Schema<Iorder>(
    {
        userId: {
            type: String,
            required: true
        },

        amount: {
            type: Number,
            required: true
        },

        address: {
            type: {
                firstName: String,
                lastName: String,
                phone: String,
                street: String,
                city: String,
                state: String,
                pincode: String,
                country: String
            },
            required: true
        },

        status: {
            type: String,
            required: true
        },

        payment: {
            type: Boolean,
            required: true,
            default: false
        },

        paymentMethod: {
            type: String,
            required: true
        },

        date: {
            type: Date,
            required: true
        },

        items: {
            type: [cartItemSchema],
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;