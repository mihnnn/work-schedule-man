import { Event } from "../db/schemas/events.js";

export const getEvents = async (req, res) => {
  console.log("getEvents called");
  try {
    const userId = req.user._id;
    const events = await Event.find({ organizer: userId });
    res.status(200).json({ events });
  } catch (error) {
    console.error("Error in getEvents:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//find event by id given to query params
export const getEventsById = async (req, res) => {
    try {
      const { findEvent } = req;
      res.status(200).json(findEvent);
    } catch {
      console.error("Error in getEventsById:", error.message);
      res.status(500).json({ error: "Internal server error" });
    
    }
}

export const createEvent = async (req, res) => {
  try {
    const { title, description, duration, suffix } = req.body;
    if (!title || !duration || !suffix) {
      console.error("Missing required fields");
      return res.status(400).send("Bad request: Missing required fields");
    }

    const username = req.user.username;
    const URL = `https://wsm.com/${username}/${suffix}`;

    const newEvent = new Event({
      title,
      suffix,
      description,
      duration,
      URL,
      organizer: req.user._id,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    console.error("Error in createEvent:", err);
    res.status(500).send("Internal server error");
  }
};

export const updateEvent = async (req, res) => {
  console.log("updateEvent called");
  try {
    const { title, description, duration, suffix } = req.body;
    const { findEvent } = req;

    if (title && typeof title !== 'string') {
      return res.status(400).json({ error: "Invalid title" });
    }
    if (description && typeof description !== 'string') {
      return res.status(400).json({ error: "Invalid description" });
    }
    if (duration && typeof duration !== 'number') {
      return res.status(400).json({ error: "Invalid duration" });
    }
    if (suffix && typeof suffix !== 'string') {
      return res.status(400).json({ error: "Invalid suffix" });
    }

    if (title) findEvent.title = title;
    if (description) findEvent.description = description;
    if (duration) findEvent.duration = duration;
    if (suffix) findEvent.suffix = suffix;

    const updatedEvent = await findEvent.save();

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error in updateEvent:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const deleteEvent = async (req, res) => {
  try {
    const { findEvent } = req;
    await Event.findByIdAndDelete(findEvent._id);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error in deleteEvent:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
