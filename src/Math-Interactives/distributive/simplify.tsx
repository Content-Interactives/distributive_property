import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getStyles } from './utils';

const { yellow, blue, green } = getStyles();

export const SimplifyAnimation = ({ a, b, c }: { a: number, b: number, c: number }) => {
    const [currentLayer, setCurrentLayer] = useState(1);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentLayer(prev => prev < 4 ? prev + 1 : prev);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    const renderLayer = () => {
        switch(currentLayer) {
            case 1: return (
                <div className="text-4xl font-bold flex items-center justify-center gap-2">
                    <span className={yellow}>{a}</span>×<span className={blue}>{b}</span>
                    <span className="mx-2">+</span>
                    <span className={yellow}>{a}</span>×<span className={green}>{c}</span>
                </div>
            );
            case 2: return (
                <div className="text-4xl font-bold flex items-center justify-center gap-2">
                    <span className="bg-orange-200 px-3 py-2 rounded">{a*b}</span>
                    <span className="mx-2">+</span>
                    <span className="bg-orange-200 px-3 py-2 rounded">{a*c}</span>
                </div>
            );
            case 3: return (
                <div className="text-4xl font-bold">
                    <span className="bg-purple-200 px-3 py-2 rounded">{a*b + a*c}</span>
                </div>
            );
            case 4: return (
                <div className="text-4xl font-bold">
                    <div className="border-4 border-green-500 bg-green-100 px-4 py-3 rounded">{a*b + a*c}</div>
                </div>
            );
        }
    };

    return (
        <motion.div 
            key={currentLayer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {renderLayer()}
        </motion.div>
    );
};
