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
              <Link>                    {/* needs to be filled in */}
                <span>You</span>
              </Link>
            </li>
            <li>
              <Link>                    {/* needs to be filled in */}
                <span>Explore</span>
              </Link>      
            </li>
          </ul>
        </div>
        <ul className="header-nav-right">
          <form className="header-search-bar">
            <i className="search-icon" />
            <input type="text" placeholder="Cat photos" />
          </form>
          <li className="header-upload-button"><Link /></li>    {/* needs to be filled in */}
          <li className="header-avatar-button"><button /></li>    {/* needs to be filled in */}
        </ul>
      </header>
    </div>
  );
};

export default HeaderNav;