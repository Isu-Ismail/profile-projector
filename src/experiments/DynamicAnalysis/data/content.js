// This file holds the content for the informational pages (Aim, Theory, Procedure, etc.)

export const pageContent = {
  Aim: {
    title: "Dynamic Analysis of Four Bar Mechanism",
    sections: [
      {
        type: "paragraph",
        text: "The purpose of this experiment is to analyze offset, acceleration of center of gravity of links, and forces on each link of a four-bar mechanism with the help of position, velocity, and acceleration diagrams. This is crucial for understanding the performance and design limits of mechanical systems."
      },
    ],
  },
  Theory: {
    title: "Fundamentals of Four Bar Mechanism Dynamics",
    sections: [
      {
        type: "paragraph",
        text: "A four-bar mechanism consists of four rigid links connected by four pin joints. Dynamic analysis involves considering the masses and mass moments of inertia of the links, as well as the external forces and torques. This leads to the calculation of forces, including inertia forces, which are necessary for balancing the mechanism and ensuring structural integrity."
      },
      {
        type: "list",
        items: [
          "Inertia Force: Force required to accelerate the center of gravity of a link ($F_i = m \cdot a_{cg}$)",
          "Torque: The moment applied to accelerate a link angularly ($\tau = I \cdot \alpha$)",
          "Dynamic Equilibrium: The state where the sum of external and inertia forces/torques is zero, simplifying force analysis.",
        ]
      },
    ],
  },
  Procedure: {
    title: "Manual Procedure for Dynamic Analysis",
    sections: [
      {
        type: "paragraph",
        text: "Follow these steps in the simulation to perform a dynamic analysis:"
      },
      {
        type: "list",
        items: [
          "**Step 1: Set Initial Conditions.** Select your desired crank speed and link dimensions.",
          "**Step 2: Position Analysis.** Use the measurement tools to determine the instantaneous positions of all joints and centers of gravity.",
          "**Step 3: Velocity Analysis.** Construct the velocity diagram (or use the tool) to find the angular velocities of the coupler and follower.",
          "**Step 4: Acceleration Analysis.** Construct the acceleration diagram to find the acceleration of the center of gravity for each moving link.",
          "**Step 5: Dynamic Force Calculation.** Calculate the inertia forces and torques. Use the virtual lab's force analysis tool to determine the pin forces.",
        ]
      },
    ],
  },
  References: {
    title: "Suggested Reading",
    sections: [
      {
        type: "list",
        items: [
          "Theory of Machines and Mechanisms - J. J. Uicker, G. R. Pennock, J. E. Shigley",
          "Kinematics and Dynamics of Machinery - R. L. Norton",
        ]
      },
    ],
  },
};

// Map of topics to page keys
export const topicMap = {
  Aim: 'Aim',
  Theory: 'Theory',
  Procedure: 'Procedure',
  Test1: 'Pretest', // Placeholder for Test 1/Pretest
  Test2: 'Posttest', // Placeholder for Test 2/Posttest
  References: 'References',
};