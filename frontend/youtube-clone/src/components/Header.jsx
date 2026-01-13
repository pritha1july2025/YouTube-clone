import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import ytLogo from "../assets/YouTube_Logo_2017.svg";

export default function Header({ toggleSidebar }) {
  const [search, setSearch] = useState("");
  const [hasChannel, setHasChannel] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const checkChannel = async () => {
      const token = localStorage.getItem("token");
      if (!user || !token) return;
      try {
        await axios.get("http://localhost:5000/api/channels/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setHasChannel(true);
      } catch (err) {
        setHasChannel(false);
      }
    };

    checkChannel();
  }, [user]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/?search=${search}`);
  };

  return (
    <header className="header">
      
      {/* LEFT */}
      <div className="header-left">
        <button className="menu-btn" onClick={toggleSidebar}>☰</button>

        <Link to="/" className="logo">
          <img src={ytLogo} alt="YouTube" className="logo-img" />
        </Link>
      </div>

      {/* CENTER */}
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>

      {/* RIGHT */}
      <div className="header-right">
        {!user && (
          <Link to="/login" className="signin-btn">
            👤 Sign in
          </Link>
        )}

        {user && !hasChannel && (
          <Link to="/create-channel" className="create-channel-btn">
            ➕ Create Channel
          </Link>
        )}

        {user && (
          <>
          
            <Link to="/channel/me" className="avatar-circle">
              {user.username?.charAt(0).toUpperCase()}
            </Link>

            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}
