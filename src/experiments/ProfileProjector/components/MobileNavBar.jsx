import React from "react";
// Import NavLink if you want active styling based on URL
// import { NavLink } from 'react-router-dom';
import styles from "../ProfileProjectorPage.module.css"; // Use styles from the main page CSS

// Accept props: navItems, onNavigate (function to call), currentTopicKey, isOpen
function MobileNavBar({ navItems, onNavigate, currentTopicKey, isOpen }) {
  return (
    // Apply the dropdown style and the 'open' class conditionally
    <nav className={`${styles.mobileNavDropdown} ${isOpen ? styles.open : ""}`}>
      <ul>
        {" "}
        {/* Simple list for dropdown items */}
        {navItems.map((item) => (
          <li key={item.key}>
            {/* You can use NavLink here too if you prefer */}
            {/* <NavLink to={item.path} className={...}> */}
            <button
              onClick={() => onNavigate(item.key)} // Call parent handler
              className={`${styles.navButton} ${
                // Reuse navButton style? Or create new mobile style
                currentTopicKey === item.key ? styles.active : ""
              }`}
              style={{
                width: "100%",
                margin: "0",
                borderRadius: "0",
                textAlign: "center",
                padding: "15px",
              }} // Quick inline overrides
            >
              {item.label}
            </button>
            {/* </NavLink> */}
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Basic styling for the list inside dropdown (optional, can be done in main CSS)
MobileNavBar.defaultProps = {
  navItems: [],
  onNavigate: () => {},
  currentTopicKey: "",
  isOpen: false,
};

// Add some basic list styling directly or in the main CSS
/*
.mobileNavDropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.mobileNavDropdown li {
 border-bottom: 1px solid #eee;
}
.mobileNavDropdown li:last-child {
 border-bottom: none;
}
*/

export default MobileNavBar;
