import Video from "../models/Video.js";
import Channel from "../models/Channel.js";


// GET all videos
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find({ isChannelVideo: false })
      .sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET video by ID
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate("channel", "channelName");

    if (!video) {
      return res.status(404).json({ message: "Videos not found" });
    }

    res.json(video);
  } catch (error) {
    console.error("GET VIDEO ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// UPLOAD video

export const uploadVideo = async (req, res) => {
  try {
    const channel = await Channel.findById(req.body.channel);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const video = new Video({
      title: req.body.title,
      description: req.body.description,
      youtubeId: req.body.youtubeId,
      thumbnail: req.body.thumbnail,
      category: req.body.category,
      channel: channel._id,
       isChannelVideo: true
    });

    await video.save();
    res.status(201).json(video);
  } catch (error) {
    console.error("UPLOAD VIDEO ERROR:", error);
    res.status(500).json({ message: "Video upload failed" });
  }
};


// DELETE video
export const deleteVideo = async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: "Video deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LIKE video
export const likeVideo = async (req, res) => {
  const video = await Video.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: 1 } },
    { new: true }
  );
  res.json(video);
};

// DISLIKE video
export const dislikeVideo = async (req, res) => {
  const video = await Video.findByIdAndUpdate(
    req.params.id,
    { $inc: { dislikes: 1 } },
    { new: true }
  );
  res.json(video);
};
//ADD COMMENT  

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment text required" });
    }

    const video = await Video.findById(req.params.videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    video.comments.push({
      user: req.user.id,
      text
    });

    await video.save();

    res.status(201).json(video.comments);
  } catch (err) {
    console.error("ADD COMMENT ERROR:", err);
    res.status(500).json({ message: "Failed to add comment" });
  }
};
// EDIT COMMENT
export const editComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { videoId, commentId } = req.params;

    if (!text) {
      return res.status(400).json({ message: "Comment text required" });
    }

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const comment = video.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to modify this comment" });
    }

    comment.text = text;
    await video.save();

    res.json({ message: "Comment updated", comments: video.comments });
  } catch (err) {
    console.error("EDIT COMMENT ERROR:", err);
    res.status(500).json({ message: "You are not authorized to modify this comment" });
  }
};
//DELETE COMMENT
export const deleteComment = async (req, res) => {
  try {
    const { videoId, commentId } = req.params;

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const comment = video.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to delete this comment" });
    }

    comment.remove();
    await video.save();

    res.json({ message: "Comment deleted", comments: video.comments });
  } catch (err) {
    console.error("DELETE COMMENT ERROR:", err);
    res.status(500).json({ message: "Failed to delete comment" });
  }
};
