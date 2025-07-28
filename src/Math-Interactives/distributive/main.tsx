import React, { useState } from 'react';

interface Props {
    current_step: number;
}

const Distributive: React.FC<Props> = ({current_step}) => {
    const generate_random_expression = () => {
        const a = Math.floor(Math.random() * 9) + 1; // 1-9
        const b = Math.floor(Math.random() * 9) + 1; // 1-9  
        const c = Math.floor(Math.random() * 9) + 1; // 1-9 (all positive)
        return { a, b, c };
    };

    const [expression] = useState(generate_random_expression);

    switch(current_step) {
        case 1:
            const { a, b, c } = expression;
            
            return (
                <div className="p-8 text-center">
                    <h2 className="text-2xl mb-4">Solve this expression:</h2>
                    <div className="text-4xl font-bold">
                        {a}({b} + {c})
                    </div>
                </div>
            );
        case 2:
            return <div className="p-4">Step 2: Drag and drop</div>;
        case 3:
            return <div className="p-4">Step 3: Final result</div>;
        default:
            return <div className="p-4">Invalid step</div>;
    }
}

export default Distributive;