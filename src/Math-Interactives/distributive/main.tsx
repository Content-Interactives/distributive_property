import React from 'react';

interface Props {
    current_step: number;
}

const Distributive: React.FC<Props> = ({current_step}) => {
    switch(current_step) {
        case 1:
            return <div className="p-4">Step 1: Show expression a(b + c)</div>;
        case 2:
            return <div className="p-4">Step 2: Drag and drop</div>;
        case 3:
            return <div className="p-4">Step 3: Final result</div>;
        default:
            return <div className="p-4">Invalid step</div>;
    }
}

export default Distributive;