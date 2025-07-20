import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Shield, FileCheck, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PrivacyMeter from './PrivacyMeter';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Active Consents', value: 3, icon: Shield, color: 'text-green-600' },
    { label: 'Pending Requests', value: 1, icon: FileCheck, color: 'text-yellow-600' },
    { label: 'Data Accesses (7d)', value: 12, icon: Activity, color: 'text-blue-600' },
  ];

  const activities = [
    { partner: 'HDFC Bank', action: 'Data Accessed', time: '2 hours ago', success: true },
    { partner: 'LIC Insurance', action: 'Access Denied', time: '5 hours ago', success: false },
    { partner: 'ICICI Bank', action: 'Consent Granted', time: '1 day ago', success: true },
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-canara-blue">Canara SecureShare</h1>
        <div className="flex gap-4 items-center">
          <button onClick={() => navigate('/')} className="text-sm font-medium hover:text-canara-blue">Demo</button>
          <button onClick={() => navigate('/consent')} className="text-sm font-medium hover:text-canara-blue">Consents</button>
          <button onClick={() => navigate('/monitoring')} className="text-sm font-medium hover:text-canara-blue">Monitoring</button>
          <div className="ml-4 font-semibold">Priya Sharma</div>
        </div>
      </div>

      {/* Dashboard Title */}
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="bg-white shadow rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <div className="text-sm text-gray-500">{stat.label}</div>
              <div className="text-xl font-bold">{stat.value}</div>
            </div>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </motion.div>
        ))}
      </div>

      {/* Alert Box */}
      <div className="bg-yellow-100 border border-yellow-300 p-4 rounded-lg flex justify-between items-center mb-8">
        <div>
          <p className="text-sm font-semibold text-yellow-800">You have 1 pending consent request</p>
          <p className="text-sm text-yellow-700">Canara HSBC Life Insurance wants to access your data</p>
        </div>
        <button
          onClick={() => navigate('/consent')}
          className="flex items-center text-yellow-800 hover:text-yellow-900 font-semibold"
        >
          Review <ArrowRight className="ml-1 w-4 h-4" />
        </button>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Recent Activity</h3>
        <ul className="space-y-3">
          {activities.map((activity, index) => (
            <li
              key={index}
              className="flex justify-between items-center border-b pb-2 last:border-b-0"
            >
              <div>
                <div className="font-semibold text-gray-800">{activity.partner}</div>
                <div className="text-sm text-gray-500">{activity.action}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">{activity.time}</div>
                <div className={`text-sm font-medium ${activity.success ? 'text-green-600' : 'text-red-600'}`}>
                  {activity.success ? 'Success' : 'Failed'}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Privacy Meter */}
      <div className="mt-8">
        <PrivacyMeter />
      </div>
    </div>
  );
};

export default Dashboard;
