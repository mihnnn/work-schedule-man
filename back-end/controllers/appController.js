import { Event } from '../db/schemas/events.js'; // Ensure correct import path

export const getEvents = async (req, res) => {
    console.log('getEvents called');
    try {
        console.log('User ID:', req.user._id);
        const userId = req.user._id;
        const events = await Event.find({ organizer: userId });
        console.log('Events found:', events);
        res.status(200).json({ events });
    } catch (error) {
        console.error("Error in getEvents:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const createEvent = async (req, res) => {
    console.log('createEvent called');
    try {
        const { title, description, duration, suffix } = req.body;
        console.log('Request body:', req.body);

        if (!title || !duration || !suffix) {
            console.error('Missing required fields');
            return res.status(400).send("Bad request: Missing required fields");
        }

        const username = req.user.username;
        const URL = `https://wsm.com/${username}/${suffix}`;
        console.log('Generated URL:', URL);

        const newEvent = new Event({
            title,
            description,
            duration,
            URL,
            organizer: req.user._id
        });

        const savedEvent = await newEvent.save();
        console.log('Event saved:', savedEvent);
        res.status(201).json(savedEvent);
    } catch (err) {
        console.error('Error in createEvent:', err);
        res.status(500).send("Internal server error");
    }
};
