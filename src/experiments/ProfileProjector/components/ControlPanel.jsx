import React from "react"; // Removed useState and useEffect
import styles from "./ControlPanel.module.css";
import SampleLibrary from "./SampleLibrary";

function ControlPanel({
  // Core State Props
  pointPosition,
  zeroOffset,
  magnification,
  currentUnit,
  correctionFactor,
  selectedSample,
  measuredData,

  // Core Handler Props
  movePoint, // Note: movePoint is not used in ControlPanel, but passed for completeness
  setRelativeZero,
  resetAbsoluteZero,
  setMagnification,
  setCurrentUnit,
  onSampleSelect,
  onRecalibrate,

  // Tutorial Props
  highlightTargetId,
  currentTutorialStep,
  activeTutorialName,

  // NEW: Angle State & Handlers from Parent
  isAngleMode,
  anglePoints,
  calculatedAngle,
  toggleAngleMode, // This is the handler from the parent
  handleAddPoint, // This is the handler from the parent
}) {
  const units = {
    micrometer: { factor: 1000, symbol: "µm" },
    mm: { factor: 1, symbol: "mm" },
    cm: { factor: 0.1, symbol: "cm" },
    m: { factor: 0.001, symbol: "m" },
  };

  // --- All internal state (isAngleMode, anglePoints, etc.) is REMOVED ---

  // Calculate display values from props
  const virtual_relativeX_pixels = pointPosition.x - zeroOffset.x;
  const virtual_relativeY_pixels = pointPosition.y - zeroOffset.y;

  const real_relativeX_mm = virtual_relativeX_pixels * correctionFactor;
  const real_relativeY_mm = virtual_relativeY_pixels * correctionFactor;

  const displayX = real_relativeX_mm * units[currentUnit].factor;
  const displayY = real_relativeY_mm * units[currentUnit].factor;

  // --- Tutorial-based disabling logic ---
  const disableYZeroButton =
    (activeTutorialName === "GEAR_OD" && currentTutorialStep !== 4) ||
    (activeTutorialName === "SCREW_OD" && currentTutorialStep !== 12) ||
    (activeTutorialName === "ANGLE_MEASURE" && currentTutorialStep < 31); // Disable during angle tutorial

  const disableXZeroButton =
    activeTutorialName === "ANGLE_MEASURE" && currentTutorialStep < 31; // Disable during angle tutorial

  // **THE FIX: Correct disabled logic for the angle button**
  const disableAngleButton =
    !!activeTutorialName && activeTutorialName !== "ANGLE_MEASURE";

  // --- All internal handlers (toggleAngleMode, handleAddPoint) are REMOVED ---
  // --- All useEffects (for angle calculation) are REMOVED ---

  return (
    <div className={styles.controlPanel} id="control-panel">
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
              disabled={disableXZeroButton || isAngleMode}
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
              disabled={disableYZeroButton || isAngleMode}
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
                onClick={() => setMagnification(level)} // Use prop handler
                className={`${styles.magButton} ${
                  magnification === level ? styles.active : ""
                }`}
                id={`mag-${level}x`}
                disabled={isAngleMode}
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
            {Object.keys(units).map((unit) => (
              <button
                key={unit}
                onClick={() => setCurrentUnit(unit)} // Use prop handler
                className={`${styles.unitButton} ${
                  currentUnit === unit ? styles.active : ""
                }`}
                id={`unit-${unit}`}
                disabled={isAngleMode}
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
          onClick={toggleAngleMode} // <-- Use handler from PROPS
          className={`${styles.modeButton} ${
            isAngleMode ? styles.activeMode : ""
          }`}
          disabled={disableAngleButton} // <-- Use FIXED logic
          id="angle-mode-toggle-button"
        >
          {isAngleMode ? "Exit Angle Measure" : "Start Angle Measure"}
        </button>
      </div>

      {/* Angle Measurement Section */}
      {isAngleMode && (
        <div className={styles.angleMeasureSection} id="angle-measure-section">
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
              {/* Read from PROPS */}
              {anglePoints.map((point, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{(point.x * units[currentUnit].factor).toFixed(3)}</td>
                  <td>{(point.y * units[currentUnit].factor).toFixed(3)}</td>
                </tr>
              ))}
              {/* Read from PROPS */}
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
            onClick={handleAddPoint} // <-- Use handler from PROPS
            className={styles.addPointButton}
            disabled={anglePoints.length >= 4} // Read from PROPS
            id="add-point-button"
          >
            {/* Read from PROPS */}
            Add Point ({anglePoints.length + 1}/4)
          </button>
          {/* Read from PROPS */}
          {calculatedAngle !== null && (
            <div className={styles.angleResult} id="angle-result-display">
              Angle: {calculatedAngle.toFixed(2)}°
            </div>
          )}
        </div>
      )}

      {/* OD Results */}
      {/* This section now also displays angle results from measuredData */}
      {measuredData && !isAngleMode && (
        <div className={styles.resultsTable} id="results-table">
          <h3 className={styles.controlTitle}>Measurement Results</h3>
          {/* OD Result */}
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
          {/* Angle Result (from parent) */}
          {measuredData.userMeasuredAngle && (
            <div className={styles.resultsRow}>
              <span>Your Angle:</span>
              <span className={styles.resultsValue}>
                {measuredData.userMeasuredAngle}
              </span>
            </div>
          )}
          {measuredData.referenceAngle && (
            <div className={styles.resultsRow}>
              <span>Reference Angle:</span>
              <span className={styles.resultsValue}>
                {measuredData.referenceAngle}
              </span>
            </div>
          )}
          {/* Pitch Result */}
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
            disabled={isAngleMode} // Use prop
          />
        </div>
        <div className={styles.stageControlsContainer}>
          <h3 className={styles.controlTitle}>Stage Position</h3>
          <div className={styles.stageControlsGrid} id="stage-controls-grid">
            <button
              onClick={resetAbsoluteZero}
              className={styles.absoluteZeroButton}
              id="absolute-zero-button"
              disabled={isAngleMode} // Use prop
            >
              ZERO
            </button>
          </div>
        </div>
      </div>

      {/* Restart Button */}
      <div className={styles.recalibrateContainer}>
        <button
          onClick={onRecalibrate}
          className={styles.recalibrateButton}
          id="restart-tutorial-button"
          disabled={isAngleMode} // Use prop
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default ControlPanel;
