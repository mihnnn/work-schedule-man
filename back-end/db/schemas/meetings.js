import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
  },
  role: {
    type: String, // Can reference the user's role or be stored as a string
  },
});

const meetingSchema = new mongoose.Schema({
  meetingTitle: {
    type: String,
    required: true,
  },
  meetingDescription: {
    type: String,
  },
  meetingDate: {
    type: Date,
    required: true,
  },
  time: {
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    }
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  participants: [participantSchema],
  state: {
    type: String,
    enum: ["upcoming", "past", "canceled"],
    default: "upcoming",
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  }
}, { timestamps: true });


const Meeting = mongoose.model("Meeting", meetingSchema);
export default Meeting;
