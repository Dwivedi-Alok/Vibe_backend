import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"], // restrict to specific values
      default: "other",
    },
    isActive: {
      type: Boolean,
      default: false, // false by default, true when logged in/online
    },
    lastSeen: {
      type: Date,
      default: Date.now, // records last activity timestamp
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
