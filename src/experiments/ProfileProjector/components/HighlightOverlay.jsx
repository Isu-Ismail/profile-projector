import React, { useState, useEffect, useRef } from "react"; // Added useRef
import styles from "./HighlightOverlay.module.css";

function HighlightOverlay({ targetId }) {
  const [highlight, setHighlight] = useState(null);
  const timeoutRef = useRef(null); // Ref to store timeout ID

  useEffect(() => {
    // Clear any existing timeout when targetId changes
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!targetId) {
      setHighlight(null);
      return;
    }

    const controlPanelElement = document.getElementById("control-panel");

    const findAndSetHighlight = () => {
      const targetElement = document.getElementById(targetId);
      if (!targetElement) {
        setHighlight(null);
        // Optional: Retry if target is expected but not found immediately
        // console.warn(`Highlight target element not found: ${targetId}`);
        return;
      }

      const rect = targetElement.getBoundingClientRect();
      setHighlight({
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left,
      });

      // Scroll into view if needed (after setting highlight might be smoother)
      if (controlPanelElement && controlPanelElement.contains(targetElement)) {
        targetElement.scrollIntoView({
          behavior: "auto",
          block: "nearest",
          inline: "nearest",
        });
      }
    };

    // **FIX: Use setTimeout to delay finding the element slightly**
    // This allows conditional elements like the results table to render first.
    timeoutRef.current = setTimeout(findAndSetHighlight, 50); // 50ms delay

    // Add scroll/resize listeners
    const scrollListener = controlPanelElement ? findAndSetHighlight : null;
    const resizeListener = findAndSetHighlight;

    if (scrollListener) {
      controlPanelElement.addEventListener("scroll", scrollListener);
    }
    window.addEventListener("resize", resizeListener);

    // Cleanup function
    return () => {
      // Clear timeout on cleanup
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      // Remove listeners
      if (scrollListener && controlPanelElement) {
        controlPanelElement.removeEventListener("scroll", scrollListener);
      }
      window.removeEventListener("resize", resizeListener);
    };
  }, [targetId]); // Re-run effect when targetId changes

  if (!highlight) return null;

  return (
    <div
      className={styles.highlightOverlay}
      style={{
        width: `${highlight.width}px`,
        height: `${highlight.height}px`,
        top: `${highlight.top}px`,
        left: `${highlight.left}px`,
      }}
    />
  );
}

export default HighlightOverlay;
