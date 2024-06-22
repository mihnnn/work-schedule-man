import { Booking } from "../db/schemas/bookings.js";

export const resolveIndexByBookingId = async (req, res, next) => {
    try {
        const {
            params: { id },
        } = req;
        console.log("booking id:", id);

        const findBooking = await Booking.findById(id).exec();

        if (!findBooking) return res.status(404).send("Booking not found");

        req.findBooking = findBooking;
        next();

    } catch (error) {
        console.error("Error in resolveIndexByBookingId middleware:", error);
        return res.status(500).send("Internal Server Error");
    }
}