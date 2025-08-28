import { useState, useRef, useEffect } from "react";
import { FaSearch, FaBell, FaEnvelope, FaBars } from "react-icons/fa";
import logo from "../assets/images/logo.png"; // adjust the path if needed
import "../index.css"; // make sure to import CSS
import avatar from "../assets/images/avatar.jpg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const notifRef = useRef(null);
  const avatarRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setAvatarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="custom-navbar">
      {/* Left: Logo + Brand */}
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <span className="navbar-brand">EAST Facilities</span>
      </div>

      {/* Mobile menu toggle */}
      <button className="navbar-toggler" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars size={20} />
      </button>

      {/* Center: Search */}
      <div className={`navbar-center ${menuOpen ? "show" : ""}`}>
        <button className="search-btn">
          <FaSearch className="me-2" />
          Search
        </button>
      </div>

      {/* Right: Icons */}
      <div className="navbar-right">
        {/* Messages */}
        <button className="icon-btn">
          <FaEnvelope size={18} />
        </button>

        {/* Notifications */}
        <div className="dropdown" ref={notifRef}>
          <button className="icon-btn" onClick={() => setNotifOpen(!notifOpen)}>
            <FaBell size={18} />
            <span className="badge">1</span>
          </button>
          {notifOpen && (
            <ul className="dropdown-menu">
              <li><a href="#">Some news</a></li>
              <li><a href="#">Another news</a></li>
              <li><a href="#">Something else here</a></li>
            </ul>
          )}
        </div>

        {/* Avatar */}
        <div className="dropdown" ref={avatarRef}>
          <button className="avatar-btn" onClick={() => setAvatarOpen(!avatarOpen)}>
            <img
              src={avatar}            
              alt="User Avatar"
              className="avatar-img"
            />
          </button>
          {avatarOpen && (
            <ul className="dropdown-menu">
              <li><a href="#">My profile</a></li>
              <li><a href="#">Settings</a></li>
              <li><a href="#">Logout</a></li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
