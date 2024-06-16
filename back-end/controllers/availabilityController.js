import { Availability } from '../db/schemas/availability.js'
import { User } from '../db/schemas/user.js';

export const getAvailability = async (req, res) => {
    console.log("getAvailability called");

    try { 
        const userId = req.user._id;
        const availability = await Availability.findOne({ user: userId });
        res.status(200).json({ availability });
    } catch (error) {
        console.error("Error in getAvailability:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const createAvailability = async (req, res) => {
    console.log("createAvailability called");

    try {
        const { title } = req.body; 
        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }

        const defaultDays = {
            1: {startTime: '9:00 AM', endTime: '5:00 PM'}, // Monday
            2: {startTime: '9:00 AM', endTime: '5:00 PM'}, // Tuesday
            3: {startTime: '9:00 AM', endTime: '5:00 PM'}, // Wednesday
            4: {startTime: '9:00 AM', endTime: '5:00 PM'}, // Thursday
            5: {startTime: '9:00 AM', endTime: '5:00 PM'}, // Friday
        };

        const newAvailability = new Availability({
            title,
            user: req.user._id,
            days: defaultDays,
            timezone: 'Asia/Ho_Chi_Minh',
        });
        
        const savedAvailability = await newAvailability.save();
        res.status(201).json({ availability: savedAvailability });
    } catch (err) {
        console.error("Error in createAvailability:", err);
        res.status(500).send("Internal server error");
        
    }
}