import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex items-center gap-3 p-4 border border-red-400 bg-red-100 text-red-700 rounded-lg">
      <AlertCircle className="w-5 h-5 text-red-600" />
      <span className="flex-1 text-sm">{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-auto px-3 py-1 text-sm font-medium text-red-700 border border-red-500 rounded hover:bg-red-200 transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
