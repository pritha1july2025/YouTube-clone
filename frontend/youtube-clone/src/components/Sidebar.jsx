import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ show }) {
  return (
    <aside className={`sidebar ${show ? "" : "collapsed"}`}>
      <Link to="/" className="sidebar-item">
        🏠 {show && "Home"}
      </Link>
      <div className="sidebar-item">  🎬 {show && "Shorts"}</div>
      <div className="sidebar-item">📺 {show && "Subscriptions"}</div>

      <hr />
      <div className="sidebar-title">{show && "You"}</div>
      <div className="sidebar-item">📜 {show && "History"}</div>
      <div className="sidebar-item">🎵 {show && "Playlists"}</div>
      <div className="sidebar-item">⏰ {show && "Watch Later"}</div>
      <div className="sidebar-item">👍 {show && "Liked Videos"}</div>
       <div className="sidebar-item">⬇️ {show && "Downloads"}</div>
      <div className="sidebar-item">📹 {show && "Your Videos"}</div>

      <hr />
      <div className="sidebar-title">{show && "Explore"}</div>
      <div className="sidebar-item">🎶 {show && "Music"}</div>
       <div className="sidebar-item">🛍 {show && "Shopping"}</div>
      <div className="sidebar-item">🎥 {show && "Movies"}</div>

      <hr />
      
     <div className="sidebar-title"> {show && "More from YouTube"}</div>     
       <div className="sidebar-item">▶️ {show && "YouTube Premium"}</div>
       <div className="sidebar-item">🧑‍💻 { show &&"YouTube Studio"}</div>
       <div className="sidebar-item">🎧{ show && "YouTube Music"}</div>
       <div className="sidebar-item">🧒  {show && "YouTube Kids"}</div>
  <hr />

      <div className="sidebar-item">⚙️ {show && "Settings"}</div>
      <div className="sidebar-item">❓ {show && "Help"}</div>
       <div className="sidebar-item">💬 {show && "Send feedback"}</div>
        <div className="sidebar-item">🚩 { show && "Report history"}</div>
        
    </aside>
  );
}

