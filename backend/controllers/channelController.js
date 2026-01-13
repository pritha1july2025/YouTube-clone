import Channel from "../models/Channel.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

/* =========================
   CREATE CHANNEL
========================= */

export const createChannel = async (req, res) => {
  try {
     
    const { name, description, banner, logo } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "Enter All Fields" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.channel) {
      return res.status(400).json({ message: "Channel already exists" });
    }

    const channel = await Channel.create({
      channelName: name,
      description,
      banner: banner || "",
      logo: logo || "",
      owner: user._id
    });

    user.channel = channel._id;
    await user.save();

    res.status(201).json(channel);
  } catch (err) {
    console.error("CREATE CHANNEL ERROR:", err);
    res.status(500).json({ message: "Failed to create channel" });
  }
};

/* =========================
   GET MY CHANNEL
========================= */
export const getMyChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({ owner: req.user.id });

    if (!channel) {
      return res.status(404).json({ message: "No channel found" });
    }

    const videos = await Video.find({ channel: channel._id })
      .populate("channel", "channelName")
      .sort({ createdAt: -1 });

    res.json({ channel, videos });
  } catch (error) {
    console.error("GET MY CHANNEL ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
