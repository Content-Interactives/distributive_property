import React, { useState, useRef, useEffect } from 'react';
import { generateRandomExpression, getStyles } from './utils';
import { DraggableNumber } from './drag';
import { motion } from 'framer-motion';

interface Props {
    current_step: number;
    markStepComplete?: (step: number) => void;
}

// ✅ Static styles outside
const { yellow, blue, green, neutral, title, arrow } = getStyles();

// Move animation components outside to prevent recreation on re-renders
const MultiplicationStep = ({ a, b, c }: { a: number, b: number, c: number }) => {
    const [subStep, setSubStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setSubStep(prev => {
                if (prev < 2) {
                    return prev + 1;
                } else {
                    clearInterval(timer);
                    return prev;
                }
            });
        }, 1500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="p-8 text-center">
            <div className="text-4xl font-bold mb-8 flex items-center justify-center gap-2 flex-nowrap">
                <motion.span
                    layout
                    animate={subStep >= 1 ? { 
                        padding: "0.5rem 0.75rem",
                        borderRadius: "0.5rem"
                    } : {}}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-1"
                >
                    {subStep >= 1 ? (
                        <span className="text-black">{a*b}</span>
                    ) : (
                        <>
                            <span className={neutral}>{a}</span>
                            <span>×</span>
                            <span className={neutral}>{b}</span>
                        </>
                    )}
                </motion.span>
                <span className="mx-2">+</span>
                <motion.span
                    layout
                    animate={subStep >= 2 ? { 
                        padding: "0.5rem 0.75rem",
                        borderRadius: "0.5rem"
                    } : {}}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-1"
                >
                    {subStep >= 2 ? (
                        <span className="text-black">{a*c}</span>
                    ) : (
                        <>
                            <span className={neutral}>{a}</span>
                            <span>×</span>
                            <span className={green}>{c}</span>
                        </>
                    )}
                </motion.span>
            </div>
        </div>
    );
};

