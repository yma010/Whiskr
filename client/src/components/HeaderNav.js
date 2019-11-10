import React from "react";
import { Link } from "react-router-dom";

import "../stylesheets/header_nav.css";

const HeaderNav = () => {
  return (
    <div className="header-nav-container">
      <header className="header-nav">
        <div className="header-nav-left">
          <Link to="/" className="whiskr-logo">
            <span>whiskr</span>
          </Link>
          <ul className="header-nav-links">
            <li>
              <Link>You</Link>          {/* needs to be filled in */}
            </li>
            <li>
              <Link>Explore</Link>      {/* needs to be filled in */}
            </li>
          </ul>
        </div>
        <div className="header-nav-right">
          <form className="header-search-bar">
            <i className="search-icon" />
            <input type="text" placeholder="Cat photos" />
          </form>
          <ul className="header-user-links">
            <li className="header-upload-button"><Link /></li>    {/* needs to be filled in */}
            <li className="header-profile-button"><Link /></li>    {/* needs to be filled in */}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default HeaderNav;