import React, { useEffect, useRef } from "react";
import styles from "./components/LabTutorial.module.css";

function LabTutorial({
  activeTutorialName,
  currentStepId,
  onTutorialSelect,
  allTutorials,
  measuredData,
}) {
  // --- FIX: DECLARE tutorialKeys HERE ---
  const tutorialKeys = Object.keys(allTutorials);
  // -------------------------------------

  const activeTutorial = activeTutorialName
    ? allTutorials[activeTutorialName]
    : null;

  // Get the data for the *current step only*
  const activeStepData =
    activeTutorial && currentStepId
      ? activeTutorial.steps.find((step) => step.id === currentStepId)
      : null;

  // Get the step number and total steps
  const stepIndex = activeTutorial
    ? activeTutorial.steps.findIndex((step) => step.id === currentStepId)
    : -1;
  const totalSteps = activeTutorial ? activeTutorial.steps.length : 0;
  const stepNumber = stepIndex !== -1 ? stepIndex + 1 : 0;

  // Find the ID of the last step
  const lastStepId =
    activeTutorial && totalSteps > 0
      ? activeTutorial.steps[totalSteps - 1].id
      : 0;
  const isLastStep = currentStepId === lastStepId && lastStepId !== 0;

  const containerRef = useRef(null);

  // Scroll-to-bottom effect when results appear on the last step
  useEffect(() => {
    if (isLastStep && containerRef.current) {
      // Use setTimeout to ensure measuredData has rendered and scrollHeight is correct
      const timer = setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTo({
            top: containerRef.current.scrollHeight, // Scroll to the very bottom
            behavior: "smooth",
          });
        }
      }, 50); // Keep small delay
      return () => clearTimeout(timer);
    }
  }, [isLastStep, measuredData, containerRef]); // Added measuredData

  // --- State 2: Displaying Active Step Card ---
  if (activeTutorial && activeStepData) {
    return (
      <div ref={containerRef} className={styles.container}>
        {/* Tutorial Title */}
        <h3
          className={styles.title}
          style={{ borderBottom: "1px solid #e2e8e0", paddingBottom: "8px" }}
        >
          {activeTutorial.name}
        </h3>

        {/* Change Tutorial Button */}
        <button
          onClick={() => onTutorialSelect(null)}
          className={styles.changeButton}
        >
          ← Change Tutorial
        </button>

        {/* --- Single Step Card --- */}
        <div className={styles.stepCard}>
          {/* Step Header (e.g., "Step 1 of 6") */}
          <div className={styles.stepHeader}>
            <span className={styles.stepNumber}>
              Step {stepNumber} of {totalSteps}
            </span>
          </div>

          {/* NEW: Conditional Image Container */}
          {/* NOTE: You need to ensure activeStepData.imageUrl is defined in TutorialsData.js */}
          {activeStepData.imageUrl && (
            <div className={styles.stepImageContainer}>
              <img
                src={activeStepData.imageUrl}
                alt={`Reference for step ${stepNumber}`}
                className={styles.stepImage}
              />
            </div>
          )}

          {/* Step Text (the instructions) */}
          <p className={styles.stepText}>{activeStepData.text}</p>

          {/* Measurement Results (only on last step) */}
          {isLastStep && measuredData && (
            <div className={styles.resultsInStep}>
              <hr className={styles.resultsSeparator} />
              <h4 className={styles.resultsTitleInStep}>
                Measurement Results:
              </h4>
              {measuredData.userMeasuredDiameter && (
                <p>
                  <strong>Your OD:</strong> {measuredData.userMeasuredDiameter}
                </p>
              )}
              {(measuredData.diameter || measuredData.screwDiameter) && (
                <p>
                  <strong>Reference OD:</strong>{" "}
                  {measuredData.diameter || measuredData.screwDiameter}
                </p>
              )}
              {measuredData.userMeasuredAngle && (
                <p>
                  <strong>Your Angle:</strong> {measuredData.userMeasuredAngle}
                </p>
              )}
              {measuredData.referenceAngle && (
                <p>
                  <strong>Reference Angle:</strong>{" "}
                  {measuredData.referenceAngle}
                </p>
              )}
              {measuredData.pitch && (
                <p>
                  <strong>Reference Pitch:</strong> {measuredData.pitch}
                </p>
              )}
            </div>
          )}
        </div>
        {/* --- End Single Step Card --- */}

        <div className="mt-4">
          <h4 className="font-bold text-slate-700">Keyboard Controls:</h4>
          <p className="text-sm text-slate-500">Arrow Keys (X/Y-axis)</p>
        </div>

        {/* Invisible footer */}
        <div className={styles.scrollFooter}></div>
      </div>
    );
  }

  // --- State 1: Displaying Tutorial Selection Cards (Default View) ---
  return (
    <div ref={containerRef} className={styles.container}>
      <h3 className={styles.title}>Select a Measurement Tutorial</h3>
      <div className={styles.cardList}>
        {tutorialKeys.map((key) => {
          // <-- This is where the error was occurring
          const tutorial = allTutorials[key];
          return (
            <div
              key={key}
              onClick={() => onTutorialSelect(key)}
              className={styles.tutorialCard}
            >
              <h4 className={styles.cardTitle}>{tutorial.name}</h4>
              <p className={styles.cardDescription}>{tutorial.description}</p>
            </div>
          );
        })}
      </div>
      <div className={styles.scrollFooter}></div>
    </div>
  );
}

export default LabTutorial;
