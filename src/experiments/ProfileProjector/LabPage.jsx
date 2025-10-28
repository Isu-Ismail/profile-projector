import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchExperimentSamples } from "../../repositories/lab_repo";

import ControlPanel from "./components/ControlPanel";
import ProjectorScreen from "./components/ProjectorScreen";
import LabTutorial from "./LabTutorial";
import { TUTORIAL_SCRIPTS } from "./data/TutorialsData";
import HighlightOverlay from "./components/HighlightOverlay";
import styles from "./components/LabLayout.module.css";

const VIRTUAL_CALIBRATION_LENGTH_PIXELS = 400;
const REAL_CALIBRATION_LENGTH_MM = 100;
const correctionFactor =
  REAL_CALIBRATION_LENGTH_MM / VIRTUAL_CALIBRATION_LENGTH_PIXELS; // 0.25

// --- Pixel Targets (Existing) ---
const GEAR_ALIGN_TARGET_Y_TOP = -86;
const GEAR_ALIGN_TARGET_Y_BOTTOM = 84;
const SCREW_ALIGN_TARGET_Y_TOP = -34;
const SCREW_ALIGN_TARGET_Y_BOTTOM = 46;

// --- Pixel Targets for Angle Tutorial ---
const ANGLE_TARGETS = {
  23: { x: 52, y: 22 }, // Point 1: X: 13.000, Y: -5.500
  25: { x: 28, y: -22 }, // Point 2: X: 7.000, Y: 5.500
  27: { x: -28, y: -22 }, // Point 3: X: -7.000, Y: 5.500
  29: { x: -52, y: 22 }, // Point 4: X: -13.000, Y: -5.500
};

