import React from 'react';
import { cn } from '../../utils/cn';

// Random expression generator
export const generateRandomExpression = () => {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    const c = Math.floor(Math.random() * 9) + 1;
    return { a, b, c };
};

// Style utilities
export const getStyles = () => {
    const base = cn(
        "px-3 py-2 rounded",
        "text-2xl sm:text-4xl font-bold", 
        "cursor-pointer select-none touch-manipulation"
    );

    const yellow = cn(base, "bg-yellow-200 hover:bg-yellow-300");
    const blue = cn(base, "bg-blue-200 hover:bg-blue-300");
    const green = cn(base, "bg-green-200 hover:bg-green-300");
    const title = cn("text-2xl mb-4");

    const arrow = {
        stroke: "#F59E0B",
        strokeWidth: "3",
        fill: "none",
        markerEnd: "url(#arrow)"
    };

    return { yellow, blue, green, title, arrow };
};

// Distance calculation functions
export const calculateDistance = (fromRef: React.RefObject<HTMLElement>, toRef: React.RefObject<HTMLElement>) => {
    if (!fromRef.current || !toRef.current) return { x: 0, y: 0 };
    
    const fromRect = fromRef.current.getBoundingClientRect();
    const toRect = toRef.current.getBoundingClientRect();
    
    return {
        x: toRect.left - fromRect.left,
        y: toRect.top - fromRect.top
    };
};

export const getDistances = (yellowRef: React.RefObject<HTMLElement>, blueRef: React.RefObject<HTMLElement>, greenRef: React.RefObject<HTMLElement>) => {
    const yellowToBlue = calculateDistance(yellowRef, blueRef);
    const yellowToGreen = calculateDistance(yellowRef, greenRef);
    
    return { yellowToBlue, yellowToGreen };
};
