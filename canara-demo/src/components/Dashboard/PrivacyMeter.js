import React from 'react';
import { motion } from 'framer-motion';

const PrivacyMeter = ({ score = 72 }) => {
  const getColor = (score) => {
    if (score >= 80) return '#10b981'; // green
    if (score >= 60) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const getLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Attention';
  };

  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (circumference * score) / 100;

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md text-center">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Privacy Score</h3>
      <div className="flex justify-center items-center mb-4">
        <svg width="192" height="192" className="transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
          />
          <motion.circle
            cx="96"
            cy="96"
            r={radius}
            fill="none"
            stroke={getColor(score)}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: progress }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute text-center">
          <div className="text-3xl font-bold text-gray-800">{score}</div>
          <div className="text-sm text-gray-500">{getLabel(score)}</div>
        </div>
      </div>
      <p className="text-gray-600">
        Your data sharing practices are <strong>{getLabel(score).toLowerCase()}</strong>.
      </p>
    </div>
  );
};

export default PrivacyMeter;
