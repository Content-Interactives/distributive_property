import React, { useState, useRef } from 'react';
import { generateRandomExpression, getStyles } from './utils';
import { DraggableNumber } from './drag';
import { SimplifyAnimation } from './simplify';

interface Props {
    current_step: number;
}

// ✅ Static styles outside
const { yellow, blue, green, title, arrow } = getStyles();

const Distributive: React.FC<Props> = ({current_step}) => {
    const [expression] = useState(generateRandomExpression);
    const { a, b, c } = expression;

    // Add refs here in main.tsx
    const yellowRef = useRef<HTMLSpanElement>(null);
    const blueRef = useRef<HTMLSpanElement>(null);
    const greenRef = useRef<HTMLSpanElement>(null);

    // ✅ Drag functionality
    const [leftBlankFilled, setLeftBlankFilled] = useState(false);
    const [rightBlankFilled, setRightBlankFilled] = useState(false);

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
                <span ref={yellowRef} className={yellow}>{a}</span>
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
                    
                    <div id="left-blank" className="px-3 py-2 rounded border-2 border-dashed border-yellow-400 bg-yellow-100 text-2xl sm:text-4xl font-bold text-gray-400 cursor-pointer select-none">
                        {leftBlankFilled ? a : '?'}
                    </div>
                    <span>×</span>
                    <span className={blue}>{b}</span>
                    
                    <span className="mx-2">+</span>
                    
                    <div id="right-blank" className="px-3 py-2 rounded border-2 border-dashed border-yellow-400 bg-yellow-100 text-2xl sm:text-4xl font-bold text-gray-400 cursor-pointer select-none">
                        {rightBlankFilled ? a : '?'}
                    </div>
                    <span>×</span>
                    <span className={green}>{c}</span>
                    
                    <span>)</span>
                </div>
            </div>
        </div>
    );

    const render_step_3 = () => (
        <div className="p-8 text-center">
            <SimplifyAnimation a={a} b={b} c={c} />
        </div>
    );

    // Add step 4 render function
    const render_step_4 = () => (
        <div className="p-8 text-center">
            <div className="mb-8">
                <h2 className="text-2xl mb-4">Great job! 🎉</h2>
                <p className="text-lg mb-6">You solved: {a}({b} + {c}) = {a * b + a * c}</p>
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
        case 3: return render_step_3();
        case 4: return render_step_4();
        default: return <div>Invalid step</div>;
    }
}

export default Distributive;