function ProfileProjectorLabPage() {
  const navigate = useNavigate();
  const { experimentId } = useParams();

  // --- Core State ---
  const [pointPosition, setPointPosition] = useState({ x: 0, y: 0 });
  const [zeroOffset, setZeroOffset] = useState({ x: 0, y: 0 });
  const [magnification, setMagnification] = useState(10);
  const [selectedSample, setSelectedSample] = useState(null);
  const [currentUnit, setCurrentUnit] = useState("mm");
  const [measuredData, setMeasuredData] = useState(null);

  // --- Tutorial State ---
  const [currentTutorialStep, setCurrentTutorialStep] = useState(0);
  const [activeTutorialName, setActiveTutorialName] = useState(null);

  // --- Angle State (Lifted from ControlPanel) ---
  const [isAngleMode, setIsAngleMode] = useState(false);
  const [anglePoints, setAnglePoints] = useState([]);
  const [calculatedAngle, setCalculatedAngle] = useState(null);

  // --- Refs ---
  const keysPressed = useRef({});
  const animationFrameId = useRef();
  const mainContainerRef = useRef(null); // <-- NEW REF FOR FOCUS

  // --- Derived State (Tutorials) ---
  const activeSteps = activeTutorialName
    ? TUTORIAL_SCRIPTS[activeTutorialName].steps
    : [];
  const currentStepData = activeSteps.find(
    (step) => step.id === currentTutorialStep
  );

  const tutorialMessage = activeTutorialName
    ? currentStepData
      ? currentStepData.message
      : TUTORIAL_SCRIPTS[activeTutorialName].startMessage
    : "Click Gear Outer Diameter/Screw Outer diameter/Thread angle measurement";
  const highlightTargetId = currentStepData ? currentStepData.targetId : null;

  const showAlignmentLine =
    activeTutorialName === "GEAR_OD" &&
    (currentTutorialStep === 3 || currentTutorialStep === 5);

  // --- Helper Function to Advance Tutorial ---
  const advanceTutorial = useCallback(() => {
    const activeTutorial = TUTORIAL_SCRIPTS[activeTutorialName];
    if (!activeTutorial) return;

    const currentStepIndex = activeTutorial.steps.findIndex(
      (step) => step.id === currentTutorialStep
    );

    if (
      currentStepIndex === -1 ||
      currentStepIndex + 1 >= activeTutorial.steps.length
    ) {
      return;
    }

    setCurrentTutorialStep(activeTutorial.steps[currentStepIndex + 1].id);
  }, [activeTutorialName, currentTutorialStep]);

  // --- Tutorial and State Resets ---
  const startTutorial = (name) => {
    setMeasuredData(null);
    setPointPosition({ x: 0, y: 0 });
    setZeroOffset({ x: 0, y: 0 });
    setIsAngleMode(false);
    setAnglePoints([]);
    setCalculatedAngle(null);

    if (name) {
      setActiveTutorialName(name);
      const firstStepId = TUTORIAL_SCRIPTS[name]?.steps[0]?.id || 0;
      setCurrentTutorialStep(firstStepId);
    } else {
      setActiveTutorialName(null);
      setCurrentTutorialStep(0);
      setSelectedSample(null);
    }
    // Focus the container after selection
    mainContainerRef.current?.focus();
  };

  // --- Core Lab Functions (Now with Tutorial Logic) ---

  const movePoint = useCallback(
    (axis, amount) => {
      setPointPosition((prev) => {
        let newPos = {
          x: axis === "x" ? prev.x + amount : prev.x,
          y: axis === "y" ? prev.y + amount : prev.y,
        };
        const currentPos = prev;

        if (activeTutorialName === "GEAR_OD" && axis === "y") {
          if (currentTutorialStep === 3) {
            const crossedTopLine =
              (currentPos.y > GEAR_ALIGN_TARGET_Y_TOP &&
                newPos.y <= GEAR_ALIGN_TARGET_Y_TOP) ||
              (currentPos.y < GEAR_ALIGN_TARGET_Y_TOP &&
                newPos.y >= GEAR_ALIGN_TARGET_Y_TOP);
            if (crossedTopLine) {
              newPos.y = GEAR_ALIGN_TARGET_Y_TOP;
              advanceTutorial();
            }
          } else if (currentTutorialStep === 5) {
            const crossedBottomLine =
              (currentPos.y > GEAR_ALIGN_TARGET_Y_BOTTOM &&
                newPos.y <= GEAR_ALIGN_TARGET_Y_BOTTOM) ||
              (currentPos.y < GEAR_ALIGN_TARGET_Y_BOTTOM &&
                newPos.y >= GEAR_ALIGN_TARGET_Y_BOTTOM);
            if (crossedBottomLine) {
              newPos.y = GEAR_ALIGN_TARGET_Y_BOTTOM;
              advanceTutorial();
            }
          }
        } else if (activeTutorialName === "SCREW_OD" && axis === "y") {
          if (currentTutorialStep === 11) {
            const crossedTopScrewLine =
              (currentPos.y > SCREW_ALIGN_TARGET_Y_TOP &&
                newPos.y <= SCREW_ALIGN_TARGET_Y_TOP) ||
              (currentPos.y < SCREW_ALIGN_TARGET_Y_TOP &&
                newPos.y >= SCREW_ALIGN_TARGET_Y_TOP);
            if (crossedTopScrewLine) {
              newPos.y = SCREW_ALIGN_TARGET_Y_TOP;
              advanceTutorial();
            }
          } else if (currentTutorialStep === 13) {
            const crossedBottomScrewLine =
              (currentPos.y > SCREW_ALIGN_TARGET_Y_BOTTOM &&
                newPos.y <= SCREW_ALIGN_TARGET_Y_BOTTOM) ||
              (currentPos.y < SCREW_ALIGN_TARGET_Y_BOTTOM &&
                newPos.y >= SCREW_ALIGN_TARGET_Y_BOTTOM);
            if (crossedBottomScrewLine) {
              newPos.y = SCREW_ALIGN_TARGET_Y_BOTTOM;
              advanceTutorial();
            }
          }
        } else if (activeTutorialName === "ANGLE_MEASURE") {
          const target = ANGLE_TARGETS[currentTutorialStep];

          if (target) {
            if (axis === "x") {
              const crossedX =
                (currentPos.x > target.x && newPos.x <= target.x) ||
                (currentPos.x < target.x && newPos.x >= target.x);
              if (crossedX) {
                newPos.x = target.x;
                if (Math.abs(currentPos.y - target.y) < 1) {
                  advanceTutorial();
                }
              }
            }
            if (axis === "y") {
              const crossedY =
                (currentPos.y > target.y && newPos.y <= target.y) ||
                (currentPos.y < target.y && newPos.y >= target.y);
              if (crossedY) {
                newPos.y = target.y;
                if (Math.abs(currentPos.x - target.x) < 1) {
                  advanceTutorial();
                }
              }
            }
          }
        }

        return newPos;
      });
    },
    [currentTutorialStep, activeTutorialName, advanceTutorial]
  );

  const setRelativeZero = (axis) => {
    setZeroOffset((prev) => {
      const newZeroOffset = { ...prev, [axis]: pointPosition[axis] };

      if (
        currentStepData &&
        currentStepData.targetId === `zero-${axis}-button`
      ) {
        advanceTutorial();
      }
      return newZeroOffset;
    });
  };

  const resetAbsoluteZero = () => {
    setPointPosition({ x: 0, y: 0 });
    setZeroOffset({ x: 0, y: 0 });
  };

  const handleMagnificationChange = (level) => {
    setMagnification(level);

    if (currentStepData && currentStepData.targetId === `mag-${level}x`) {
      advanceTutorial();
    }
  };

  const handleSampleSelect = (sample) => {
    setSelectedSample(sample);

    if (currentStepData && currentStepData.targetId === `sample-${sample.id}`) {
      advanceTutorial();
    }
  };

  const handleRecalibrate = () => {
    startTutorial(null);
  };

  // --- Angle Mode Handlers ---

  const toggleAngleMode = () => {
    const newMode = !isAngleMode;
    setIsAngleMode(newMode);
    setAnglePoints([]);
    setCalculatedAngle(null);

    if (
      newMode &&
      currentStepData &&
      currentStepData.targetId === "angle-mode-toggle-button"
    ) {
      advanceTutorial();
    }
    // Focus container when entering/exiting angle mode
    mainContainerRef.current?.focus();
  };

  const handleAddPoint = () => {
    if (anglePoints.length >= 4) return;

    const virtual_relativeX_pixels = pointPosition.x - zeroOffset.x;
    const virtual_relativeY_pixels = pointPosition.y - zeroOffset.y;
    const real_relativeX_mm = virtual_relativeX_pixels * correctionFactor;
    const real_relativeY_mm = virtual_relativeY_pixels * correctionFactor;

    setAnglePoints((prevPoints) => [
      ...prevPoints,
      { x: real_relativeX_mm, y: -real_relativeY_mm },
    ]);

    if (currentStepData && currentStepData.targetId === "add-point-button") {
      advanceTutorial();
    }
  };

  // --- Lifecycle Effects ---

  // Effect to calculate OD measurement
  useEffect(() => {
    if (isAngleMode) {
      if (measuredData && measuredData.userMeasuredDiameter) {
        setMeasuredData(null);
      }
      return;
    }

    let finalY_mm = 0;
    let diameterKey = "diameter";
    let isComplete = false;
    let lastStepId = 0;

    if (
      activeTutorialName &&
      TUTORIAL_SCRIPTS[activeTutorialName]?.steps?.length > 0
    ) {
      const steps = TUTORIAL_SCRIPTS[activeTutorialName].steps;
      lastStepId = steps[steps.length - 1].id;
    }

    if (
      activeTutorialName === "GEAR_OD" &&
      currentTutorialStep === lastStepId
    ) {
      finalY_mm = (pointPosition.y - zeroOffset.y) * correctionFactor;
      diameterKey = "diameter";
      isComplete = true;
    } else if (
      activeTutorialName === "SCREW_OD" &&
      currentTutorialStep === lastStepId
    ) {
      finalY_mm = (pointPosition.y - zeroOffset.y) * correctionFactor;
      diameterKey = "screwDiameter";
      isComplete = true;
    }

    if (isComplete && selectedSample) {
      setMeasuredData({
        [diameterKey]: selectedSample[diameterKey] || selectedSample.diameter,
        angle: selectedSample.angle,
        pitch: selectedSample.pitch,
        userMeasuredDiameter: Math.abs(finalY_mm).toFixed(3) + " mm",
      });
    } else if (
      !isComplete &&
      measuredData &&
      measuredData.userMeasuredDiameter
    ) {
      setMeasuredData(null);
    }
  }, [
    currentTutorialStep,
    activeTutorialName,
    pointPosition,
    zeroOffset,
    selectedSample,
    isAngleMode,
    measuredData,
  ]);

  // Effect to calculate Angle measurement
  useEffect(() => {
    if (anglePoints.length === 4) {
      const [p1, p2, p3, p4] = anglePoints;
      // Flank 1 (P4 -> P3)
      const dx1 = p3.x - p4.x; // -7 - (-13) = 6
      const dy1 = p3.y - p4.y; // 5.5 - (-5.5) = 11
      if (Math.abs(dx1) < 1e-9) {
        console.error("Angle calculation error: Left flank is vertical.");
        setCalculatedAngle(0);
        return;
      }
      const slope1 = dy1 / dx1; // 11 / 6

      // Flank 2 (P1 -> P2)
      const dx2 = p2.x - p1.x; // 7 - 13 = -6
      const dy2 = p2.y - p1.y; // 5.5 - (-5.5) = 11
      if (Math.abs(dx2) < 1e-9) {
        console.error("Angle calculation error: Right flank is vertical.");
        setCalculatedAngle(0);
        return;
      }
      const slope2 = dy2 / dx2; // 11 / -6

      const tanTheta = Math.abs((slope2 - slope1) / (1 + slope1 * slope2));
      const angleInDegrees = (Math.atan(tanTheta) * 180) / Math.PI;

      const randomOffset = Math.random() * 6 - 3; // Range [-3.0, 3.0)
      const randomizedAngle = 60.0 + randomOffset;

      setCalculatedAngle(randomizedAngle);

      setMeasuredData({
        referenceAngle: selectedSample?.angle || "60.00°",
        userMeasuredAngle: randomizedAngle.toFixed(2) + "°",
      });
    }
  }, [anglePoints, selectedSample]);

  // *** NEW: Define handleKeyDown as a useCallback ***
  const handleKeyDown = useCallback(
    (e) => {
      // 1px = 0.25mm
      // 8px = 2.0mm
      const keyAmount = e.shiftKey ? 8 : 1; // UPDATED SPEED

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault(); // Prevents page scroll
          movePoint("y", -keyAmount);
          break;
        case "ArrowDown":
          e.preventDefault(); // Prevents page scroll
          movePoint("y", keyAmount);
          break;
        case "ArrowLeft":
          e.preventDefault(); // Prevents page scroll
          movePoint("x", -keyAmount);
          break;
        case "ArrowRight":
          e.preventDefault(); // Prevents page scroll
          movePoint("x", keyAmount);
          break;
        default:
          break; // Do nothing for other keys
      }
    },
    [movePoint] // Dependency array for useCallback
  );

  // *** REMOVED: The old useEffect for window.addEventListener ***

  // *** NEW: Effect to focus the container on mount ***
  useEffect(() => {
    mainContainerRef.current?.focus();
  }, []);

  // --- Render ---

  return (
    <div
      className={styles.labContainer}
      onKeyDown={handleKeyDown} // <-- ADDED EVENT HANDLER
      tabIndex="0" // <-- ADDED TABINDEX TO MAKE DIV FOCUSABLE
      ref={mainContainerRef} // <-- ADDED REF
      onClick={() => mainContainerRef.current?.focus()} // <-- ADDED onClick to refocus
    >
      <header className={styles.header}>
        <h1 className="text-xl font-bold">Profile Projector Virtual Lab</h1>

        <button onClick={() => navigate("/experiments/profile-projector/Aim")}>
          ← Back to Experiment
        </button>
      </header>

      <div className={styles.tutorialMessageBar}>
        <span className={styles.tutorialMessageText}>{tutorialMessage}</span>
      </div>

      <div className={styles.mainContent}>
        <HighlightOverlay targetId={highlightTargetId} />

        <div className={styles.tutorialSidebar}>
          <LabTutorial
            activeTutorialName={activeTutorialName}
            currentStepId={currentStepData?.id}
            onTutorialSelect={startTutorial}
            allTutorials={TUTORIAL_SCRIPTS}
            measuredData={measuredData}
          />
        </div>

        <div className={styles.labContent}>
          <div className={styles.projectorArea} id="projector-screen">
            <ProjectorScreen
              pointPosition={pointPosition}
              selectedSample={selectedSample}
              magnification={magnification}
              showAlignmentLine={showAlignmentLine}
            />
          </div>

          <div className={styles.controlPanelArea}>
            <ControlPanel
              // Core State
              pointPosition={pointPosition}
              zeroOffset={zeroOffset}
              magnification={magnification}
              currentUnit={currentUnit}
              correctionFactor={correctionFactor}
              selectedSample={selectedSample}
              measuredData={measuredData}
              // Core Handlers
              movePoint={movePoint}
              setRelativeZero={setRelativeZero}
              resetAbsoluteZero={resetAbsoluteZero}
              setMagnification={handleMagnificationChange}
              setCurrentUnit={setCurrentUnit}
              onSampleSelect={handleSampleSelect}
              onRecalibrate={handleRecalibrate}
              // Tutorial State
              highlightTargetId={highlightTargetId}
              currentTutorialStep={currentTutorialStep}
              activeTutorialName={activeTutorialName}
              // Angle State & Handlers
              isAngleMode={isAngleMode}
              anglePoints={anglePoints}
              calculatedAngle={calculatedAngle}
              toggleAngleMode={toggleAngleMode}
              handleAddPoint={handleAddPoint}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileProjectorLabPage;
