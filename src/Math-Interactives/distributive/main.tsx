import React, { useState, useRef, useEffect } from 'react';
import { generateRandomExpression, getStyles, getDistances } from './utils';

interface Props {
    current_step: number;
}

// ✅ Static styles outside
const { yellow, blue, green, title, arrow } = getStyles();

const Distributive: React.FC<Props> = ({current_step}) => {
    // ✅ Hooks must stay inside
    const [expression] = useState(generateRandomExpression);
    const { a, b, c } = expression;



    // Step rendering functions
    const render_step_1 = () => (
        <div className="p-8 text-center">
            <h2 className="text-2xl mb-4">Solve this expression:</h2>
            <div className="text-4xl font-bold mb-8 flex items-center justify-center gap-2">
                <span className={yellow}>{a}</span>
                <span>(</span>
                <span className={blue}>{b}</span>
                <span>+</span>
                <span className={green}>{c}</span>
                <span>)</span>
            </div>
        </div>
    );

    const render_step_2 = () => (
        <div className="p-8 text-center">
            <div className="title-box mb-12 p-4 bg-gray-100 rounded">
                <h2 className={title}>Distribute the {a}:</h2>
            </div>
            
            {/* Simple container with curves on top */}
            <div className="relative">
                {/* Static curved arrows - just decorative */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-64 h-12">
                    <svg className="w-full h-full">
                        {/* Left curve */}
                        <path d="M 45 45 Q 50 0 100 40" {...arrow} />
                        {/* Right curve */}
                        <path d="M 45 45 Q 80 -30 180 45" {...arrow} />
                        
                        <defs>
                            <marker id="arrow" markerWidth="8" markerHeight="6" 
                                    refX="7" refY="3" orient="auto">
                                <polygon points="0 0, 8 3, 0 6" fill="#F59E0B" />
                            </marker>
                        </defs>
                    </svg>
                </div>
                
                <div className="text-4xl font-bold mb-8 flex items-center justify-center gap-2">
                    <span className={yellow}>{a}</span>
                    <span>(</span>
                    <span className={blue}>{b}</span>
                    <span>+</span>
                    <span className={green}>{c}</span>
                    <span>)</span>
                </div>
            </div>
        </div>
    );

    // Clean switch
    switch(current_step) {
        case 1: return render_step_1();
        case 2: return render_step_2();
        default: return <div>Invalid step</div>;
    }
}

export default Distributive;