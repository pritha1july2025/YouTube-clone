import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";


export default function MainLayout({ children }) {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <>
      <Header toggleSidebar={() => setShowSidebar(!showSidebar)} />

      <div className="page">
        <Sidebar show={showSidebar} />

        <main
          className={`content ${showSidebar ? "with-sidebar" : "full-width"}`}
        >
          {children}
        </main>
      </div>
    </>
  );
}
