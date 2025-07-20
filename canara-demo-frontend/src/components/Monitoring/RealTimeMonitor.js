import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, AlertCircle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const RealTimeMonitor = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([
    {
      id: 1,
      time: new Date(),
      partner: 'Canara HSBC Life Insurance',
      action: 'Data Accessed',
      status: 'success',
      details: 'Accessed income_range, employment_status',
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => {
        const newLog = {
          id: prev.length + 1,
          time: new Date(),
          partner: 'Canara HSBC Life Insurance',
          action: 'Data Accessed',
          status: 'success',
          details: `Access attempt ${prev.length + 1} of 5`,
        };
        return [newLog, ...prev];
      });
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const getIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="text-green-500 w-5 h-5" />;
      case 'failed':
        return <XCircle className="text-red-500 w-5 h-5" />;
      default:
        return <AlertCircle className="text-yellow-500 w-5 h-5" />;
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Real-Time Monitoring</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-white text-canara-blue px-4 py-2 rounded-lg font-semibold border hover:bg-gray-50"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Info */}
      <div>
        <h2 className="text-lg font-semibold">Live Access Monitor</h2>
        <p className="text-sm text-gray-600">Track data access in real-time</p>
        <div className="flex items-center space-x-2 mt-2">
          <span className="flex items-center text-green-600 font-semibold">
            <Activity className="mr-1 h-4 w-4 animate-pulse" />
            Live
          </span>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="space-y-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="border rounded-lg p-4 shadow-sm bg-white flex items-start justify-between"
          >
            <div className="flex items-center space-x-3">
              {getIcon(log.status)}
              <div>
                <p className="font-medium text-gray-800">{log.partner}</p>
                <p className="text-sm text-gray-600">{log.action}</p>
                <p className="text-xs text-gray-500">{log.details}</p>
              </div>
            </div>
            <div className="text-right">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  log.status === 'success'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {log.status}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                {log.time.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded text-sm">
        This page updates automatically when your data is accessed. 
        You'll see every access attempt in real-time.
      </div>
    </div>
  );
};

export default RealTimeMonitor;
