import mongoose from "mongoose";

const MONGO_URL = "mongodb://127.0.0.1:27017/youtube_clone";

export const connectDB = async () => {
  await mongoose.connect(MONGO_URL);
  console.log("MongoDB Connected");
};
