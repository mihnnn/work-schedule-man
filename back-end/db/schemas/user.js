import mongoose from "mongoose";

// SCHEMA
const userSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
    },
    username: {
      type: String,
      lowercase: true,
      unique: true,
      require: [true, "Username is required"],
      match: [/^[a-zA-Z0-9_]+$/, "is invalid"],
      index: true,
    },
    password: {
      type: String,
      minlength: 6,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "Email is required"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
    },
    profilePic: {
      type: String,
      default: "",
    },

    // google
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    role: {
      type: String,
      enum: ["Manager", "Employee", "User"],
      default: "User",
    },
    teamMemberships: [
      {
        team: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Team",
        },
        role: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: 'team.roles',
        },
      },
    ],
    hasCompletedBoarding: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
