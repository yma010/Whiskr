import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useQuery, useApolloClient } from "@apollo/react-hooks";

import { CURRENT_USER } from "../graphql/queries";
import "../stylesheets/header_nav.css";

const HeaderNav = props => {
  const [search, setSearch] = useState("");
  const [isYouDropdownOpen, setYouDropdownOpen] = useState(false);
  const [isExploreDropdownOpen, setExploreDropdownOpen] = useState(false);
  const [isSearchFocused, setSearchFocus] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { data: { currentUser } } = useQuery(CURRENT_USER);
  const client = useApolloClient();

  document.addEventListener("click", e => {
    if (!e.target.closest(".header-avatar-button")) {
      setProfileDropdownOpen(false);
    }
  });

  const youDropdown = currentUser ? (
    <ul className="header-dropdown">
      <li><Link to={`/users/${currentUser._id}/photos`}>Photostream</Link></li>
      {/* <li><Link>Albums</Link></li>            link needs to be filled in
      <li><Link>Faves</Link></li>             link needs to be filled in
      <li><Link>Camera Roll</Link></li>       link needs to be filled in */}
    </ul>
  ) : "";

  const exploreDropdown = (
    <ul className="header-dropdown">
      <li><Link to="/explore/recent">Recent Photos</Link></li>
      <li><Link to="/explore/trending">Trending</Link></li>
    </ul>
  );

  const searchBar = (
    <form 
      className={isSearchFocused ? "header-search-bar focused" : "header-search-bar"}
      onSubmit={e => {
        e.preventDefault();
        props.history.push(`/search?text=${search}`)
      }}
    >
      <button className="search-icon" />
      <input
        onFocus={() => setSearchFocus(true)}
        onBlur={() => setSearchFocus(false)}
        value={search}
        onChange={e => setSearch(e.target.value)}
        type="text"
        placeholder="Cat photos"
      />
    </form>
  );

  const sessionLinks = (
    <ul className="header-session-links">
      <li><Link to="/login">Log In</Link></li>
      <li><Link to="/signup">Sign Up</Link></li>
    </ul>
  );

  let profileDropdown;
  if (currentUser) {
    profileDropdown = (
      <div className="profile-dropdown-container">
        <span className="profile-dropdown-arrow" />
        <div className="header-profile-dropdown">
          <h4>Hi, <Link to={`/users/${currentUser._id}/photos`}>{currentUser.firstName}!</Link></h4>
          <button onClick={e => {
            e.preventDefault();
            localStorage.removeItem("auth-token");
            client.writeData({
              data: {
                isLoggedIn: false,
                currentUser: null
              }
            });
          }}>
            Log out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="header-nav-container">
      <header className="header-nav">
        <div className="header-nav-left">
          <Link to="/" className="whiskr-logo"><span>whiskr</span></Link>
          <ul className="header-nav-links">
            {currentUser ? (
            <li 
              onMouseEnter={() => setYouDropdownOpen(true)}
              onMouseLeave={() => setYouDropdownOpen(false)}
            >
              <Link to={`/users/${currentUser._id}/photos`}><span>You</span></Link>          
              {isYouDropdownOpen ? youDropdown : ""}
            </li>) : ""}
            <li
              onMouseEnter={() => setExploreDropdownOpen(true)}
              onMouseLeave={() => setExploreDropdownOpen(false)}
            >
              <Link to="/explore"><span>Explore</span></Link>
              {isExploreDropdownOpen ? exploreDropdown : ""}
            </li>
          </ul>
        </div>
        <ul className="header-nav-right">
          <li>{searchBar}</li>
          <li className="header-upload-button"><Link to='/upload' /></li>  
          {currentUser ? (
          <li className="header-avatar-button">
            <button 
              style={{
                backgroundImage: `url(${currentUser.avatarURL || "../public/camera-avatar.png"})`
              }}
              onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
            />
            {isProfileDropdownOpen ? profileDropdown : "" }
          </li>
          ) : (
          <li>{sessionLinks}</li>)}
        </ul>
      </header>
    </div>
  );
};

export default withRouter(HeaderNav);