import mongoose from "mongoose";

// Define a sub-schema for participants
const participantSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
}, { _id: false });

// Define the main booking schema
const bookingSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    host: {
        email: {
            type: String,
            required: true,
        }, 
        name: {
            type: String,
            required: true,
        }
    },
    participants: {
        type: [participantSchema],
        required: true,
        default: [],
    },
    confirmedAt: {
        type: Date,
        default: Date.now,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    state: {
        type: String,
        enum: ['upcoming', 'past', 'canceled'],
        default: 'upcoming',
    },
    additionalNotes: {
        type: String,
        default: '',
    },
    cancelReason: {
        type: String,
        default: '',
    },
    rescheduleReason: {
        type: String,
        default: '',
    },
    rescheduledAt: {
        type: Date,
    },
    
}, { timestamps: true });

export const Booking = mongoose.model('Booking', bookingSchema);

