import Comment from "../models/Comment.js";

// Add comment
export const addComment = async (req, res) => {
  try {
    const comment = new Comment({
      videoId: req.params.videoId,
      user: req.user.id,
      text: req.body.text
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get comments 
export const getVideoComments = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId })
      .populate("user", "username")
      .sort({ createdAt: -1 });
      res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
 
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not allowed to modify this comment" });
    }
    await comment.deleteOne();
    res.json({ message: "Comment Deleted" });
  } catch (error) {
    console.error("DELETE COMMENT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
//Update Comment

  export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not Found" });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not allowed to modify this Comment" });
    }

    comment.text = req.body.text;
    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
