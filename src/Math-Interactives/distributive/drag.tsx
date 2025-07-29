import React from 'react';
import { motion } from 'framer-motion';

export const DraggableNumber = ({ number, className }: { number: number, className: string }) => {
    return (
        <motion.span
            drag
            dragMomentum={false}
            dragElastic={0.1}
            whileDrag={{ scale: 1.1 }}
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