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

    return (
        <div className="space-y-6">
            {/* Layer 1 - Always show */}
            <div className="text-4xl font-bold flex items-center justify-center gap-2">
                <span className={yellow}>{a}</span>×<span className={blue}>{b}</span>
                <span className="mx-2">+</span>
                <span className={yellow}>{a}</span>×<span className={green}>{c}</span>
            </div>

            {/* Layer 2 - Show when currentLayer >= 2 */}
            {currentLayer >= 2 && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold flex items-center justify-center gap-2"
                >
                    <span className="bg-orange-200 px-3 py-2 rounded">{a*b}</span>
                    <span className="mx-2">+</span>
                    <span className="bg-orange-200 px-3 py-2 rounded">{a*c}</span>
                </motion.div>
            )}

            {/* Layer 3 - Show when currentLayer >= 3 */}
            {currentLayer >= 3 && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-center"
                >
                    <span className="bg-purple-200 px-3 py-2 rounded">{a*b + a*c}</span>
                </motion.div>
            )}

            {/* Layer 4 - Show when currentLayer >= 4 */}
            {currentLayer >= 4 && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-center"
                >
                    <div className="border-4 border-green-500 bg-green-100 px-4 py-3 rounded inline-block">{a*b + a*c}</div>
                </motion.div>
            )}
        </div>
    );
};
