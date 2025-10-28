const BASE_URL_PREFIX = import.meta.env.BASE_URL;

const GEAR_OD_STEPS = [
  {
    id: 1,
    message:
      "Step 1: Click the Gear from the sample Library",
    text: "Click the 'Gear' sample button.",
    targetId: "sample-gear",
  },
  {
    id: 2,
    message: "Step 2: Set the Magnification. Select **20x** for better precision.",
    text: "Click the '20x' magnification button.",
    targetId: "mag-20x",
  },
  {
    id: 3,
    message:
"Step 3: Click up Arrrow to align the **bottom-most tooth edge** with the X-axis (blue line) **(i.e., 21.500)**.",
    text: "Use the **Arrow Keys**. Press the **UP Arrow (▲)** key until the gear auto-stops. The DRO should read 21.500.",
    targetId: "dro-panel", // Highlight DRO during alignment
    imageUrl: BASE_URL_PREFIX + "assets/tutorials/gear_up.png" // FIXED PATH
  },
  {
    id: 4,
    message: "Step 4: Click the highlighted '0' button at Digital Readout.",
    text: "Click the '0' button beside the Y-axis Digital Readout.",
    targetId: "zero-y-button",
  },
  {
    id: 5,
    message:
      "Step 5: Click down Arrrow to align the **top-most tooth edge** with the X-axis (blue line) **(i.e., -42.500)**.",
    text: "Use the **Arrow Keys**. Press the **DOWN Arrow (▼)** key until the gear auto-stops. The DRO should read -42.500.",
    targetId: "dro-panel", // Highlight DRO during alignment
    imageUrl: BASE_URL_PREFIX + "assets/tutorials/gear_down.png" // FIXED PATH
  },
  {
    id: 6,
    message:
      "Step 6: Gear Outer Diameter was measured. Refer Measurement panel.\nClick Home for next/new measurement.",
    text: "Read the final dimension from the DRO. The measured data is displayed in the control panel.",
    targetId: "results-table",
  },
];

// --- CORRECTED Steps for Screw OD ---
const SCREW_OD_STEPS = [
  {
    id: 10,
    message: "Step 1: Click the Threaded Screw  from the sample Library",
    text: "Click the 'Threaded Screw' sample button.",
    targetId: "sample-screw",
  },
  {
    id: 11,
    message:
      "Step 2: Click up Arrrow to align the **bottom-most tooth edge** with the X-axis (i.e., 8.500)**.",
    text: "Use the **Arrow Keys**. Press the **UP Arrow (▲)** key until the screw auto-stops. The DRO should read +8.500.",
    // **FIX: Highlight DRO**
    targetId: "dro-panel",
    imageUrl: BASE_URL_PREFIX + "assets/tutorials/screw_up.png" // FIXED PATH
  },
  {
    id: 12,
    message: "Step 3: Click the highlighted '0' button at Digital Readout.",
    text: "Click the '0' button beside the Y-axis Digital Readout.",
    // **FIX: Highlight Zero Y Button**
    targetId: "zero-y-button",
  },
  {
    id: 13,
    message:
      "Step 4: Click down Arrrow to align the **top-most tooth edge** with the X-axis **(i.e., -20.000)**",
    text: "Use the **Arrow Keys**. Press the **DOWN Arrow (▼)** key again until the screw auto-stops. The DRO should read -20.000.",
    // **FIX: Highlight DRO**
    targetId: "dro-panel",
    imageUrl: BASE_URL_PREFIX + "assets/tutorials/screw_down.png" // FIXED PATH
  },
  {
    id: 14,
    message:
      "Step 5: Screw Outer Diameter was measured. Refer Measurement Results panel.Click Home for next/new experiment.",
    text: "Read the final dimension from the DRO. The measured data is displayed in the control panel.",
    targetId: "results-table",
  },
];

