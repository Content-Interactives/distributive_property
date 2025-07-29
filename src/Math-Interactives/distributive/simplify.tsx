import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getStyles } from './utils';

const { yellow, blue, green } = getStyles();

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
            } else if (currentLayer < 4) {
                setCurrentLayer(prev => prev + 1);
            }
        }, 1500);
        return () => clearInterval(timer);
    }, [currentLayer, subStep, layer3Step]);

    return (
        <div className="space-y-6">
            {/* Layer 1 */}
            <div className="text-4xl font-bold flex items-center justify-center gap-2">
                <span className={yellow}>{a}</span>×<span className={blue}>{b}</span>
                <span className="mx-2">+</span>
                <span className={yellow}>{a}</span>×<span className={green}>{c}</span>
            </div>

            {/* Layer 2 - Keep original colors */}
            {currentLayer >= 2 && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold flex items-center justify-center gap-2"
                >
                    <motion.span
                        layout
                        animate={subStep >= 1 ? { 
                            backgroundColor: "#fed7aa",
                            padding: "0.5rem 0.75rem",
                            borderRadius: "0.5rem"
                        } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        {subStep >= 1 ? (
                            <span className="text-black">{a*b}</span>
                        ) : (
                            <><span className={yellow}>{a}</span>×<span className={blue}>{b}</span></>
                        )}
                    </motion.span>
                    <span className="mx-2">+</span>
                    <motion.span
                        layout
                        animate={subStep >= 2 ? { 
                            backgroundColor: "#fed7aa",
                            padding: "0.5rem 0.75rem",
                            borderRadius: "0.5rem"
                        } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {subStep >= 2 ? (
                            <span className="text-black">{a*c}</span>
                        ) : (
                            <><span className={yellow}>{a}</span>×<span className={green}>{c}</span></>
                        )}
                    </motion.span>
                </motion.div>
            )}

            {/* Layer 3 - Same smooth animation as layer 2 */}
            {currentLayer >= 3 && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold flex items-center justify-center gap-2"
                >
                    <motion.span
                        layout
                        animate={layer3Step >= 1 ? { 
                            backgroundColor: "#c084fc",
                            padding: "0.5rem 0.75rem",
                            borderRadius: "0.5rem"
                        } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        {layer3Step >= 1 ? (
                            <span className="text-black">{a*b + a*c}</span>
                        ) : (
                            <><span className="bg-orange-200 px-3 py-2 rounded text-black">{a*b}</span> + <span className="bg-orange-200 px-3 py-2 rounded text-black">{a*c}</span></>
                        )}
                    </motion.span>
                </motion.div>
            )}

            {/* Layer 4 - Final boxed answer */}
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
