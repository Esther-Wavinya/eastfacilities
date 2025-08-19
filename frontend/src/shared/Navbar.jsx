import React from "react";
import { FiSearch, FiBell, FiMessageSquare } from "react-icons/fi";
import logo from "../assets/images/logo.png";
import avatar from "../assets/images/avatar.jpg";

export default function Navbar() {
  return (
    <nav className="w-full h-16 bg-white shadow flex items-center justify-between px-6">
      {/* Left section: Logo + Title */}
      <div className="flex items-center gap-3">
        <img 
          src={logo}
          alt="Logo" 
          className="h-10 w-10 object-contain"
        />
        <span className="text-xl font-semibold text-gray-800">
          EAST Facilities
        </span>
      </div>

      {/* Center section: Search icon */}
      <div className="flex items-center">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <FiSearch className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Right section: SMS, Notification, Avatar */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <FiMessageSquare className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <FiBell className="w-5 h-5 text-gray-600" />
        </button>
        <button className="rounded-full overflow-hidden h-10 w-10 border-2 border-gray-200">
          <img 
            src={avatar} 
            alt="User Avatar" 
            className="h-full w-full object-cover"
          />
        </button>
      </div>
    </nav>
  );
}
