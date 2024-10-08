
import { Booking } from '../db/schemas/bookings.js';
import User from '../db/schemas/user.js';
import { Event } from '../db/schemas/events.js';

export const getBookings = async (req, res) => {
    try {
        const { state } = req.query; // get sate of query
        const userEmail = req.user.email; // get email of currentUser

        let query = {};
        if (state) {
            query.state = state;
        }

        // find bookings where the currentUser is host/participant
        const bookings = await Booking.find({
            ...query,
            $or: [
                { 'host.email': userEmail },
                { 'participants.email': userEmail }
            ]
        }).populate('event');

        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getBookingById = async (req, res) => {
    try {
        const {findBooking} = req;
        // const { email } = req.query;

        res.status(200).json(findBooking);
    } catch (error) {
        console.error('Error fetching booking by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
}



export const createBookings = async (req, res) => {
    console.log("post booking called, with req body: ", req.body);
    try {
        const { event, host, participants, startTime, endTime, additionalNotes } = req.body;

        const eventDetails = await Event.findById(event);
        if (!eventDetails) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const hostDetails = {
            email: host.email,
            name: host.name,
        };

        const formattedParticipants = [];

        for (const participant of participants) {
            let user;
            // check if email exist in db
            if (participant.email) {
                user = await User.findOne({email : participant.email})
            }
            // if email provided exist in the db, use their details
            if (user) {
                formattedParticipants.push({
                    email: user.email,
                    name: user.displayName
                })
            } else if(participant.email) {
                formattedParticipants.push({
                    email: participant.email,
                    name: ""
                })
            } else {
                return res.status(400).json({ message: 'Please provide email for participants' });
            }
        }

        formattedParticipants.push(hostDetails);

        // Create the booking
        const newBooking = new Booking({
            event,
            host: hostDetails,
            participants: formattedParticipants,
            startTime,
            endTime,
            additionalNotes,
        });


        const savedBooking = await newBooking.save();
        console.log("saved booking: ", savedBooking);
        res.status(201).json(savedBooking);
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