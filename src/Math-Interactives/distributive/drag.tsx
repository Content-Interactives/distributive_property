import React from 'react';
import { motion } from 'framer-motion';

export const DraggableNumber = ({ 
    number, 
    className, 
    onDragEnd 
}: { 
    number: number, 
    className: string,
    onDragEnd?: (event: any, info: any) => void
}) => {
    return (
        <motion.span
            drag
            dragMomentum={false}
            dragElastic={0.1}
            dragSnapToOrigin={true}
            whileDrag={{ scale: 1.1 }}
            className={className}
            style={{ 
                touchAction: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                cursor: 'grab',
                position: 'relative',
                zIndex: 10
            }}
            onDragEnd={onDragEnd}
        >
            {number}
        </motion.span>
    );
};