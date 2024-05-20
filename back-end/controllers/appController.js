import { User } from "../db/schemas/user.js"
import { Event } from "../db/schemas/events.js"
import { Booking } from "../db/schemas/bookings.js"

export const getEvents = async (req, res) => {
    res.send("get events controller");
}

export const createEvent = async (req, res) => {
    // const { params: { id } } = req;
    const newEvent = new Event(req.body);

    try {
        const savedEvent = await newEvent.save();
        res.status(201).send(savedEvent);
    } catch (err) {
        console.log(err);
        res.status(400).send("bad req")
    }
}
