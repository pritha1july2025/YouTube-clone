import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import CategoryBar from "../components/CategoryBar";
import "../styles/app.css";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

    const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch("http://localhost:5000/api/videos");
      const data = await res.json();
      setVideos(data);
    };
    fetchVideos();
  }, []);

 //  FILTER BY CATEGORY + SEARCH
  const filteredVideos = videos.filter((video) => {
    const matchesCategory =
      selectedCategory === "All" ||
       (video.category && video.category === selectedCategory);

    const matchesSearch = video.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });
  
console.log("VIDEOS FROM API:", videos);

  return (
    <div className="home">
      <CategoryBar
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <h2 className="section-title">Recommended Videos</h2>
      <div className="video-grid">
        {filteredVideos.length === 0 ? (
          <p>No videos found</p>
        ) : (
          filteredVideos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))
        )}
      </div>
    </div>
  );
}
