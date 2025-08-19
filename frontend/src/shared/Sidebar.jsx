import React from "react";
import { FiUser, FiHome, FiBarChart2 } from "react-icons/fi";
import logo from "../assets/images/logo.png";

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-white shadow flex flex-col">
      {/* Top: Logo + Title */}
      <div className="flex items-center gap-3 px-6 py-4 border-b">
        <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
        <span className="text-xl font-semibold text-gray-800">
          EAST Facilities
        </span>
      </div>

      {/* Navigation items */}
      <nav className="flex flex-col mt-6">
        <SidebarItem icon={<FiUser />} label="Profile" />
        <SidebarItem icon={<FiHome />} label="Facilities" />
        <SidebarItem icon={<FiBarChart2 />} label="Dashboard Stats" />
      </nav>
    </aside>
  );
}

// Reusable SidebarItem component
function SidebarItem({ icon, label }) {
  return (
    <button className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition">
      <span className="text-xl">{icon}</span>
      <span className="text-md font-medium">{label}</span>
    </button>
  );
}
