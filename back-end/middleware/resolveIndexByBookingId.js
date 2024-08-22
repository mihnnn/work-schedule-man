import { Booking } from "../db/schemas/bookings.js";

export const resolveIndexByBookingId = async (req, res, next) => {
    try {
        console.log("req.params:", req.params); // Log the entire req.params object

        const {
            params: { id },
        } = req; // Use 'id' instead of '_id'
        console.log("booking id:", id);

        if (!id || id === 'null') {
            return res.status(400).send("Invalid booking ID");
        }

        const findBooking = await Booking.findById(id).exec();

        if (!findBooking) return res.status(404).send("Booking not found");

        req.findBooking = findBooking;
        next();

    } catch (error) {
        console.error("Error in resolveIndexByBookingId middleware:", error);
        return res.status(500).send("Internal Server Error");
    }
}
