import React from "react";
import styles from "./ControlPanel.module.css";
import SampleLibrary from "./SampleLibrary";

// Helper function to check if the current step requires movement
const isMovementStep = (tutorialName, stepId) => {
  if (tutorialName === "GEAR_OD" && (stepId === 3 || stepId === 5)) return true;
  if (tutorialName === "SCREW_OD" && (stepId === 11 || stepId === 13))
    return true;
  if (
    tutorialName === "ANGLE_MEASURE" &&
    (stepId === 22 || stepId === 24 || stepId === 26 || stepId === 28)
  )
    return true;
  return false;
};

function ControlPanel({
  // Core State Props
  pointPosition,
  zeroOffset,
  magnification, // Current selected magnification
  currentUnit,
  correctionFactor,
  selectedSample,
  measuredData,

  // Core Handler Props
  movePoint,
  setRelativeZero,
  resetAbsoluteZero,
  setMagnification, // Handler to change magnification
  setCurrentUnit,
  onSampleSelect,
  onRecalibrate, // Handler for Home/Restart button

  // Tutorial Props
  highlightTargetId, // The ID of the currently highlighted element
  currentTutorialStep,
  activeTutorialName,
  isTutorialActive, // Boolean indicating if any tutorial is active

  // Angle State & Handlers from Parent
  isAngleMode,
  anglePoints,
  calculatedAngle,
  toggleAngleMode,
  handleAddPoint,
}) {
  const units = {
    micrometer: { factor: 1000, symbol: "µm" },
    mm: { factor: 1, symbol: "mm" },
    cm: { factor: 0.1, symbol: "cm" },
    // m: { factor: 0.001, symbol: "m" }, // Button removed
  };

  const displayUnits = Object.keys(units).filter((unit) => unit !== "m");

  // Calculate display values
  const virtual_relativeX_pixels = pointPosition.x - zeroOffset.x;
  const virtual_relativeY_pixels = pointPosition.y - zeroOffset.y;
  const real_relativeX_mm = virtual_relativeX_pixels * correctionFactor;
  const real_relativeY_mm = virtual_relativeY_pixels * correctionFactor;
  const displayX = real_relativeX_mm * units[currentUnit].factor;
  const displayY = real_relativeY_mm * units[currentUnit].factor;

  // --- STRICTER Tutorial-based disabling logic ---
  // Disable if tutorial is active AND this element is NOT the target
  const isDisabledByTutorial = (elementId) => {
    return (
      isTutorialActive && highlightTargetId && highlightTargetId !== elementId
    );
  };

  // Check if clicks should be globally disabled (during movement steps)
  const disableInteractionsDuringMovement =
    isTutorialActive && isMovementStep(activeTutorialName, currentTutorialStep);

  // --- Specific Disable Logic Variables ---
  const angleToggleButtonId = "angle-mode-toggle-button";

  // **FORCE ENABLE LOGIC:**
  let disableAngleToggleButton = true; // Default to disabled

  if (isTutorialActive && highlightTargetId === angleToggleButtonId) {
    // If the tutorial is active AND this button is highlighted, FORCE ENABLE
    disableAngleToggleButton = false;
  } else if (!isTutorialActive && !isAngleMode) {
    // If no tutorial is active AND not already in angle mode, allow starting
    disableAngleToggleButton = false;
  } else if (isAngleMode && !isTutorialActive) {
    // If in angle mode and no tutorial, allow exiting
    disableAngleToggleButton = false;
  }
  // Note: disableInteractionsDuringMovement check is implicitly handled because
  // the highlightTargetId won't match during movement steps.

  // --- Debugging logs (Optional) ---
  // if (activeTutorialName === "ANGLE_MEASURE" && currentTutorialStep === 21) {
  //   console.log("ControlPanel - isTutorialActive:", isTutorialActive);
  //   console.log("ControlPanel - highlightTargetId:", highlightTargetId);
  //   console.log("ControlPanel - disableInteractionsDuringMovement:", disableInteractionsDuringMovement);
  //   console.log("ControlPanel - FINAL disableAngleToggleButton:", disableAngleToggleButton);
  // }

  return (
    <div
      className={`${styles.controlPanel} ${
        disableInteractionsDuringMovement ? styles.interactionDisabled : ""
      }`}
      id="control-panel"
    >
      {/* DRO */}
      <div className={styles.droPanel} id="dro-panel">
        {/* ... DRO content ... */}
        <div className={styles.droHeader}>
          <h2 className={styles.droTitle}>DIGITAL READOUT</h2>
          <span className={styles.droUnitSymbol}>
            {units[currentUnit].symbol}
          </span>
        </div>
        <div className={styles.droValueRow}>
          <div className={styles.droAxisLabel}>
            <span>X:</span>
            <button
              onClick={() => setRelativeZero("x")}
              className={styles.zeroButton}
              id="zero-x-button"
              disabled={
                isAngleMode ||
                isDisabledByTutorial("zero-x-button") ||
                disableInteractionsDuringMovement
              }
            >
              0
            </button>
          </div>
          <span className={styles.droValue}>{displayX.toFixed(3)}</span>
        </div>
        <div className={styles.droValueRow}>
          <div className={styles.droAxisLabel}>
            <span>Y:</span>
            <button
              onClick={() => setRelativeZero("y")}
              className={styles.zeroButton}
              id="zero-y-button"
              disabled={
                isAngleMode ||
                isDisabledByTutorial("zero-y-button") ||
                disableInteractionsDuringMovement
              }
            >
              0
            </button>
          </div>
          <span className={styles.droValue}>{(-displayY).toFixed(3)}</span>
        </div>
      </div>

      {/* Settings */}
      <div className={styles.settingsGrid} id="settings-grid">
        {/* ... Magnification ... */}
        <div>
          <h3 className={styles.controlTitle}>Magnification</h3>
          <div className={styles.magButtonGrid}>
            {[10, 20, 50].map((level) => (
              <button
                key={level}
                onClick={() => setMagnification(level)}
                className={`${styles.magButton} ${
                  magnification === level ? styles.active : ""
                }`}
                id={`mag-${level}x`}
                disabled={
                  isAngleMode ||
                  isDisabledByTutorial(`mag-${level}x`) ||
                  disableInteractionsDuringMovement
                }
              >
                {level}x
              </button>
            ))}
          </div>
        </div>
        {/* ... Units ... */}
        <div>
          <h3 className={styles.controlTitle}>Units</h3>
          <div className={styles.unitButtonGrid} id="unit-selector">
            {displayUnits.map((unit) => (
              <button
                key={unit}
                onClick={() => setCurrentUnit(unit)}
                className={`${styles.unitButton} ${
                  currentUnit === unit ? styles.active : ""
                }`}
                id={`unit-${unit}`}
                disabled={
                  isAngleMode ||
                  isDisabledByTutorial(`unit-${unit}`) ||
                  disableInteractionsDuringMovement
                }
              >
                {units[unit].symbol}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Angle Toggle */}
      <div className={styles.angleModeToggle}>
        <button
          onClick={toggleAngleMode}
          className={`${styles.modeButton} ${
            isAngleMode ? styles.activeMode : ""
          }`}
          // **USE THE FORCE ENABLE LOGIC**
          disabled={disableAngleToggleButton}
          id={angleToggleButtonId}
        >
          {isAngleMode ? "Exit Angle Measure" : "Start Angle Measure"}
        </button>
      </div>

      {/* Angle Measurement Section */}
      {isAngleMode && (
        <div className={styles.angleMeasureSection} id="angle-measure-section">
          {/* ... angle content ... */}
          <h3 className={styles.controlTitle}>Angle Measurement Points</h3>
          <table className={styles.pointsTable}>
            <thead>
              <tr>
                <th>Point</th>
                <th>X ({units[currentUnit].symbol})</th>
                <th>Y ({units[currentUnit].symbol})</th>
              </tr>
            </thead>
            <tbody>
              {anglePoints.map((point, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{(point.x * units[currentUnit].factor).toFixed(3)}</td>
                  <td>{(point.y * units[currentUnit].factor).toFixed(3)}</td>
                </tr>
              ))}
              {Array.from({ length: Math.max(0, 4 - anglePoints.length) }).map(
                (_, i) => (
                  <tr key={`empty-${i}`} className={styles.emptyRow}>
                    <td>{anglePoints.length + i + 1}</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <button
            onClick={handleAddPoint}
            className={styles.addPointButton}
            // --- MODIFIED LOGIC ---
            // Removed `disableInteractionsDuringMovement`
            // The button is only disabled if 4 points are reached,
            // or if the tutorial is active and NOT highlighting this button.
            disabled={
              anglePoints.length >= 4 ||
              isDisabledByTutorial("add-point-button")
            }
            id="add-point-button"
          >
            Add Point ({anglePoints.length + 1}/4)
          </button>
          {calculatedAngle !== null && (
            <div className={styles.angleResult} id="angle-result-display">
              Angle: {calculatedAngle.toFixed(2)}°
            </div>
          )}
        </div>
      )}

      {/* OD Results */}
      {measuredData && !isAngleMode && (
        <div className={styles.resultsTable} id="results-table">
          {/* ... results table content ... */}
          <h3 className={styles.controlTitle}>Measurement Results</h3>
          {measuredData.userMeasuredDiameter && (
            <div className={styles.resultsRow}>
              <span>Your OD:</span>
              <span className={styles.resultsValue}>
                {measuredData.userMeasuredDiameter}
              </span>
            </div>
          )}
          {(measuredData.diameter || measuredData.screwDiameter) && (
            <div className={styles.resultsRow}>
              <span>Reference OD:</span>
              <span className={styles.resultsValue}>
                {measuredData.diameter || measuredData.screwDiameter}
              </span>
            </div>
          )}
          {measuredData.angle && (
            <div className={styles.resultsRow}>
              <span>Reference Angle:</span>
              <span className={styles.resultsValue}>{measuredData.angle}</span>
            </div>
          )}
          {measuredData.userMeasuredAngle && (
            <div className={styles.resultsRow}>
              <span>Your Angle:</span>
              <span className={styles.resultsValue}>
                {measuredData.userMeasuredAngle}
              </span>
            </div>
          )}
          {measuredData.referenceAngle && !measuredData.angle && (
            <div className={styles.resultsRow}>
              <span>Reference Angle:</span>
              <span className={styles.resultsValue}>
                {measuredData.referenceAngle}
              </span>
            </div>
          )}
          {measuredData.pitch && (
            <div className={styles.resultsRow}>
              <span>Reference Pitch:</span>
              <span className={styles.resultsValue}>{measuredData.pitch}</span>
            </div>
          )}
        </div>
      )}

      {/* Sample Library & Stage */}
      <div className={styles.stageControlArea}>
        <div className={styles.sampleLibraryContainer}>
          <SampleLibrary
            onSampleSelect={onSampleSelect}
            highlightTargetId={highlightTargetId}
            selectedSampleId={selectedSample?.id}
            disabled={isTutorialActive} // General flag
            activeTutorialName={activeTutorialName} // For specific logic inside
          />
        </div>
        <div className={styles.stageControlsContainer}>
          <h3 className={styles.controlTitle}>Stage Position</h3>
          <div className={styles.stageControlsGrid} id="stage-controls-grid">
            <button
              onClick={resetAbsoluteZero}
              className={styles.absoluteZeroButton}
              id="absolute-zero-button"
              disabled={
                isAngleMode ||
                isDisabledByTutorial("absolute-zero-button") ||
                disableInteractionsDuringMovement
              }
            >
              ZERO
            </button>
          </div>
        </div>
      </div>

      {/* Restart/Home Button */}
      <div className={styles.recalibrateContainer}>
        <button
          onClick={onRecalibrate}
          className={styles.recalibrateButton}
          id="restart-tutorial-button"
          disabled={disableInteractionsDuringMovement} // ONLY disable during movement
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default ControlPanel;
