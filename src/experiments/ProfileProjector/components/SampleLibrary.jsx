import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchExperimentSamples } from "../../../repositories/lab_repo";
import styles from "./SampleLibrary.module.css";

// Prefix the base URL for the repository to all static asset paths
const BASE_URL_PREFIX = import.meta.env.BASE_URL;

const HARDCODED_SAMPLES = {
  "profile-projector": [
    {
      id: "gear",
      name: "Gear",
      // FIX: Use BASE_URL_PREFIX
      imageUrl: BASE_URL_PREFIX + "assets/samples/gear.png",
      diameter: "44.00 mm",
      angle: "20°",
      type: "image",
    },
    {
      id: "screw",
      name: "Threaded Screw",
      // FIX: Use BASE_URL_PREFIX
      imageUrl: BASE_URL_PREFIX + "assets/samples/screw.png",
      screwDiameter: "17.00 mm",
      pitch: "0.8 mm",
      type: "image",
    },
    {
      id: "v-profile",
      name: "V-Profile",
      // FIX: Use BASE_URL_PREFIX
      imageUrl: BASE_URL_PREFIX + "assets/samples/thread.png",
      type: "image",
      angle: "60.00°",
    },
  ],
};

// Mock fetch remains the same
const mockFetchExperimentSamples = async (experimentId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(HARDCODED_SAMPLES[experimentId] || []);
    }, 500);
  });
};

function SampleLibrary({
  onSampleSelect,
  selectedSampleId,
  highlightTargetId,
  disabled,
}) {
  const experimentId = "profile-projector";

  const {
    data: samples,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["samples", experimentId],
    queryFn: () => mockFetchExperimentSamples(experimentId),
  });

  // ... (loading and error states remain the same) ...
  if (isLoading) {
    return (
      <div className={styles.container}>
        <p>Loading samples...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>Error loading samples.</p>
      </div>
    );
  }

  if (!samples || samples.length === 0) {
    return (
      <div className={styles.container}>
        <p>No samples found.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Sample Library</h3>
      <div className={styles.sampleGrid}>
        {samples.map((sample) => (
          <button
            key={sample.id}
            onClick={() => onSampleSelect(sample)}
            className={`${styles.sampleButton} ${
              selectedSampleId === sample.id ? styles.selected : ""
            }`}
            id={`sample-${sample.id}`}
            disabled={disabled}
          >
            {/* **Conditionally render image or placeholder** */}
            {sample.imageUrl ? (
              <div
                className={styles.sampleProfile}
                // FIX: The CSS background image uses the corrected sample.imageUrl
                style={{ backgroundImage: `url(${sample.imageUrl})` }}
              ></div>
            ) : (
              // Placeholder for CSS samples
              <div
                className={`${styles.sampleProfile} ${styles.cssSampleIcon}`}
              >
                <span> V </span>
              </div>
            )}
            <span className={styles.sampleName}>{sample.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SampleLibrary;
