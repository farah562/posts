import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

import { AuthContext } from "../../context/auth-context";
import { useAuth } from "../../hooks/auth-hook";

export default function Sidebar({ isSubscribed }) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { user } = useAuth();

  const logout = () => {
    auth.logout();
    navigate("/");
  };

  const toggleSidebar = () => {
    const body = document?.querySelector("body");
    let sidebar = body?.querySelector(".sidebar");

    sidebar.classList.toggle("close");
  };

  return (
    <nav className="sidebar close">
      <header>
        <div className="image-text">
          <span className="image">
            {user?.role === "admin" && (
              <lottie-player
                src="https://assets6.lottiefiles.com/packages/lf20_a91d7Z.json"
                background="transparent"
                speed="1"
                style={{ width: "100px", height: "100px" }}
                autoplay
              ></lottie-player>
            )}
            {user?.role !== "admin" && (
              <lottie-player
                src="https://assets9.lottiefiles.com/packages/lf20_myor1trh.json"
                background="transparent"
                speed="1"
                style={{ width: "50px", height: "50px" }}
                autoplay
              ></lottie-player>
            )}
          </span>

          <div className="text logo-text">
            <span className="name">ArtRealm</span>
            {/* <span className="profession">Arts Galley</span> */}
          </div>
        </div>

        <i className="bx bx-chevron-right toggle" onClick={toggleSidebar}></i>
      </header>

      <div className="menu-bar mt-4">
        <ul className="menu-links">
          <li className="nav-link">
            <Link to="/admin/dashboard">
              <i className="bx bx-home-alt icon"></i>
              <span className="text nav-text">Dashboard</span>
            </Link>
          </li>

      

          <li className="nav-link">
            <Link to="/admin/dashboard/add-new-admin">
              <i className="bx bx-user-plus icon"></i>
              <span className="text nav-text">Add New Admin</span>
            </Link>
          </li>


          <li className="nav-link">
            <Link to="/admin/dashboard/edit-content">
              <i className="bx bx-edit icon"></i>
              <span className="text nav-text">Edit Content</span>
            </Link>
          </li>

 

          <li className="nav-link">
            <Link to="/admin/dashboard/users-messages">
              <i className="bx bx-chat icon"></i>
              <span className="text nav-text">Users Messages</span>
            </Link>
          </li>
        </ul>

        <div className="bottom-content">
          <li className="" onClick={logout}>
            <i className="bx bx-log-out icon"></i>
            <span className="text nav-text">Logout</span>
          </li>
<li></li>
          {/* <li className="mode">
            <div className="sun-moon">
              <i className="bx bx-moon icon moon"></i>
              <i className="bx bx-sun icon sun"></i>
            </div>
            <span className="mode-text text">Dark mode</span>

            <div className="toggle-switch">
              <span className="switch"></span>
            </div>
          </li> */}
        </div>
      </div>
    </nav>
  );
}
