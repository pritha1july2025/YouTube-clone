import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";
import CommentSection from "../components/CommentSection";


export default function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
const [recommended, setRecommended] = useState([]);

  const token = localStorage.getItem("token");

 const fetchVideo = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/videos/${id}`
    );
    setVideo(res.data);

    //  fetch recommended videos
    const allVideos = await axios.get(
      "http://localhost:5000/api/videos"
    );

    // filter current video
    const filtered = allVideos.data.filter(
      (v) => v._id !== id
    );

    setRecommended(filtered.slice(0, 7));
  } catch (err) {
    console.error(err);
  }
};


  const like = async () => {
    await axios.put(
      `http://localhost:5000/api/videos/${id}/like`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchVideo();
  };

  const dislike = async () => {
    await axios.put(
      `http://localhost:5000/api/videos/${id}/dislike`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchVideo();
  };

  useEffect(() => {
    fetchVideo();
  }, [id]);

  if (!video) return <p>Loading...</p>;

  return (

  <div className="video-page">
    {/* Video + details + comments */}
    <div className="video-main">
      <div className="video-wrapper">
        <iframe
          width="100%"
          height="480"
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <h2>{video.title}</h2>

      <p style={{ color: "#606060" }}>
        <strong>{video.channelName}</strong> • {video.views} views
      </p>

      <p>{video.description}</p>

      <div className="video-actions">
        <button className="like" onClick={like}>
          👍 {video.likes}
        </button>
        <button className="dislike" onClick={dislike}>
          👎 {video.dislikes}
        </button>
      </div>

      <CommentSection videoId={id} />
    </div>

    {/*Recommended videos */}
    <div className="video-recommended">
      <h3>Recommended</h3>

      

      {recommended.map((v) => (
  <Link
    to={`/video/${v._id}`}
    key={v._id}
    className="recommended-card"
  >
    <img src={v.thumbnail} alt={v.title} />
    <div>
      <p className="title">{v.title}</p>
      <p className="channel">{v.channelName}</p>
    </div>
  </Link>
))}

    </div>
  </div>
);

  
}
