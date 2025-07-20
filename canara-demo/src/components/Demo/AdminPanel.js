import React from 'react';
import { motion } from 'framer-motion';
import { X, Database, Users, Shield, FileText, History } from 'lucide-react';

const AdminPanel = ({ onClose }) => {
  const models = [
    { name: 'Users', count: 1247, icon: Users, color: 'blue' },
    { name: 'Partners', count: 23, icon: Shield, color: 'green' },
    { name: 'Consent Records', count: 3456, icon: FileText, color: 'purple' },
    { name: 'Data Sharing Requests', count: 892, icon: Database, color: 'orange' },
    { name: 'Access Logs', count: 15789, icon: History, color: 'red' },
  ];

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-xl max-w-3xl w-full p-6 relative"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Django Admin Panel</h2>
          <p className="text-gray-500">Showing all data models and records</p>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {models.map((model, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg p-4 flex items-center justify-between shadow"
            >
              <div className="flex items-center gap-3">
                {React.createElement(model.icon, {
                  className: `w-6 h-6 text-${model.color}-600`
                })}
                <div>
                  <p className="text-xl font-semibold text-gray-700">{model.count}</p>
                  <p className="text-sm text-gray-500">{model.name}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200">
                  Add
                </button>
                <button className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                  Change
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Problem Note */}
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg text-sm">
          <strong>Problem:</strong> All this sensitive financial data is shared completely with partners. No privacy controls, no user visibility, no revocation options.
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminPanel;
