import { Availability } from '../db/schemas/availability.js'
import User from '../db/schemas/user.js';

export const getAvailability = async (req, res) => {

    try { 
        const userId = req.user.id;
        const availability = await Availability.find({ user: userId });
        res.status(200).json({ avails: availability });
    } catch (error) {
        console.error("Error in getAvailability:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getAvailabilityById = async (req, res) => {
    try {
        const { findAvailability } = req;
        res.status(200).json({ availability: findAvailability });

    } catch (error) {
        console.error("Error in getAvailabilityById:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const createAvailability = async (req, res) => {
    console.log("createAvailability called");

    try {
        const { title, timezone, user } = req.body;

        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }

        const defaultDays = {
            monday: { allDay: false, startTime: '09:00', endTime: '17:00', available: true },
            tuesday: { allDay: false, startTime: '09:00', endTime: '17:00', available: true },
            wednesday: { allDay: false, startTime: '09:00', endTime: '17:00', available: true },
            thursday: { allDay: false, startTime: '09:00', endTime: '17:00', available: true },
            friday: { allDay: false, startTime: '09:00', endTime: '17:00', available: true },
            saturday: { allDay: false, startTime: '', endTime: '', available: false }, 
            sunday: { allDay: false, startTime: '', endTime: '', available: false },
        };
        const newAvailability = new Availability({
            title,
            user: req.user.id,
            days: defaultDays,
            timezone: timezone || 'Asia/Ho_Chi_Minh' 
        });

        const savedAvailability = await newAvailability.save();
        res.status(201).json({ availability: savedAvailability });
    } catch (err) {
        console.error("Error in createAvailability:", err);
        res.status(500).send("Internal server error");
    }
};

export const onboardAvailability = async (req, res) => {
    console.log("onboardAvailability called");

    try {
        const { title, userId, days, timezone } = req.body;
        console.log("title:", title);
        console.log("userId:", userId);
        console.log("days:", days);
        console.log("timezone:", timezone);

        const newAvailability = new Availability({
            title,
            user: userId,
            days,
            timezone
        });

        console.log("newAvailability:", newAvailability);

        const savedAvailability = await newAvailability.save();

        res.status(201).json({
            message: "Availability created successfully",
            availability: savedAvailability,
        });
    } catch (error) {
        console.error("Error in onboardAvailability:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateAvailability = async (req, res) => {
    console.log("updateAvailability called");
    try {
        const { title, days, timezone } = req.body;
        const { findAvailability } = req;

        if (title && typeof title !== "string") {
            return res.status(400).json({ error: "Invalid title" });
        }
        if (days && typeof days !== "object") {
            return res.status(400).json({ error: "Invalid days" });
        }
        if (timezone && typeof timezone !== "string") {
            return res.status(400).json({ error: "Invalid timezone" });
        }

        if (title) findAvailability.title = title;
        if (days) findAvailability.days = days;
        if (timezone) findAvailability.timezone = timezone;

        const updatedAvailability = await findAvailability.save();

        res.status(200).json({ availability: updatedAvailability });
    } catch (error) {
        console.error("Error in updateAvailability:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteAvailability = async (req, res) => {
    try {
        const { findAvailability } = req;
        await Availability.findByIdAndDelete(findAvailability._id);
        res.sendStatus(200);
    } catch (error) {
        console.error("Error in deleteAvailability:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}