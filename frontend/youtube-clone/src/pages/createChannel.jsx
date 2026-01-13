import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateChannel() {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login again");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/channels",
        {
          name: channelName,       
          description,
          banner,
          logo: ""  
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

  
      navigate("/channel/me");

    } catch (err) {
  const message = err.response?.data?.message;

  console.error("CREATE CHANNEL ERROR:", message || err.message);

  // If channel already exists, it will go to user's channel
  if (message === "Channel already exists") {
    navigate("/channel/me");
    return;
  }

  alert(message || "Channel creation failed");
}
  };

  return (
    <div className="create-channel-page">
      <div className="create-channel-box">
        <h2>Create Your Channel</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Channel Name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Channel Banner URL"
            value={banner}
            onChange={(e) => setBanner(e.target.value)}
          />

          <textarea
            placeholder="Channel Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <button type="submit">Create Channel</button>
        </form>
      </div>
    </div>
  );
}
