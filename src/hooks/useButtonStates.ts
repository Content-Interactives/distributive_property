import { useState, useEffect } from 'react';

export function useButtonStates(current_step: number, total_steps: number) {
  // Track completed steps in a simple way
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set([1]));

  // Mark a step as completed (called from components)
  const markStepComplete = (step: number) => {
    setCompletedSteps(prev => {
      if (prev.has(step)) return prev; // Already completed, no change
      return new Set([...prev, step]);
    });
  };

  // Step-specific rules
  const getButtonStates = (step: number) => {
    const isCompleted = (s: number) => completedSteps.has(s);
    
    switch(step) {
      case 1:
        return { 
          leftEnabled: false, 
          rightEnabled: true // Can always go to step 2
        };
      case 2:
        return { 
          leftEnabled: true, 
          rightEnabled: isCompleted(3) // Can go forward if step 3 is unlocked (drag completed)
        };
      case 3:
        return { 
          leftEnabled: true, 
          rightEnabled: isCompleted(4) // Can go forward if step 4 is unlocked (animation done)
        };
      case 4:
        return { 
          leftEnabled: true, 
          rightEnabled: isCompleted(5) // Can go forward if step 5 is unlocked (animation done)
        };
      case 5:
        return { 
          leftEnabled: true, 
          rightEnabled: false // Final step
        };
      default:
        return { leftEnabled: true, rightEnabled: true };
    }
  };

  const { leftEnabled, rightEnabled } = getButtonStates(current_step);

  return {
    leftEnabled,
    rightEnabled,
    markStepComplete,
    completedSteps
  };
}
