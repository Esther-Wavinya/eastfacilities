import { useState } from "react";
import Navbar from "./Navbar";
import { FaHome, FaUsers, FaChartBar, FaCog, FaChevronDown } from "react-icons/fa";
import "../index.css";

export default function SidebarLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [facilitiesOpen, setFacilitiesOpen] = useState(false);
  const [tenantsOpen, setTenantsOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);

  return (
    <div className="layout-container">
      {/* Top Navbar */}
      <Navbar />

      <div className="layout-main">
        {/* Sidebar */}
        <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
          <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? "→" : "←"}
          </button>

          <ul className="sidebar-menu">
            <li>
              <a href="#">
                <FaHome className="icon" />
                <span className="label">Home</span>
              </a>
            </li>

            {/* Facilities Dropdown */}
            <li>
              <button 
                className="dropdown-btn" 
                onClick={() => setFacilitiesOpen(!facilitiesOpen)}
              >
                <FaUsers className="icon" />
                <span className="label">Facilities</span>
                <FaChevronDown className={`chevron ${facilitiesOpen ? "rotate" : ""}`} />
              </button>
              {facilitiesOpen && !collapsed && (
                <ul className="dropdown-list">
                  <li><a href="#">Grounds</a></li>
                  <li><a href="#">Halls</a></li>
                  <li><a href="#">Rooms</a></li>
                </ul>
              )}
            </li>

            {/* Tenants Dropdown */}
            <li>
              <button 
                className="dropdown-btn" 
                onClick={() => setTenantsOpen(!tenantsOpen)}
              >
                <FaUsers className="icon" />
                <span className="label">Tenants</span>
                <FaChevronDown className={`chevron ${tenantsOpen ? "rotate" : ""}`} />
              </button>
              {tenantsOpen && !collapsed && (
                <ul className="dropdown-list">
                  <li><a href="#">KAG Sacco Limited</a></li>
                  <li><a href="#">KAG Cooperative Housing</a></li>
                  <li><a href="#">Safina House</a></li>
                  <li><a href="#">KAG Extension</a></li>
                </ul>
              )}
            </li>

            {/* Dashboard Stats Dropdown */}
            <li>
              <button 
                className="dropdown-btn" 
                onClick={() => setStatsOpen(!statsOpen)}
              >
                <FaChartBar className="icon" />
                <span className="label">Dashboard Stats</span>
                <FaChevronDown className={`chevron ${statsOpen ? "rotate" : ""}`} />
              </button>
              {statsOpen && !collapsed && (
                <ul className="dropdown-list">
                  <li><a href="#">Users</a></li>
                  <li><a href="#">Bookings</a></li>
                  <li><a href="#">Payments</a></li>
                  <li><a href="#">Revenue</a></li>
                </ul>
              )}
            </li>

            {/* Settings */}
            <li>
              <a href="#">
                <FaCog className="icon" />
                <span className="label">Settings</span>
              </a>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
