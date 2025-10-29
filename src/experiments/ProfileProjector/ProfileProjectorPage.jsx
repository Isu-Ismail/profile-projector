import React from "react";
// Import NavLink
import { useNavigate, useParams, NavLink } from "react-router-dom";
import InfoPageLayout from "./components/InfoPageLayout";
import { pageContent } from "./data/content";
import styles from "./ProfileProjectorPage.module.css"; // Your main layout CSS module

const navItems = [
  { key: "Aim", path: "/experiments/profile-projector/Aim", label: "Aim" },
  {
    key: "Theory",
    path: "/experiments/profile-projector/Theory",
    label: "Theory",
  },
  {
    key: "Procedure",
    path: "/experiments/profile-projector/Procedure",
    label: "Procedure",
  },
  {
    key: "Test1",
    path: "/experiments/profile-projector/Test1",
    label: "Pretest",
  },
  {
    key: "Simulation",
    path: "/lab/profile-projector",
    label: "Virtual experiment",
  }, // Lab path
  {
    key: "Test2",
    path: "/experiments/profile-projector/Test2",
    label: "Posttest",
  },
  {
    key: "Acknowledgement",
    path: "/experiments/profile-projector/Acknowledgement",
    label: "Acknowledgement",
  },
];

function ProfileProjectorPage() {
  // Removed useNavigate as NavLink handles it
  const { topic } = useParams();

  // Determine currentTopic based on the route parameter, default to 'Aim'
  const currentTopic = topic || "Aim";

  // handleNavClick is no longer needed with NavLink

  // Find the content key based on the current topic key
  const contentKey =
    navItems.find((item) => item.key === currentTopic)?.label || currentTopic;

  return (
    <div className={styles.mainWrapper}>
      {/* --- Top Header --- */}
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Profile Projector Virtual Lab</h1>
      </header>

      <div className={styles.contentArea}>
        {/* Left Navigation Sidebar (Desktop) */}
        <nav className={styles.sidebar}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.key}>
                {/* --- MODIFIED: Use NavLink --- */}
                <NavLink
                  to={item.path} // Use the defined path
                  className={({ isActive }) =>
                    `${styles.navButton} ${isActive ? styles.active : ""}`
                  }
                >
                  {item.label}
                </NavLink>
                {/* --- END MODIFICATION --- */}
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content Area */}
        <div className={styles.mainContent}>
          {/* Render content based on the determined key */}
          <InfoPageLayout pageKey={contentKey} content={pageContent} />
        </div>
      </div>

      {/* --- ADD THIS: Mobile Tab Bar --- */}
      <nav className={styles.mobileNavBar}>
        {navItems.map((item) => (
          // Use NavLink here too for active state and navigation
          <NavLink
            key={item.key}
            to={item.path} // Use the defined path
            className={({ isActive }) =>
              `${styles.mobileNavButton} ${isActive ? styles.active : ""}`
            }
          >
            {/* Optional: Add an icon here if desired */}
            {/* <span className={styles.icon}>ICON</span> */}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      {/* --- END: Mobile Tab Bar --- */}
    </div>
  );
}

export default ProfileProjectorPage;
