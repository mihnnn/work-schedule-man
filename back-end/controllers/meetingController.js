import Meeting from "../db/schemas/meetings.js";
import User from "../db/schemas/user.js";

// Create a new meeting
export const createMeeting = async (req, res) => {
  try {
    const {
      meetingTitle,
      meetingDescription,
      meetingDate,
      time,
      host,
      participants,
      team,
    } = req.body;

    const populatedParticipants = await Promise.all(
      participants.map(async (participant) => {
        const user = await User.findById(participant.user);
        if (!user) {
          throw new Error(`User with ID ${participant.user} not found`);
        }
        return {
          user: participant.user,
          name: participant.name,
          role: participant.role,
        };
      })
    );

    const newMeeting = new Meeting({
      meetingTitle,
      meetingDescription,
      meetingDate,
      time: {
        start: time.start,
        end: time.end,
      },
      host,
      participants: populatedParticipants,
      team,
    });

    // Save the new meeting to the database
    await newMeeting.save();

    // Return the newly created meeting
    return res.status(201).json(newMeeting);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: error.message || "Server error while creating meeting" });
  }
};

export const getAllMeetings = async (req, res) => {
  try {
    const teamId = req.params.id;
    const meetings = await Meeting.find({ team: teamId })
      .populate("team")
      .populate("host")
      .populate("participants.user");

    return res.status(200).json(meetings);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Server error while fetching meetings" });
  }
};

export const updateMeeting = async (req, res) => {
  try {
      const meetingId = req.params.id;
      const {
          meetingTitle,
          meetingDescription,
          meetingDate,
          time,
          participants,
          team,
          state, 
      } = req.body;

      if (state) {
          const updatedMeeting = await Meeting.findByIdAndUpdate(meetingId, { state }, { new: true });
          if (!updatedMeeting) {
              return res.status(404).json({ error: 'Meeting not found' });
          }
          return res.status(200).json(updatedMeeting); 
      } else {
          const updateData = {};

          if (participants) {
              const populatedParticipants = await Promise.all(
                  participants.map(async (participant) => {
                      const user = await User.findById(participant.user);
                      if (!user) {
                          throw new Error(`User with ID ${participant.user} not found`);
                      }
                      return {
                          user: participant.user,
                          name: participant.name,
                          role: participant.role,
                      };
                  })
              );
              updateData.participants = populatedParticipants;
          }

          if (meetingTitle) updateData.meetingTitle = meetingTitle;
          if (meetingDescription) updateData.meetingDescription = meetingDescription;
          if (meetingDate) updateData.meetingDate = meetingDate;
          if (time) {
              updateData.time = {
                  start: time.start,
                  end: time.end,
              };
          }
          if (team) updateData.team = team;

          const updatedMeeting = await Meeting.findByIdAndUpdate(meetingId, updateData, { new: true });

          if (!updatedMeeting) {
              return res.status(404).json({ error: 'Meeting not found' });
          }

          return res.status(200).json(updatedMeeting); 
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message || 'Server error while updating meeting' });
  }
};
