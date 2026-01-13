import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VideoPlayer from "./pages/VideoPlayer";
import Channel from "./pages/channel";
import MainLayout from "./layout/MainLayout";
import CreateChannel from "./pages/createChannel";
import React from "react";

export default function App() {
  return (
    <Routes>
      {/* Pages WITH header + sidebar */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/video/:id"
        element={
          <MainLayout>
            <VideoPlayer />
          </MainLayout>
        }
      />

      <Route
        path="/channel/me"
        element={
          <MainLayout>
            <Channel />
          </MainLayout>
        }
      />

      {/* Pages WITHOUT sidebar */}
      <Route path="/create-channel" element={<CreateChannel />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
console.log("Frontend app loaded");