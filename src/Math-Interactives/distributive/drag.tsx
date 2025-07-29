import React from 'react';
import { motion } from 'framer-motion';

export const DraggableNumber = ({ number, className }: { number: number, className: string }) => {
    return (
        <motion.span
            drag
            dragMomentum={false}
            className={className}
            style={{ 
                touchAction: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none'
            }}
        >
            {number}
        </motion.span>
    );
};