import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <motion.div
        className={`border-4 border-t-transparent border-blue-500 rounded-full animate-spin ${sizeClasses[size]}`}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      />
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