const ANGLE_MEASURE_STEPS = [
  {
    id: 20,
    message: "Step 1: Click the V-Profile from the sample Library",
    text: "Click the 'V-Profile' sample button.",
    targetId: "sample-v-profile",
  },
  {
    id: 21,
    message: "Step 1: Click the V-Profile from the sample Library",
    text: "Click the '50x' magnification button.",
    targetId: "mag-50x",
  },
  {
    id: 22,
    message: "Step 3: Click Start Angle Measure button.",
    text: "Click the 'Start Angle Measure' button in the control panel.",
    targetId: "angle-mode-toggle-button",
  },
  {
    // --- CORRECTED POINT 1 ---
    id: 23,
    message: "Step 4: Use arrow key to align the cross hair with point 1 (13.000, -5.500)",
    text: "Use Arrow Keys to align the crosshair to Point 1. The DRO will read **X: 13.000** and **Y: -5.500**.",
    targetId: "dro-panel",
    imageUrl: BASE_URL_PREFIX + "assets/tutorials/point1.png" // FIXED PATH
    // Highlight DRO
  },
  {
    id: 24,
    message: "Step 5: Click the Add Point button.",
    text: "Click 'Add Point' to record the coordinates of Point 1.",
    targetId: "add-point-button", // Highlight Add Point button
  },
  {
    // --- CORRECTED POINT 2 ---
    id: 25,
    message: "Step 6: Use arrow key to align the cross hair with point 2 (7.000, 5.500)",
    text: "Use Arrow Keys to align the crosshair to Point 2. The DRO will read **X: 7.000** and **Y: 5.500**.",
    targetId: "dro-panel",
    imageUrl: BASE_URL_PREFIX + "assets/tutorials/point2.png" // FIXED PATH
  },
  {
    id: 26,
    message: "Step 7: Click the Add Point button.",
    text: "Click 'Add Point' to record the coordinates of Point 2.",
    targetId: "add-point-button", // Highlight Add Point button
    
  },
  {
    // --- CORRECTED POINT 3 ---
    id: 27,
    message: "Step 8: Use arrow key to align the cross hair with point 2 (-7.000, 5.500)",
    text: "Use Arrow Keys to align the crosshair to Point 3. The DRO will read **X: -7.000** and **Y: 5.500**.",
    targetId: "dro-panel",
    imageUrl: BASE_URL_PREFIX + "assets/tutorials/point3.png" // FIXED PATH
  },
  {
    id: 28,
    message: "Step 9: Click the Add Point button.",
    text: "Click 'Add Point' to record the coordinates of Point 3.",
    targetId: "add-point-button", // Highlight Add Point button
  },
  {
    // --- CORRECTED POINT 4 ---
    id: 29,
    message: "Step 10: Use arrow key to align the cross hair with point 2 (-13.000, -5.500)",
    text: "Use Arrow Keys to align the crosshair to Point 4. The DRO will read **X: -13.000** and **Y: -5.500**.",
    targetId: "dro-panel", 
    imageUrl: BASE_URL_PREFIX + "assets/tutorials/point4.png"// FIXED PATH
  },
  {
    id: 30,
    message: "Step 11: Click the Add Point button.",
    text: "Click 'Add Point' to record the coordinates of Point 4. The angle will be calculated.",
    targetId: "add-point-button", // Highlight Add Point button
  },
  {
    id: 31,
    message: "Step 12: V profile angle was measured.' Click Home for next/new experiment'.",
    text: "The calculated angle is shown in the results area.",
    targetId: "angle-result-display", // Highlight result
  },
];


export const TUTORIAL_SCRIPTS = {
  GEAR_OD: {
    name: "Gear Outer Diameter (OD)",
    description:
      "Measure the distance across the gear teeth tips (major diameter).",
    steps: GEAR_OD_STEPS,
    startMessage: "Starting tutorial for Gear Outer Diameter.",
  },
  SCREW_OD: {
    name: "Screw Outer Diameter (OD)",
    description: "Measure the distance across the thread crests.",
    steps: SCREW_OD_STEPS,
    startMessage: "Starting tutorial for Screw Outer Diameter.",
  },
  ANGLE_MEASURE: {
    name: "Thread Angle Measurement",
    description: "Measure the flank angle of a V-profile using 4 points.",
    steps: ANGLE_MEASURE_STEPS,
    startMessage: "Starting tutorial for Angle Measurement.",
  },
};