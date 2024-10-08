import { Event } from "../db/schemas/events.js";
import User from "../db/schemas/user.js";

export const getEvents = async (req, res) => {
  console.log("getEvents called");
  try {
    const userId = req.user.id;
    console.log("userId (getEvents):", userId);
    const events = await Event.find({ organizer: userId });
    res.status(200).json({ events });
  } catch (error) {
    console.error("Error in getEvents:", error.message);
    res.status(500).json({ error: "Internal server error (getEvents)" });
  }
};

export const getEventsById = async (req, res) => {
  try {
    const { findEvent } = req;
    res.status(200).json(findEvent);
  } catch {
    console.error("Error in getEventsById:", error.message);
    res.status(500).json({ error: "Internal server error(geteventbyid)" });
  }
};

export const getEventBySuffix = async (req, res) => {
  try {
    const { username, suffix } = req.params;
    const user = await User.findOne({username});

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const event = await Event.findOne({ suffix, organizer: user._id});
    
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({
      id: event._id,
      title: event.title,
      description: event.description,
      duration: event.duration,
  
    });
  } catch (error) {
    console.error("Error in getEventBySuffix:", error.message);
    res.status(500).json({ error: "Internal server error (geteventbysuffix)" });
  }
}

export const getPublicUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { displayName, profilePic, email } = user;
    res.status(200).json({ username, displayName, profilePic, email  });
  } catch (error) {
    console.error("Error in getPublicUser:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getPublicEvents = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Find events by user ID
    const events = await Event.find({ organizer: user._id });

    if (!events || events.length === 0) {
      return res
        .status(404)
    }

    // Map and return the events
    res.status(200).json({
      events: events.map((event) => {
        const { _id, title, description, duration, suffix } = event;
        return { _id, title, description, duration, suffix };
      }),
    });
  } catch (error) {
    console.error("Error in getPublicEvents:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPublicEventById = async (req, res) => {
  try {
    const{ findEvent } = req;
    if (!findEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({  
      id: findEvent._id,
      title: findEvent.title,
      description: findEvent.description,
      duration: findEvent.duration,
      suffix: findEvent.suffix,
    })
  } catch (error) {
    console.error("Error in getPublicEventById:", error.message);
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

    const userId = req.user.id;
    const user = await User.findById(userId).select("username").exec();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      // console.log("username:", user.username);
    }

    const username = user.username;
    const organizerId = user._id;
    
    const URL = `https://wsm.com/${username}/${suffix}`;

    const newEvent = new Event({
      title,
      suffix,
      description,
      duration,
      URL,
      organizer: organizerId,
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

    if (title && typeof title !== "string") {
      return res.status(400).json({ error: "Invalid title" });
    }
    if (description && typeof description !== "string") {
      return res.status(400).json({ error: "Invalid description" });
    }
    if (duration && typeof duration !== "number") {
      return res.status(400).json({ error: "Invalid duration" });
    }
    if (suffix && typeof suffix !== "string") {
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
