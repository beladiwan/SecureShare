import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { consentService } from '../../services/consent';
import LoadingSpinner from '../Common/LoadingSpinner';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const AccessHistory = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccessLogs();
  }, []);

  const fetchAccessLogs = async () => {
    try {
      const data = await consentService.getAuditLogs();
      setLogs(data.results || data);
    } catch (error) {
      toast.error('Failed to fetch access logs');
    } finally {
      setLoading(false);
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'data_accessed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'access_denied':
      case 'consent_denied':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'data_accessed':
      case 'consent_granted':
        return 'bg-green-50 text-green-700';
      case 'access_denied':
      case 'consent_denied':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-yellow-50 text-yellow-700';
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" message="Loading access history..." />;
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Access History</h1>
        <p className="text-gray-600 mt-2">Track who accessed your data and when</p>
      </div>

      {logs.length === 0 ? (
        <div className="card text-center py-12">
          <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No access history yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {logs.map((log, index) => (
            <motion.div
              key={log.log_id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card"
            >
              <div className="flex items-start space-x-4">
                <div className="mt-1">
                  {getActionIcon(log.action)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{log.partner_name || 'Unknown Partner'}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {log.action_display}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                      {log.success ? 'Success' : 'Failed'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {format(new Date(log.created_at), 'PPpp')}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccessHistory;