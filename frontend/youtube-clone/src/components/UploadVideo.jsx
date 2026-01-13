import { useState } from "react";
import axios from "axios";

export default function UploadVideo({ channelId, onUpload }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const [category, setCategory] = useState("");

  const upload = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:5000/api/videos",
      {
        title,
        description,
        youtubeId,
        category,
        channel: channelId,  
         isChannelVideo: true,
        thumbnail: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    console.log("UPLOAD SUCCESS:", res.data);
    onUpload();
  } catch (err) {
      console.error("UPLOAD ERROR:", err.response?.data || err.message);
      alert("Upload failed");
  }
};
  return (
    <div>
      <div className="upload-card">
        <h3>Upload Video</h3>

        <div className="upload-form">
          <input
            type="text"
            placeholder="Video Title"
            onChange={e => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="YouTube ID (dQw4w9WgXcQ)"
            onChange={e => setYoutubeId(e.target.value)}
          />

          <input
            type="text"
            placeholder="Category (Web Dev, JS, CSS...)"
            onChange={e => setCategory(e.target.value)}
          />

          <textarea
            placeholder="Description"
            onChange={e => setDescription(e.target.value)}
          />

          <button onClick={upload}>Upload</button>
        </div>
      </div>
    </div>
  );
}
