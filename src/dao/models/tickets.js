import mongoose from 'mongoose';

const ticketsCollection = 'tickets';
const ticketSchema = new mongoose.Schema({
    purchaser: String,
    purchase_datetime: String,
    amount: Number,
    code: {
        type: String,
        unique: true
    }
})

const ticketsModel = mongoose.model(ticketsCollection, ticketSchema);

export default ticketsModel;