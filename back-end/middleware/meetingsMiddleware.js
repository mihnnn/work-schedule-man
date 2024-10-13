import Meeting from '../db/schemas/meetings.js';
import cron from 'node-cron';

export const updateMeetingState = async () => {
    try {
        const currentDate = new Date();

        const meetings = await Meeting.find({ state: "upcoming" });

        for (const meeting of meetings) {
            const meetingStartDateTime = new Date(meeting.meetingDate);
            meetingStartDateTime.setHours(
                parseInt(meeting.time.start.split(':')[0]), 
                parseInt(meeting.time.start.split(':')[1])
            );

            // console.log(`meetingStartDateTime: ${meetingStartDateTime}`);

            if (currentDate > meetingStartDateTime) {
                if (meeting.state === "upcoming") {
                    meeting.state = "past";
                }
                await meeting.save();

                console.log(`Updated meeting state to "past" for meeting with id: ${meeting._id}`);
            }
        }
    } catch (error) {
        console.error('Error updating meeting state:', error);
    }
};

cron.schedule('* * * * *', async () => {
    await updateMeetingState();
});
