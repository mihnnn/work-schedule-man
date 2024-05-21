import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    email: {
        type: String,
        unique: true,
    },
    profilePic: {
        type: String,
        default: '',
    },
    //Member since => user.createdAt
}, {timestamps: true});

export const User = mongoose.model('User', userSchema);

