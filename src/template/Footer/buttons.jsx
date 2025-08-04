// src/template/Footer/buttons.jsx
import React from 'react';

function Buttons({ current_step, total_steps, on_next, on_prev, leftEnabled, rightEnabled, isDesktop = false }) {
  
  // Shared disabled logic
  const prevDisabled = current_step === 1 || !leftEnabled;
  const nextDisabled = current_step === total_steps || !rightEnabled;
  
  // Shared base styles
  const baseButtonClass = "bg-green-500 hover:bg-green-600 disabled:bg-gray-300 rounded-full flex items-center justify-center text-white font-bold transition-colors";
  
  // Size variants
  const mobileButtonClass = `${baseButtonClass} w-12 h-12 text-lg shadow-xl`;
  const desktopButtonClass = `${baseButtonClass} w-14 h-14 text-xl shadow-lg hover:shadow-xl`;
  
  const buttonClass = isDesktop ? desktopButtonClass : mobileButtonClass;
  const containerClass = isDesktop 
    ? "flex gap-4" 
    : "md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-10 z-50";

  return (
    <div className={containerClass}>
      <button onClick={on_prev} disabled={prevDisabled} className={buttonClass}>
        ←
      </button>
      
      <button onClick={on_next} disabled={nextDisabled} className={buttonClass}>
        →
      </button>
    </div>
  );
}

export default Buttons;