import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  FileCheck, 
  AlertCircle, 
  Activity,
  TrendingUp,
  Lock
} from 'lucide-react';
import StatsCard from './StatsCard';
import PrivacyMeter from './PrivacyMeter';
import LoadingSpinner from '../Common/LoadingSpinner';
import { consentService } from '../../services/consent';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import toast from 'react-hot-toast';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await consentService.getDashboardStats();
      setStats(data);
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner message="Loading dashboard..." />
      </div>
    );
  }

  const chartData = {
    labels: ['Active Consents', 'Pending Requests', 'Revoked'],
    datasets: [
      {
        data: [
          stats?.stats?.active_consents || 0,
          stats?.stats?.pending_requests || 0,
          5 // Mock revoked count
        ],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-600">Monitor your data sharing activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard 
          title="Active Consents" 
          value={stats?.stats?.active_consents || 0} 
          icon={Shield} 
          color="green" 
          trend={12} 
        />
        <StatsCard 
          title="Pending Requests" 
          value={stats?.stats?.pending_requests || 0} 
          icon={FileCheck} 
          color="yellow" 
          trend={-5} 
        />
        <StatsCard 
          title="Privacy Score" 
          value={`${stats?.privacy_score || 0}%`} 
          icon={Lock} 
          color="blue" 
        />
      </div>

      {/* Privacy Meter */}
      <div className="max-w-md mx-auto">
        <PrivacyMeter score={stats?.privacy_score || 0} />
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Recent Activity</h3>
        <div className="bg-white rounded shadow p-4 space-y-3">
          {stats?.top_accessors?.length > 0 ? (
            stats.top_accessors.map((accessor, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="bg-blue-100 text-blue-700 w-10 h-10 rounded-full flex items-center justify-center font-semibold">
                  {accessor.partner__name?.charAt(0) || 'P'}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {accessor.partner__name || 'Unknown Partner'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {accessor.access_count} accesses
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recent activity</p>
          )}
        </div>
      </div>

      {/* Consent Distribution Chart */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Consent Distribution</h3>
        <div className="bg-white rounded shadow p-6 w-full max-w-md mx-auto">
          <Doughnut data={chartData} />
        </div>
      </div>

      {/* Pending Consent Alert */}
      {stats?.stats?.pending_requests > 0 && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
          <p className="font-semibold">
            You have {stats.stats.pending_requests} pending consent requests
          </p>
          <p className="text-sm">
            Review and respond to maintain control over your data
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
