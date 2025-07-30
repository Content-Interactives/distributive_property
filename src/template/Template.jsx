import React, { useState, useEffect } from 'react';
import { Title } from './Header';
import Buttons from './Footer/buttons.jsx';
import Flexi from './assets/Flexi.js';

function Template({ title, current_step, total_steps, flexi_steps, on_next, on_prev, children }) {
  const [flexi, set_flexi] = useState(Flexi.confident);
  const [flexi_message, set_flexi_message] = useState("Ready to learn!");

  useEffect(() => {
    const step_data = flexi_steps[current_step - 1];
    set_flexi(step_data.pose);
    set_flexi_message(step_data.message);
  }, [current_step, flexi_steps]);

  return (
    <div className="w-screen h-screen bg-gray-50 flex items-center justify-center p-[2%]">
      <div className="w-full h-full bg-white rounded-2xl shadow-lg flex flex-col">
        <Title>{title}</Title>
        
        <div className="flex-1 p-8">
          {children}
        </div>

        
        <Buttons 
          current_step={current_step}
          total_steps={total_steps}
          on_next={on_next}
          on_prev={on_prev}
        />
        {/* Flexi - independent positioning */}
        <div className="md:hidden fixed bottom-4 left-4 z-40">
          <img src={flexi} className="w-20 h-20" />
        </div>

        {/* Speech bubble - independent positioning */}
        <div className="md:hidden fixed bottom-20 left-28 z-40">
          <div className="bg-white rounded-lg p-2 shadow-lg text-xs border border-gray-200 max-w-[140px] leading-tight max-h-32 overflow-y-auto break-words hyphens-none">
            {flexi_message}
          </div>
        </div>

        {/* Desktop Flexi with integrated buttons */}
        <div className="hidden md:block h-[25%] p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-gray-200 relative">
          <div className="flex items-center gap-8 h-full">
            <img 
              src={flexi} 
              alt="Flexi" 
              className="w-32 h-32 flex-shrink-0"
            />
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-lg leading-relaxed max-w-2xl">
              {flexi_message}
            </div>
          </div>
          
          {/* Desktop buttons - bottom right corner */}
          <div className="absolute bottom-6 right-6 flex gap-4">
            <button 
              onClick={on_prev}
              disabled={current_step === 1}
              className="w-14 h-14 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-xl transition-colors shadow-lg hover:shadow-xl"
            >
              ←
            </button>
            
            <button 
              onClick={on_next}
              disabled={current_step === total_steps}
              className="w-14 h-14 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-xl transition-colors shadow-lg hover:shadow-xl"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Template;
