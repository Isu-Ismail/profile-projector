import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import InfoPageLayout from "./components/InfoPageLayout";
import { pageContent } from "./data/content";
import styles from "./ProfileProjectorPage.module.css"; // Import new module style

const navItems = [
  { key: "Aim", label: "Aim" },
  { key: "Theory", label: "Theory" },
  { key: "Procedure", label: "Procedure" },
  { key: "Test1", label: "Pretest" },
  { key: "Simulation", label: "Simulation" },
  { key: "Test2", label: "Posttest" },
  { key: "References", label: "References" },
];

function ProfileProjectorPage() {
  const navigate = useNavigate();
  const { topic } = useParams();

  const currentTopic = topic || "Aim";

  const handleNavClick = (key) => {
    if (key === "Simulation") {
      navigate("/lab/profile-projector");
    } else {
      navigate(`/experiments/profile-projector/${key}`);
    }
  };

  const contentKey =
    navItems.find((item) => item.key === currentTopic)?.label || currentTopic;

  return (
    <div className={styles.mainWrapper}>
      {/* --- Top Header --- */}
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Profile Projector Virtual Lab</h1>
      </header>

      <div className={styles.contentArea}>
        {/* Left Navigation Sidebar */}
        <nav className={styles.sidebar}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => handleNavClick(item.key)}
                  className={`${styles.navButton} ${
                    currentTopic === item.key ? styles.active : ""
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content Area */}
        <div className={styles.mainContent}>
          <InfoPageLayout pageKey={contentKey} content={pageContent} />
        </div>
      </div>
    </div>
  );
}

export default ProfileProjectorPage;
