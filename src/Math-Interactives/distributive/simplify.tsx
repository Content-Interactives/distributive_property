import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getStyles } from './utils';

const { yellow, blue, green, neutral } = getStyles();

export const SimplifyAnimation = ({ a, b, c }: { a: number, b: number, c: number }) => {
    const [currentLayer, setCurrentLayer] = useState(1);
    const [subStep, setSubStep] = useState(0);
    const [layer3Step, setLayer3Step] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            if (currentLayer === 2 && subStep < 2) {
                setSubStep(prev => prev + 1);
            } else if (currentLayer === 3 && layer3Step < 1) {
                setLayer3Step(prev => prev + 1);
            } else if (currentLayer < 3) { // Only go to layer 3 now
                setCurrentLayer(prev => prev + 1);
            }
        }, 1500);
        return () => clearInterval(timer);
    }, [currentLayer, subStep, layer3Step]);

};
