import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    maker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "Shift Change",
        "Time-Off",
        "Meeting",
        "Work Update",
        "Team Update",
      ],
      required: true,
    },
    date: {
      type: String, // Date, format: YYYY-MM-DD
      required: true,
    },
    details: {
      type: String, 
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Expired"],
      default: "Pending", 
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team", 
      required: true,
    },
    managerAction: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      default: null,
    },
    actionTakenOn: {
      type: String, // Date of action taken format: YYYY-MM-DD
      default: "N/A", 
    },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);
export default Request;
