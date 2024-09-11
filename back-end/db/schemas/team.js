import mongoose from "mongoose";

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
      },
    ],
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);
export default Team;