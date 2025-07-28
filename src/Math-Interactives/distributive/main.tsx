import React, { useState } from 'react';

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
            <h2 className="text-2xl mb-4">Distribute the {a}:</h2>
            
            {/* Visual distribution - using SAME layout as equation */}
            <div className="mb-4">
                {/* Jumping 2× values with exact same spacing */}
                <div className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                    <span className="px-2 py-1 invisible">{a}</span> {/* invisible spacer same size as yellow */}
                    <span>(</span>
                    <span className="bg-yellow-200 px-2 py-1 rounded animate-bounce">{a}×</span>
                    <span>+</span>
                    <span className="bg-yellow-200 px-2 py-1 rounded animate-bounce">{a}×</span>
                    <span>)</span>
                </div>
                
                {/* Arrows with exact same spacing */}
                <div className="text-2xl mb-2 flex items-center justify-center gap-2">
                    <span className="px-2 py-1 invisible">{a}</span>
                    <span className="invisible">(</span>
                    <span className="text-yellow-500">↓</span>
                    <span className="invisible">+</span>
                    <span className="text-yellow-500">↓</span>
                    <span className="invisible">)</span>
                </div>
            </div>
            
            {/* Original expression */}
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

    // Clean switch
    switch(current_step) {
        case 1: return render_step_1();
        case 2: return render_step_2();
        default: return <div>Invalid step</div>;
    }
}

export default Distributive;