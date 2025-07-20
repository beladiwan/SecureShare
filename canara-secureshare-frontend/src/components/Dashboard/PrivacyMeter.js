import React from 'react';
import { motion } from 'framer-motion';

const PrivacyMeter = ({ score }) => {
  const getColor = (score) => {
    if (score >= 80) return '#10b981'; // green
    if (score >= 60) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const getLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * score) / 100;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow w-full max-w-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Privacy Score</h3>

      <svg width="192" height="192" className="mb-4">
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
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1 }}
          transform="rotate(-90 96 96)"
        />
      </svg>

      <div className="text-3xl font-bold text-gray-900">{score}</div>
      <div className="text-sm font-medium text-gray-600">{getLabel(score)}</div>
      <p className="mt-2 text-center text-gray-500 text-sm">
        Your data sharing practices are {getLabel(score).toLowerCase()}.
      </p>
    </div>
  );
};

export default PrivacyMeter;
