import { useState, useEffect } from 'react';

export function useButtonStates(current_step: number, total_steps: number) {
  // Track which steps have been completed/unlocked
  const [unlockedSteps, setUnlockedSteps] = useState<Set<number>>(new Set([1, 2])); // Step 1 is always accessible, step 2 can be accessed from step 1
  
  // Mark a step as unlocked/completed
  const markStepComplete = (nextStep: number) => {
    setUnlockedSteps(prev => new Set([...prev, nextStep]));
  };

  // Left button is enabled if we're not on step 1
  const leftEnabled = current_step > 1;
  
  // Right button is enabled if we can move to the next step
  const rightEnabled = current_step < total_steps && unlockedSteps.has(current_step + 1);

  return {
    leftEnabled,
    rightEnabled,
    markStepComplete,
    unlockedSteps
  };
}
