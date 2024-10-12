import mongoose from "mongoose";

const assignedEmployeeSchema = new mongoose.Schema({
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
    type: String, // Could also reference the role schema if needed
    required: true,
  },
}, { _id: false });

const assignedDaysSchema = new mongoose.Schema({
  mon: { type: Boolean, default: false },
  tue: { type: Boolean, default: false },
  wed: { type: Boolean, default: false },
  thu: { type: Boolean, default: false },
  fri: { type: Boolean, default: false },
  sat: { type: Boolean, default: false },
  sun: { type: Boolean, default: false },
}, { _id: false });

const scheduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    time: {
      type: String, // "HH:mm - HH:mm" format
      required: true,
    },
    assignedDays: assignedDaysSchema, 
    assignedEmployees: [assignedEmployeeSchema], 
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
  },
  { timestamps: true }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);
export default Schedule;
