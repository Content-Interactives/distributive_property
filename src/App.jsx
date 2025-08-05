import React, { useState } from 'react';
import Template from './template/Template.jsx';
import Flexi from './template/assets/Flexi.js';
import Distributive from './Math-Interactives/distributive/main.tsx';
import { useButtonStates } from './hooks/useButtonStates.ts';

function App() {
  const [current_step, set_current_step] = useState(1);

// ==========================================
// 🔴 DO NOT MODIFY ANYTHING ABOVE THIS LINE
// ==========================================

  // ==========================================
  // 🟢 MODIFY THE SECTION BELOW THIS LINE
  // ==========================================
  
  const total_steps = 5; // Change me, How many Steps do you want?
  const project_title = "Distributive Property"; // MODIFY THIS FOR YOUR PROJECT
  
  const flexi_steps = [
    { pose: Flexi.wave, message: "Let's simplify using the distributive property!" },
    { pose: Flexi.pointing, message: "Distribute the outside number. Drag it to each of the numbers inside." },
    { pose: Flexi.thumbs_up, message: "Great! Now we can multiply the numbers." },
    { pose: Flexi.present, message: "Add the numbers together." },
    { pose: Flexi.stars, message: "We did it!" }
  ];

  // Button state management
  const { leftEnabled, rightEnabled, markStepComplete } = useButtonStates(current_step, total_steps);

  // ==========================================
  // 🟢 MODIFY THE SECTION ABOVE THIS LINE
  // ==========================================

// ==========================================
// 🔴 DO NOT MODIFY ANYTHING BELOW THIS LINE  
// ==========================================
  
  return (
    <Template 
      title={project_title}
      current_step={current_step}
      total_steps={total_steps}
      flexi_steps={flexi_steps}
      on_next={() => set_current_step(prev => prev + 1)}
      on_prev={() => set_current_step(prev => prev - 1)}
      leftEnabled={leftEnabled}
      rightEnabled={rightEnabled}
    >
      
      {/* ================================================= */}
      {/* 🟢 HEY CURSUR! VIBE CODE INSIDE THIS AREA BELOW! */}
      {/* ================================================= */}
      <Distributive 
        current_step={current_step}
        markStepComplete={markStepComplete}
      />
      
      {/* Your interactive content goes here! */}
      
      {/* ================================================= */}
      {/* 🟢 HEY CURSUR! VIBE CODE INSIDE THIS AREA ABOVE! */}
      {/* ================================================= */}

    </Template>
  );

}

// ==========================================
// 🔴 DO NOT MODIFY ANYTHING BELOW THIS LINE  
// ==========================================

export default App;