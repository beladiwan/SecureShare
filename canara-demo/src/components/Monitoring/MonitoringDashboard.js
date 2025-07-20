import React from 'react';
import { useNavigate } from 'react-router-dom';

const MonitoringDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Monitoring Dashboard</h1>
      <div className="space-y-4">
        <button 
          onClick={() => navigate('/monitor')}
          className="bg-canara-blue text-white px-4 py-2 rounded-xl hover:bg-blue-900"
        >
          Real-Time Monitor
        </button>
        <button 
          onClick={() => navigate('/audit-logs')}
          className="bg-canara-blue text-white px-4 py-2 rounded-xl hover:bg-blue-900"
        >
          View Audit Logs
        </button>
      </div>
    </div>
  );
};

export default MonitoringDashboard;
