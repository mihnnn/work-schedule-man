import { Booking } from '../db/schemas/bookings.js';
import cron from 'node-cron';

// Function to update booking state to "past" when current time passes start time
export const updateBookingState = async () => {
    try {
        // Get all upcoming bookings
        const currentDate = new Date();
        const bookings = await Booking.find({ state: "upcoming", startTime: { $lte: currentDate } });

        for (const booking of bookings) {
            // Check if current date is after the start time of the booking
            if (currentDate > new Date(booking.startTime)) {
                if (booking.state === "upcoming") {
                    booking.state = "past";
                }
                await booking.save();

                // Log the updated booking
                console.log(`Updated booking state to "past" for booking with id: ${booking._id}`);
            }
        }
    } catch (error) {
        console.error('Error updating booking state:', error);
        // Handle error or log it appropriately
    }
};

// Schedule task using node-cron (runs every minute)
cron.schedule('* * * * *', async () => {
    await updateBookingState();
});
