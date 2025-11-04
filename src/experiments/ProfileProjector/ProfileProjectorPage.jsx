import React, { useState } from "react"; // Import useState
import { useNavigate, useParams } from "react-router-dom";
import InfoPageLayout from "./components/InfoPageLayout";
import MobileNavBar from "./components/MobileNavBar"; // <-- Import the new component
import { pageContent } from "./data/content";
import styles from "./ProfileProjectorPage.module.css"; // Import new module style

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
  const navigate = useNavigate();
  const { topic } = useParams();

  // --- ADD State for mobile menu ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentTopic = topic || "Aim";

  // Existing desktop navigation handler
  const handleNavClick = (key) => {
    if (key === "Simulation") {
      navigate("/lab/profile-projector");
    } else {
      navigate(`/experiments/profile-projector/${key}`);
    }
  };

  // --- ADD Toggle function ---
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // --- ADD Mobile navigation handler ---
  const handleMobileNavClick = (key) => {
    setIsMobileMenuOpen(false); // Close menu on navigation
    handleNavClick(key); // Reuse existing navigation logic
  };

  const contentKey =
    navItems.find((item) => item.key === currentTopic)?.label || currentTopic;

  return (
    <div className={styles.mainWrapper}>
      {/* --- Top Header --- */}
      <header className={styles.header}>
        {/* --- ADD Mobile Menu Button (CSS hides on desktop) --- */}
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          ☰ {/* Simple hamburger icon */}
        </button>
        {/* --- END Button --- */}

        <h1 className={styles.headerTitle}>Profile Projector Virtual Lab</h1>

        {/* --- ADD Conditional Dropdown (CSS positions it) --- */}
        {/* Render it directly here; CSS handles display & positioning */}
        <MobileNavBar
          navItems={navItems}
          currentTopicKey={currentTopic}
          onNavigate={handleMobileNavClick} // Pass mobile handler
          isOpen={isMobileMenuOpen} // Pass state to control CSS class
        />
        {/* --- END Dropdown --- */}
      </header>

      <div className={styles.contentArea}>
        {/* Left Navigation Sidebar (CSS hides on mobile) */}
        <nav className={styles.sidebar}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => handleNavClick(item.key)} // Use original handler
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
      <footer className={styles.footer}>
        <p>
          Developed and coordinated by: Dr. S.Vijayakumar, Dr.S.Sathish
          Department of Production Technology, MIT Campus, Anna University,
          Chennai.
        </p>
        {/* You can add more footer content here */}
      </footer>
    </div>
  );
}

export default ProfileProjectorPage;
