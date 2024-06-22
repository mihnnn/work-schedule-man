
import { Booking } from '../db/schemas/bookings.js';
import { User } from '../db/schemas/user.js';
import { Event } from '../db/schemas/events.js';


// Function to get bookings with optional state filter

export const getBookings = async (req, res) => {
    try {
        const { state } = req.query; // Get the state from query parameters

        let query = {};
        if (state) {
            query.state = state; // Add state to the query if it exists
        }

        const bookings = await Booking.find(query).populate('event').populate('host');
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


export const createBookings = async (req, res) => {
    try {
        const { event, host, participants, startTime, endTime, additionalNotes } = req.body;

        // Fetch the event to check if it exists
        const eventDetails = await Event.findById(event);
        if (!eventDetails) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Get host details
        const hostDetails = {
            email: host.email,
            name: host.name,
        };



        // Initialize an empty array for formatted participants
        const formattedParticipants = [];

        for (const participant of participants) {
            if (!participant._id) {
                // Case: Participant is not in the database
                formattedParticipants.push({
                    email: participant.email,
                    name: participant.name,
                });
            } else {
                // Case: Participant is in the database
                const user = await User.findById(participant._id);
                if (user) {
                    formattedParticipants.push({
                        email: user.email,
                        name: user.displayName,
                    });
                } else {
                    return res.status(404).json({ message: 'User not found' });
                }
            }
        }

        // Add host as participant if not already in participants
        const hostExistsInParticipants = formattedParticipants.some(participant => participant.email === hostDetails.email);
        if (!hostExistsInParticipants) {
            formattedParticipants.push(hostDetails);
        }

        // Create the booking
        const newBooking = new Booking({
            event,
            host: hostDetails,
            participants: formattedParticipants,
            startTime,
            endTime,
            additionalNotes,
        });

        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// cancel booking
export const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { cancelReason } = req.body;

        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.state === 'canceled') {
            return res.status(400).json({ message: 'Booking already canceled' });
        }
        booking.state = 'canceled';
        await booking.save();
        res.status(200).json({
            message: 'Booking canceled successfully',
            booking,
            cancelReason,
        });
    }
    catch (error) {
        console.error('Error canceling booking:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// reschedule booking
export const rescheduleBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { startTime, endTime, rescheduleReason } = req.body;

        if (!startTime || !endTime) {
            return res.status(400).json({ message: 'Please provide start and end time' });
        }

        if (startTime >= endTime) {
            return res.status(400).json({ message: 'End time must be greater than start time' });
        }

        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.startTime = startTime;
        booking.endTime = endTime;
        booking.rescheduleReason = rescheduleReason;

        await booking.save();
        res.status(200).json(booking);
    } catch (error) {
        console.error('Error rescheduling booking:', error);
        res.status(500).json({ message: 'Server error' });
    }
};