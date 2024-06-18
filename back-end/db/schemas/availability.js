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
            startTime: {
                type: String,
                default: '9:00 AM'
            },
            endTime: {
                type: String,
                default: '5:00 PM'
            }
        },
        default: {
            0: { startTime: '9:00 AM', endTime: '5:00 PM' },
            1: { startTime: '9:00 AM', endTime: '5:00 PM' },
            2: { startTime: '9:00 AM', endTime: '5:00 PM' },
            3: { startTime: '9:00 AM', endTime: '5:00 PM' },
            4: { startTime: '9:00 AM', endTime: '5:00 PM' }
        }
    },
    timezone: {
        type: String,
        default: 'Asia/Ho_Chi_Minh'
    }
}, { timestamps: true });


export const Availability = mongoose.model('Availability', availabilitySchema);