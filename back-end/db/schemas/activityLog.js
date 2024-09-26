import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Team", "Schedule", "Remind"], 
      required: true,
    },
    notice: {
      type: String, 
      required: true,
    },
    date: {
      type: String, // "YYYY-MM-DD" format
      required: true,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
  },
  { timestamps: true }
);

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);
export default ActivityLog;
