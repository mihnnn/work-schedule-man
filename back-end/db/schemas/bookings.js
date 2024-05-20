import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    event : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        default: [],
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    confriemdAt: {
        type: Date,
        default: Date.now,
    },
    startTime : {
        type: Date,
        required: true,
    },
    //end time = startTime + duration
    endTime : {
        type: Date,
        required: true,
    },
}, {timestamps: true});

export const Booking = mongoose.model('Booking', bookingSchema);

    