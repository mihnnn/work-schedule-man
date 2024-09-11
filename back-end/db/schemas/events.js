import mongoose from 'mongoose';

// types of locations
const locationTypes = {
    CONFERENCE: 'conference',
    ORGANIZER_ADDRESS: 'organizer_address',
    ATTENDEE_ADDRESS: 'attendee_address'
};

// Location schema
const locationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: Object.values(locationTypes),
        required: true,
    },
    details: {
        type: String, 
        required: true,
    }
});

// Event schema
const eventSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
    }, 
    description: {
        type: String, 
    },
    duration: {
        type: Number,
        required: true,
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // reference to user model
        required: true,
    },
    suffix: {
        type: String,
        required: true,
    },
    URL: {
        type: String,
    },
    location: {
        type: [locationSchema],
        default: [],
    }
}, {timestamps: true});

export const Event = mongoose.model('Event', eventSchema);
