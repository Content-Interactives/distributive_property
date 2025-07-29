import React, { useState, useRef, useEffect } from 'react';

interface Props {
    current_step: number;
}

const Distributive: React.FC<Props> = ({current_step}) => {
    const generate_random_expression = () => {
        const a = Math.floor(Math.random() * 9) + 1;
        const b = Math.floor(Math.random() * 9) + 1;
        const c = Math.floor(Math.random() * 9) + 1;
        return { a, b, c };
    };

    const [expression] = useState(generate_random_expression);
    const { a, b, c } = expression; // Declare ONCE

    // Add refs for leader-line (no visual change yet)
    const yellowRef = useRef<HTMLSpanElement>(null);
    const blueRef = useRef<HTMLSpanElement>(null);
    const greenRef = useRef<HTMLSpanElement>(null);

    // Step rendering functions
    const render_step_1 = () => (
        <div className="p-8 text-center">
            <h2 className="text-2xl mb-4">Solve this expression:</h2>
            <div className="text-4xl font-bold mb-8 flex items-center justify-center gap-2">
                <span className="bg-yellow-200 px-2 py-1 rounded">{a}</span>
                <span>(</span>
                <span className="bg-blue-200 px-2 py-1 rounded">{b}</span>
                <span>+</span>
                <span className="bg-green-200 px-2 py-1 rounded">{c}</span>
                <span>)</span>
            </div>
        </div>
    );

    const render_step_2 = () => (
        <div className="p-8 text-center">
            <div className="title-box mb-12 p-4 bg-gray-100 rounded">
                <h2 className="text-2xl">Distribute the {a}:</h2>
            </div>
            
            {/* Simple container with curves on top */}
            <div className="relative">
                {/* Static curved arrows - just decorative */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-64 h-12">
                    <svg className="w-full h-full">
                        {/* Left curve */}
                        <path d="M 45 45 Q 50 0 100 40" 
                              stroke="#F59E0B" 
                              strokeWidth="3" 
                              fill="none" 
                              markerEnd="url(#arrow)" />
                        {/* Right curve */}
                        <path d="M 45 45 Q 80 -30 180 45" 
                              stroke="#F59E0B"
                              strokeWidth="3" 
                              fill="none" 
                              markerEnd="url(#arrow)" />
                        
                        <defs>
                            <marker id="arrow" markerWidth="8" markerHeight="6" 
                                    refX="7" refY="3" orient="auto">
                                <polygon points="0 0, 8 3, 0 6" fill="#F59E0B" />
                            </marker>
                        </defs>
                    </svg>
                </div>
                
                <div className="text-4xl font-bold mb-8 flex items-center justify-center gap-2">
                    <span className="bg-yellow-200 px-2 py-1 rounded">{a}</span>
                    <span>(</span>
                    <span className="bg-blue-200 px-2 py-1 rounded">{b}</span>
                    <span>+</span>
                    <span className="bg-green-200 px-2 py-1 rounded">{c}</span>
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