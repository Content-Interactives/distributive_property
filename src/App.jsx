import React, { useState } from 'react';
import Template from './template/Template.jsx';
import Flexi from './template/assets/Flexi.js';
import Distributive from './Math-Interactives/distributive/main.tsx';

function App() {
  const [current_step, set_current_step] = useState(1);

// ==========================================
// 🔴 DO NOT MODIFY ANYTHING ABOVE THIS LINE
// ==========================================

  // ==========================================
  // 🟢 MODIFY THE SECTION BELOW THIS LINE
  // ==========================================
  
  const total_steps = 4; // Change me, How many Steps do you want?
  const project_title = "Distributive Property"; // MODIFY THIS FOR YOUR PROJECT
  
  const flexi_steps = [
    { pose: Flexi.confident, message: "[TEXT1]" },
    { pose: Flexi.teacher, message: "[TEXT2]" },
    { pose: Flexi.thumbs_up, message: "[TEXT3]" },
    { pose: Flexi.pointing, message: "[TEXT4]" },
    { pose: Flexi.pointing, message: "I have an extra slide" }
  ];

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
    >
      
      {/* ================================================= */}
      {/* 🟢 HEY CURSUR! VIBE CODE INSIDE THIS AREA BELOW! */}
      {/* ================================================= */}
      <Distributive current_step={current_step}></Distributive>
      
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