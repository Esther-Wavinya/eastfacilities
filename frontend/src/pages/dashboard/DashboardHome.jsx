// import React from "react";
import Navbar from "../../shared/Navbar.jsx";


export default function DashboardHome() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top Navigation */}
      <Navbar />

      {/* Main Dashboard Content */}
      <main className="flex-grow-1 p-4" style={{ backgroundColor: "#f8f9fa" }}>
        <h1 className="mb-4">Welcome to Dashboard</h1>
        <p>This is your dashboard home page content.</p>
        {/* Add more components / widgets here */}
      </main>
    </div>
  );
}

