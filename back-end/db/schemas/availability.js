import mongoose from "mongoose";

// Availability created by user 
const availabilitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    days: {
        type: Map,
        of: {
            startTime: String,
            endTime: String,
        },
        default: {}
    },
    timezone: {
        type: String,
        default: 'Asia/Ho_Chi_Minh'
    }
}, { timestamps: true });


export const Availability = mongoose.model('Availability', availabilitySchema);
