import React from "react";
import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  return (
    <Link to={`/video/${video._id}`} className="video-card">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="thumbnail"
      />

      <div className="video-info">
        <h4 className="video-title" >{video.title } ✍</h4>
<p className="channel-name">
  {video.channel?.channelName}
</p>       
 <p className="views">
  {video.views} views •{" "}
  {video.createdAt
    ? new Date(video.createdAt).toDateString()
    : "Recently uploaded"}      
</p>

      </div>
    </Link>
  );
}
