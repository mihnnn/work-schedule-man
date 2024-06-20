import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

    event : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    },
    host : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    participant: {
        type: Array,
        required: true,
        default: [],
    },
    //use to calculate the state of booking: upcoming, past
    confriemdAt: {
        type: Date,
        default: Date.now,
    },
    startTime : {
        type: Date,

    },

    endTime : {
        type: Date,

    },
    state : {
        type: String,
        default: 'upcoming',
    },
}, {timestamps: true});

export const Booking = mongoose.model('Booking', bookingSchema);

    