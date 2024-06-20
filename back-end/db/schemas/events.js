import mongoose from 'mongoose';

// Enum for location types
const locationTypes = {
    CONFERENCE: 'conference',
    ORGANIZER_ADDRESS: 'organizer_address',
    ATTENDEE_ADDRESS: 'attendee_address'
};

// Define the schema for location
const locationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: Object.values(locationTypes),
        required: true,
    },
    details: {
        type: String, // This can be a URL for conference or an address for in-person
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
