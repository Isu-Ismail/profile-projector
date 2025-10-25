// This file holds the content for the informational pages and tests of the Profile Projector Lab.

// --- Pre-Test Questions ---
const pretestQuestions = [
  // ... (questions remain the same) ...
  {
    id: 'pre_q1',
    question: "What is the primary purpose of a profile projector?",
    options: [
      "To cut metal precisely",
      "To measure dimensions by projecting a magnified image",
      "To test the hardness of materials",
      "To weld small components",
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 'pre_q2',
    question: "A profile projector works based on the principles of:",
    options: [
      "Magnetism",
      "Chemical reactions",
      "Geometric optics",
      "Nuclear physics",
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 'pre_q3',
    question: "What does the screen on a profile projector display?",
    options: [
      "A digital readout of coordinates",
      "A magnified silhouette or profile of the workpiece",
      "A live video feed from a camera",
      "A graph of material stress",
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 'pre_q4',
    question: "The component used to move the workpiece under the lens is called the:",
    options: [
      "Projector screen",
      "Magnification lens",
      "Light source",
      "Workstage or stage",
    ],
    correctAnswerIndex: 3,
  },
  {
    id: 'pre_q5',
    question: "What does DRO stand for in the context of a profile projector?",
    options: [
      "Digital Read Out",
      "Direct Reading Object",
      "Dimensional Reference Origin",
      "Data Recording Output",
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 'pre_q6',
    question: "Measurement using a profile projector is typically:",
    options: [
      "Contact-based",
      "Non-contact based",
      "Destructive",
      "Based on weight",
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 'pre_q7',
    question: "Which of these components is NOT typically found on a profile projector?",
    options: [
      "Projection lens",
      "Illumination source",
      "Laser cutter",
      "Measuring stage",
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 'pre_q8',
    question: "Common magnification levels on a profile projector might include:",
    options: [
      "1x, 2x, 3x",
      "10x, 20x, 50x",
      "1000x, 2000x, 5000x",
      "0.1x, 0.2x, 0.5x",
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 'pre_q9',
    question: "Profile projectors are often used to inspect:",
    options: [
      "Large engine blocks",
      "Rough surface finishes",
      "Complex shapes like threads and gear teeth",
      "The chemical composition of liquids",
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 'pre_q10',
    question: "What happens to the image projected on the screen compared to the actual workpiece?",
    options: [
      "It is smaller and upright",
      "It is the same size and inverted",
      "It is magnified and typically inverted",
      "It is magnified and always upright",
    ],
    correctAnswerIndex: 2,
  },
];

// --- Post-Test Questions ---
const posttestQuestions = [
  // ... (questions remain the same) ...
  {
    id: 'post_q1',
    question: "When you change the magnification from 10x to 20x, what happens to the image on the screen?",
    options: [
      "It becomes smaller",
      "It becomes larger",
      "It stays the same size but gets brighter",
      "It rotates 90 degrees",
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 'post_q2',
    question: "Why is it important to 'zero' the DRO before taking a relative measurement?",
    options: [
      "To turn the machine on",
      "To set the starting point (reference) for the measurement",
      "To change the magnification",
      "To clean the lens",
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 'post_q3',
    question: "To measure the outer diameter of a gear, you typically align the crosshair with:",
    options: [
      "The center hole",
      "The root between two teeth",
      "The top edge of one tooth, zero, then the bottom edge of the opposite tooth",
      "Any two adjacent teeth",
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 'post_q4',
    question: "If the DRO reads 5.500 mm after moving from one point to another, this value represents:",
    options: [
      "The magnification level",
      "The total length of the object",
      "The distance the stage moved between the two points",
      "The angle of the object",
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 'post_q5',
    question: "A potential source of error when using a profile projector could be:",
    options: [
      "Incorrect alignment of the workpiece feature with the crosshair",
      "Using the wrong magnification",
      "Forgetting to turn on the light",
      "All of the above",
    ],
    correctAnswerIndex: 3,
  },
  {
    id: 'post_q6',
    question: "Changing the magnification from 10x to 20x affects the DRO reading for a given physical movement by:",
    options: [
      "Doubling it",
      "Halving it",
      "Making no difference", // Assuming a calibrated DRO
      "Making it random",
    ],
    correctAnswerIndex: 2, // The DRO should show the *actual* distance moved, irrespective of visual magnification.
  },
  {
    id: 'post_q7',
    question: "Which feature would be difficult to measure accurately using only a basic profile projector?",
    options: [
      "The diameter of a hole",
      "The angle between two edges",
      "The internal structure of a solid object",
      "The pitch of a screw thread",
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 'post_q8',
    question: "The accuracy of measurements primarily depends on:",
    options: [
      "The brightness of the lamp",
      "The size of the screen",
      "The precision of the stage movement and DRO system",
      "The color of the workpiece",
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 'post_q9',
    question: "What is the purpose of the crosshairs on the screen?",
    options: [
      "To focus the image",
      "To provide a fixed reference point for alignment",
      "To measure the screen size",
      "To adjust the brightness",
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 'post_q10',
    question: "If you align one edge, zero the DRO, move to another edge, and the DRO reads -15.000 mm, what is the distance between the edges?",
    options: [
      "-15.000 mm",
      "15.000 mm",
      "30.000 mm",
      "Cannot be determined",
    ],
    correctAnswerIndex: 1, // Distance is typically considered positive
  },
];


// --- Page Content Definition ---
export const pageContent = {
  Aim: {
    title: "Study of Profile Projector and Measurement of Object Dimensions",
    sections: [
      {
        type: "paragraph",
        text: "The purpose of this experiment is to study the construction and working principle of a profile projector (or optical comparator) and use it to accurately measure the dimensions of various components like screw threads, gears, and other complex profiles.",
      },
    ],
  },
  Theory: {
    title: "Optical Comparators (Profile Projectors) Theory",
    sections: [
      {
        type: "paragraph",
        text: "A profile projector is an optical instrument that projects a magnified profile image of a workpiece onto a screen. This allows for non-contact measurement and inspection of its dimensions and form. It works based on the principles of geometric optics, using lenses to create a large, inverted image.",
      },
      {
        type: "list",
        items: [
          "Principle: Magnification is achieved using projection lenses.",
          "Measurements: Taken using the Digital Readout (DRO) attached to the precision mechanical stage.",
          "Key Parameters: Magnification level (e.g., 10x, 20x, 50x) and Measurement units (mm, µm).",
        ],
      },
    ],
  },
  // --- UPDATED Procedure Section ---
  Procedure: {
    title: "Experimental Procedure",
    sections: [
      {
        type: "paragraph",
        text: "Follow the tutorial on the simulation screen for guided measurements. The general steps are:",
      },
      {
        type: "list",
        items: [
          "**Select Sample:** Choose an object (e.g., Gear) from the library.",
          "**Align Start:** Use Arrow Keys to align the starting feature with the crosshair/guide line.",
          "**Zero DRO:** Click the '0' button for the relevant axis (X or Y).",
          "**Align End:** Use Arrow Keys to move and align the ending feature.",
          "**Read DRO:** The value shown on the DRO is the measured dimension.",
        ],
      },
    ],
  },
  Pretest: {
    title: "Pre-Test on Profile Projectors",
    sections: [
      { type: 'paragraph', text: 'Answer the following questions to test your basic understanding.' },
      { type: 'mcq', questions: pretestQuestions }
    ]
  },
  Posttest: {
    title: "Post-Test and Evaluation",
    sections: [
       { type: 'paragraph', text: 'Answer the following questions to assess what you learned.' },
       { type: 'mcq', questions: posttestQuestions }
    ]
  },
  References: {
    title: "Suggested Reading",
    sections: [
      {
        type: "paragraph",
        text: "Textbook references for further study on metrology and measuring instruments.",
      },
    ],
  },
};

// Map of topics to page keys
export const topicMap = {
  Aim: "Aim",
  Theory: "Theory",
  Procedure: "Procedure",
  Test1: "Pretest",
  Test2: "Posttest",
  References: "References",
};