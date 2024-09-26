import mongoose from "mongoose";

// Define the role schema
const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "New Role", 
    },
    description: {
      type: String,
      default: "",
    },
  },
  { _id: true }
);

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    teamCode: {
      type: String,
      unique: true,
      required: true,
    },
    managers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    roles: {
      type: [roleSchema], // Embed the roles schema here as an array
      default: [],
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: mongoose.Schema.Types.ObjectId,
        },
        status: {
          type: String,
          enum: ["Active", "Off Duty"],
        },
      },
    ],
    schedules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Schedule",
      },
    ],
    meetings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meeting",
      },
    ],
    requests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Request",
      },
    ],
    activities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ActivityLog",
      },
    ],
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);
export default Team;
