import Meeting from "../db/schemas/meetings.js"; 
import User from "../db/schemas/user.js";

// Create a new meeting
export const createMeeting = async (req, res) => {
  try {
    const { title, description, date, time, host, participants, team } = req.body;

    const populatedParticipants = await Promise.all(
      participants.map(async (participant) => {
        const user = await User.findById(participant.user);
        if (!user) {
          throw new Error(`User with ID ${participant.user} not found`);
        }
        return {
          user: participant.user,
          name: user.name,
          role: user.role
        };
      })
    );


    const newMeeting = new Meeting({
      title,
      description,
      date,
      time,
      host,
      participants: populatedParticipants,
      team
    });

    // Save the meeting to the database
    await newMeeting.save();

    return res.status(201).json(newMeeting);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message || "Server error while creating meeting" });
  }
};


export const getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().populate("host").populate("participants.user").populate("team");
    return res.status(200).json(meetings); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error while fetching meetings" });
  }
};
