import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    channelName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    logo: {
      type: String,
      default: ""
    },

    banner: {
      type: String,
      default: ""
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    subscribers: {
      type: Number,
      default: 0
    }
  },{ timestamps: true });

export default mongoose.model("Channel", channelSchema);
