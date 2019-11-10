import React from "react";
import { Link } from "react-router-dom";

const HeaderNav = () => {
  return (
    <div className="header-nav">
      <div className="header-nav-left">
        <Link to="/">whiskr</Link>
        <ul className="header-nav-links">
          <li>
            <span>You</span>
          </li>
          <li>
            <span>Explore</span>
          </li>
        </ul>
      </div>
      <div className="header-nav-right">
        <div className="header-search-bar">
          <i className="search-icon" />
          <input type="text" placeholder="Cat photos" />
        </div>
        <ul className="header-user-links">
          <li className="header-upload-button" />
          <li className="header-profile-button" />
        </ul>
      </div>
    </div>
  );
};

export default HeaderNav;