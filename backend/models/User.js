import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default: ""
    },    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      default: null
    }
  },  { timestamps: true }
);
export default mongoose.model("User", userSchema);
