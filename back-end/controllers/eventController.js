import { Event } from '../db/schemas/events.js';

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
            suffix,
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

export const deleteEvent = async (req, res) => {
    console.log('deleteEvent called');
    try {
        const { eventId } = req.params.id;
        console.log('Event ID:', eventId);

        const deletedEvent = await Event.findByIdAndDelete(eventId);
        console.log('Deleted event:', deletedEvent);
        res.status(200).json(deletedEvent);
    } catch (err) {
        console.error('Error in deleteEvent:', err);
        res.status(500).send("Internal server error");
    }
}
