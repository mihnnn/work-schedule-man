import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String, // Can reference the user's role or be stored as a string
    required: true,
  },
});

const meetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String, // format "HH:mm - HH:mm"
      required: true,
    },
    host: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
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
      ref: "Team",
      required: true,
    },
  },
  { timestamps: true }
);

const Meeting = mongoose.model("Meeting", meetingSchema);
export default Meeting;
