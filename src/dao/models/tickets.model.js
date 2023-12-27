import mongoose from "mongoose";

const ticketsSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    purchase_datatime: {
        type: Date,
        required: true
    },
    amount: {
        type:Number,
        required:true
    },
    purchaser: {
        type: String,
        ref: "users"
    }
})

export const ticketModel = mongoose.model("tickets", ticketsSchema)