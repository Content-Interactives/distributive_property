// src/template/Footer/buttons.jsx
import React from 'react';

function Buttons({ current_step, total_steps, on_next, on_prev }) {
  return (
    // Mobile buttons only - desktop buttons are now in Template.jsx
    <div className="md:hidden fixed bottom-4 right-4 flex gap-3 z-50">
      <button 
        onClick={on_prev}
        disabled={current_step === 1}
        className="w-12 h-12 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-xl transition-colors shadow-xl"
      >
        ←
      </button>
      
      <button 
        onClick={on_next}
        disabled={current_step === total_steps}
        className="w-12 h-12 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-xl transition-colors shadow-xl"
      >
        →
      </button>
    </div>
  );
}

export default Buttons;