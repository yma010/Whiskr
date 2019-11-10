import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../stylesheets/header_nav.css";

const HeaderNav = () => {
  const [isYouDropdownOpen, setYouDropdownOpen] = useState(false);
  const [isExploreDropdownOpen, setExploreDropdownOpen] = useState(false);
  const [isSearchFocused, setSearchFocus] = useState(false);

  return (
    <div className="header-nav-container">
      <header className="header-nav">
        <div className="header-nav-left">
          <Link to="/" className="whiskr-logo">
            <span>whiskr</span>
          </Link>
          <ul className="header-nav-links">
            <li 
              onMouseEnter={() => setYouDropdownOpen(true)}
              onMouseLeave={() => setYouDropdownOpen(false)}
            >
              <Link><span>You</span></Link>               {/* link needs to be filled in */}
              {isYouDropdownOpen ? (
                <ul className="header-dropdown">
                  <li><Link>Photostream</Link></li>       {/* link needs to be filled in */}
                  <li><Link>Albums</Link></li>            {/* link needs to be filled in */}
                  <li><Link>Faves</Link></li>             {/* link needs to be filled in */}
                  <li><Link>Camera Roll</Link></li>       {/* link needs to be filled in */}
                </ul>
              ) : ""}
            </li>
            <li
              onMouseEnter={() => setExploreDropdownOpen(true)}
              onMouseLeave={() => setExploreDropdownOpen(false)}
            >
              <Link><span>Explore</span></Link>      {/* link needs to be filled in */}
              {isExploreDropdownOpen ? (
                <ul className="header-dropdown">
                  <li><Link>Recent Photos</Link></li>       {/* link needs to be filled in */}
                  <li><Link>Trending</Link></li>            {/* link needs to be filled in */}
                </ul>
              ) : ""}
            </li>
          </ul>
        </div>
        <ul className="header-nav-right">
          <form className={isSearchFocused ? "header-search-bar focused" : "header-search-bar"}>
            <button className="search-icon" />
            <input 
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
              type="text" 
              placeholder="Cat photos" 
            />
          </form>
          <li className="header-upload-button"><Link /></li>    {/* link needs to be filled in */}
          <li className="header-avatar-button"><button /></li>    {/* link needs to be filled in */}
        </ul>
      </header>
    </div>
  );
};

export default HeaderNav;