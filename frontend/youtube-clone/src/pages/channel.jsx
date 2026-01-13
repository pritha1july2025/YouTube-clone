import { useEffect, useState } from "react";
import axios from "axios";
import ChannelHeader from "../components/ChannelHeader";
import UploadVideo from "../components/UploadVideo";
import VideoCard from "../components/VideoCard";

export default function Channel() {
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // 🔹 Fetch channel + videos
  const fetchChannel = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/channels/me",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setChannel(res.data.channel);
      setVideos(res.data.videos);
    } catch (err) {
      console.error(err);
      setChannel(null);
    } finally {
      setLoading(false);
    }
  };

  //  Delete video
  const deleteVideo = async (videoId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/videos/${videoId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      fetchChannel(); 
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete video");
    }
  };

  useEffect(() => {
    fetchChannel();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

  if (!channel) {
    return <h2 style={{ padding: 20 }}>No channel found</h2>;
  }

  return (
    <div style={{ padding: "16px" }}>
      {/* Channel Header */}
      <ChannelHeader channel={channel} />

      {/*  Upload Video */}
      <UploadVideo
        channelId={channel._id}
        onUpload={fetchChannel}
      />


      <h2 style={{ marginTop: "20px" }}>Your Videos</h2>

     
      {/*  Video List */}
      <div className="video-grid">
        {videos.length === 0 ? (
          <p>No videos uploaded yet</p>
        ) : (
          videos.map((video) => (
            <div key={video._id} className="channel-video-card">
              <VideoCard video={video} />

              <button
                className="delete-btn"
                onClick={() => deleteVideo(video._id)}
              >
                🗑 Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
