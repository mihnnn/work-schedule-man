import { Event } from "../db/schemas/events.js";

export const resolveIndexByEventId = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    console.log("id:", id);

    const findEvent = await Event.findById(id).exec();

    if (!findEvent) return res.status(404).send("Event not found");

    req.findEvent = findEvent;
    next();
  } catch (error) {
    console.error("Error in resolveIndexByEventId middleware:", error);
    return res.status(500).send("Internal Server Error");
  }
};
