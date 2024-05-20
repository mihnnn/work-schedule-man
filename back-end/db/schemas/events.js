import mongoose from 'mongoose';

//event created in schedule by user
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
    //defaults to be user who created the event
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', //reference to user model
        required: true,
    },

    //createdAt, updatedAt => event.createdAt
}, {timestamps: true});

export const Event = mongoose.model('Event', eventSchema);