const AdditionStep = ({ a, b, c }: { a: number, b: number, c: number }) => {
    const [showFinal, setShowFinal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowFinal(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="p-8 text-center">
            <div className="text-4xl font-bold mb-8 flex items-center justify-center gap-2 flex-nowrap">
                <motion.span
                    layout
                    animate={showFinal ? { 
                        backgroundColor: "#bbf7d0",
                        border: "4px solid #22c55e",
                        padding: "0.75rem 1rem",
                        borderRadius: "0.5rem"
                    } : {}}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-2"
                >
                    {showFinal ? (
                        <span className="text-black">{a*b + a*c}</span>
                    ) : (
                        <>
                            <span className="text-black">{a*b}</span>
                            <span>+</span>
                            <span className="text-black">{a*c}</span>
                        </>
                    )}
                </motion.span>
            </div>
        </div>
    );
};

const Distributive: React.FC<Props> = ({current_step, markStepComplete}) => {
    const [expression] = useState(generateRandomExpression);
    const { a, b, c } = expression;

    // Add refs here in main.tsx
    const yellowRef = useRef<HTMLSpanElement>(null);
    const blueRef = useRef<HTMLSpanElement>(null);
    const greenRef = useRef<HTMLSpanElement>(null);

    // ✅ Drag functionality
    const [leftBlankFilled, setLeftBlankFilled] = useState(false);
    const [rightBlankFilled, setRightBlankFilled] = useState(false);
    
    // Reset drag state when returning to step 2
    useEffect(() => {
        if (current_step === 2) {
            setLeftBlankFilled(false);
            setRightBlankFilled(false);
        }
    }, [current_step]);

    // Mark step 2 complete when both blanks are filled
    useEffect(() => {
        if (leftBlankFilled && rightBlankFilled && markStepComplete) {
            markStepComplete(3); // Allow progression to step 3
        }
    }, [leftBlankFilled, rightBlankFilled, markStepComplete]);

    // Mark animation steps as complete after a delay (simple timer approach)
    useEffect(() => {
        if (current_step === 3 && markStepComplete) {
            const timer = setTimeout(() => {
                markStepComplete(4); // Allow progression to step 4 after animation time
            }, 3000); // 3 seconds for multiplication animation
            return () => clearTimeout(timer);
        }
    }, [current_step, markStepComplete]);

    useEffect(() => {
        if (current_step === 4 && markStepComplete) {
            const timer = setTimeout(() => {
                markStepComplete(5); // Allow progression to step 5 after animation time
            }, 2000); // 2 seconds for addition animation
            return () => clearTimeout(timer);
        }
    }, [current_step, markStepComplete]);

    const handleDragEnd = (event: any, info: any) => {
        const leftBox = document.getElementById('left-blank')?.getBoundingClientRect();
        const rightBox = document.getElementById('right-blank')?.getBoundingClientRect();
        
        const snapDistance = 100;
        
        if (leftBox && Math.abs(info.point.x - leftBox.x) < snapDistance) {
            setLeftBlankFilled(true);
        } else if (rightBox && Math.abs(info.point.x - rightBox.x) < snapDistance) {
            setRightBlankFilled(true);
        }
    };

    // Step rendering functions
    const render_step_1 = () => (
        <div className="p-8 text-center">

            <div className="text-4xl font-bold mb-8 flex items-center justify-center gap-2">
                <span ref={yellowRef} className={neutral}>{a}</span>
                <span>(</span>
                <span ref={blueRef} className={blue}>{b}</span>
                <span>+</span>
                <span ref={greenRef} className={green}>{c}</span>
                <span>)</span>
            </div>
        </div>
    );

    const render_step_2 = () => (
        <div className="p-8 text-center">
            
            <div className="relative">
                {/* Your existing arrows */}
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-96">
                    <svg className="w-full h-full">
                        {!leftBlankFilled && <path d="M 20 67 Q 40 20 90 67" {...arrow} />}
                        {!rightBlankFilled && <path d="M 20 67 Q 90 -40 260 67" {...arrow} />}
                        
                        <defs>
                            <marker id="arrow" markerWidth="8" markerHeight="6" 
                                    refX="7" refY="3" orient="auto">
                                <polygon points="0 0, 8 3, 0 6" fill="#F59E0B" />
                            </marker>
                        </defs>
                    </svg>
                </div>
                
                {/* Distributed equation with draggable yellow */}
                <div className="text-4xl font-bold mb-8 flex items-center justify-center gap-2">
                {(!leftBlankFilled || !rightBlankFilled) && (
                    <DraggableNumber number={a} className={yellow} onDragEnd={handleDragEnd} />
                )}
                    <span>(</span>
                    
                    <div id="left-blank" className="relative cursor-pointer">
                        <div className={`px-3 py-2 rounded border-2 text-2xl font-bold select-none ${
                            leftBlankFilled 
                                ? 'border-solid border-yellow-600 bg-yellow-200 text-black' 
                                : 'border-dashed border-yellow-400 bg-yellow-100 text-gray-400'
                        }`}>
                            {leftBlankFilled ? a : '?'}
                        </div>
                        <div className="absolute inset-0 w-24 h-24 -translate-x-6 -translate-y-6"></div>
                    </div>
                    <span>×</span>
                    <span className={blue}>{b}</span>
                    
                    <span className="mx-2">+</span>
                    
                    <div id="right-blank" className="relative cursor-pointer">
                        <div className={`px-3 py-2 rounded border-2 text-2xl font-bold select-none ${
                            rightBlankFilled 
                                ? 'border-solid border-yellow-600 bg-yellow-200 text-black' 
                                : 'border-dashed border-yellow-400 bg-yellow-100 text-gray-400'
                        }`}>
                            {rightBlankFilled ? a : '?'}
                        </div>
                        <div className="absolute inset-0 w-24 h-24 -translate-x-6 -translate-y-6"></div>
                    </div>
                    <span>×</span>
                    <span className={green}>{c}</span>
                    
                    <span>)</span>
                </div>
            </div>
        </div>
    );

    // Add step 4 render function
    const render_step_4 = () => (
        <div className="p-8 text-center">
            <div className="mb-8">
                <h2 className="text-2xl mb-4">Great job! 🎉</h2>
                <p className="text-lg mb-6">We simplified: {a}({b} + {c}) = {a * b + a * c}</p>
            </div>
            
            <button 
                onClick={() => window.location.reload()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-xl font-bold"
            >
                Try Another Problem! 🚀
            </button>
        </div>
    );

    // Clean switch
    switch(current_step) {
        case 1: return render_step_1();
        case 2: return render_step_2();
        case 3: return <MultiplicationStep a={a} b={b} c={c} />;
        case 4: return <AdditionStep a={a} b={b} c={c} />;
        case 5: return render_step_4(); // Move the "Great job!" to step 5
        default: return <div>Invalid step</div>;
    }
}

export default Distributive;