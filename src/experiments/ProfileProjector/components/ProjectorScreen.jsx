import React from "react";
import styles from "./ProjectorScreen.module.css";

// Main ProjectorScreen Component
function ProjectorScreen({
  pointPosition,
  selectedSample,
  magnification,
  showAlignmentLine, // Prop to control visibility of the blue line (for Gear OD)
}) {
  // Calculate scaling factor based on magnification (10x is the base)
  const scaleFactor = magnification / 10;
  // Scale the translation (movement) coordinates by the same factor
  const scaledTranslateX = pointPosition.x * scaleFactor;
  const scaledTranslateY = pointPosition.y * scaleFactor;

  // Check if the v-profile is selected
  const isVProfile = selectedSample && selectedSample.id === "v-profile";

  return (
    // Outer container for padding and border
    <div className={styles.outerWrapper} id="projector-screen">
      {/* The main display area with yellow background and overflow hidden */}
      <div className={styles.display}>
        {/* The movable stage div */}
        <div
          className={styles.stage}
          style={{
            // Apply scaled translation for movement
            transform: `translate(${scaledTranslateX}px, ${scaledTranslateY}px)`,
            transition: "transform 0.1s linear", // Smooth movement transition
          }}
        >
          {/* Conditional Rendering based on selectedSample */}
          {selectedSample ? (
            selectedSample.type === "image" ? (
              // Render Image Sample if type is 'image'
              <img
                src={selectedSample.imageUrl}
                alt={selectedSample.name}
                // Conditionally add the .noFilter class
                className={`${styles.sampleImage} ${
                  isVProfile ? styles.noFilter : ""
                }`}
                style={{
                  // Apply scaling to the image itself
                  transform: `scale(${scaleFactor})`,
                }}
              />
            ) : (
              // Fallback: Render a placeholder dot if type is unknown or missing
              <div className={styles.placeholderDot} />
            )
          ) : (
            // Render placeholder dot if no sample is selected
            <div className={styles.placeholderDot} />
          )}
        </div>

        {/* Static Crosshairs Overlay */}
        <div className={styles.crosshairOverlay}>
          <div className={styles.crosshairH}></div> {/* Horizontal line */}
          <div className={styles.crosshairV}></div> {/* Vertical line */}
        </div>

        {/* Conditional Blue Alignment Line (for Gear OD tutorial) */}
        {showAlignmentLine && <div className={styles.alignmentLine}></div>}

        {/* Vignette/Border Effect */}
        <div className={styles.vignette}></div>
      </div>
    </div>
  );
}

export default ProjectorScreen;
