import React from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Download, Filter } from 'lucide-react';

const AuditLogs = () => {
  const navigate = useNavigate();

  const logs = [
    {
      id: 1,
      timestamp: '2025-01-18 10:30:15',
      partner: 'Canara HSBC Life Insurance',
      action: 'consent_granted',
      details: 'User approved consent with conditions',
      ip: '192.168.1.1',
    },
    {
      id: 2,
      timestamp: '2025-01-18 10:31:45',
      partner: 'Canara HSBC Life Insurance',
      action: 'data_accessed',
      details: 'Accessed income_range, employment_status',
      ip: '203.0.113.45',
    },
    {
      id: 3,
      timestamp: '2025-01-18 11:15:22',
      partner: 'Canara HSBC Life Insurance',
      action: 'data_accessed',
      details: 'Accessed income_range, employment_status',
      ip: '203.0.113.45',
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Audit Logs</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-white text-canara-blue px-4 py-2 rounded-lg font-semibold border hover:bg-gray-50"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Info */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">Complete Audit Trail</h2>
        <p className="text-sm text-gray-500">
          Comprehensive log of all data access activities
        </p>
        <div className="flex gap-3">
          <button className="flex items-center gap-1 text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-1 text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="overflow-auto rounded-lg border shadow-sm">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-600">
            <tr>
              <th className="px-4 py-3">Timestamp</th>
              <th className="px-4 py-3">Partner</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Details</th>
              <th className="px-4 py-3">IP Address</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">{log.timestamp}</td>
                <td className="px-4 py-3">{log.partner}</td>
                <td className="px-4 py-3 capitalize">{log.action.replace(/_/g, ' ')}</td>
                <td className="px-4 py-3">{log.details}</td>
                <td className="px-4 py-3">{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Compliance Info */}
      <div className="bg-blue-50 border border-blue-100 p-4 rounded text-sm text-blue-800">
        <h3 className="font-semibold mb-1">DPDP Act Compliance</h3>
        This comprehensive audit trail ensures compliance with the Data Protection Act.
        All access attempts are logged with timestamps, IP addresses, and detailed actions.
      </div>
    </div>
  );
};

export default AuditLogs;
