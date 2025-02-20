import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
    },
    userId: {
      type: String,
      required: [true, "Please enter your Unqiue userId"],
      unique: true,
    },
    about: {
      type: String,
      default: "",
    },
    squad: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: 6,
    },
    number: {
      type: Number,
      required: [true, "Please enter your number"],
      maxlength: 10,
    },
    location: {
      type: String,
      required: [true, "Please enter your location"],
    },
    gender: {
      type: String,
      required: [true, "Please enter your gender"],
      eunm: ["Male", "Female", "Other"],
    },
    profileImage: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
    },
    // this is required for delete existing image when user update/delete profile image
    filename: {
      type: String,
    },
    github: {
      type: String,
      default: "",
    },
    linkedin: {
      type: String,
      default: "",
    },
    portfolio: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
    skills: [
      {
        type: String,
      },
    ],
    interestedIn: [
      {
        type: String,
      },
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    feedbacks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
      },
    ],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
