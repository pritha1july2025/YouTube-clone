import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    youtubeId: { type: String, required: true },
    thumbnail: { type: String, required: true },
    category: { type: String, required: true },

    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: false
    },
 isChannelVideo: {
      type: Boolean,
      default: true
    },
    views: { type: Number, default: 657 },
    likes: { type: Number, default: 45 },
    dislikes: { type: Number, default: 51 },
    comments: [
   {
    text: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      default: 47
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
]
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);
