import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Activity, Trash2 } from 'lucide-react';
import { consentService } from '../../services/consent';
import LoadingSpinner from '../Common/LoadingSpinner';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const ActiveConsents = () => {
  const [consents, setConsents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [revoking, setRevoking] = useState(null);

  useEffect(() => {
    fetchActiveConsents();
  }, []);

  const fetchActiveConsents = async () => {
    try {
      const data = await consentService.getActiveConsents();
      setConsents(data);
    } catch (error) {
      toast.error('Failed to fetch active consents');
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async (consentId) => {
    if (!window.confirm('Are you sure you want to revoke this consent?')) {
      return;
    }

    setRevoking(consentId);
    try {
      await consentService.revokeConsent(consentId, 'User requested revocation');
      toast.success('Consent revoked successfully');
      setConsents(consents.filter(c => c.consent_id !== consentId));
    } catch (error) {
      toast.error('Failed to revoke consent');
    } finally {
      setRevoking(null);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" message="Loading active consents..." />;
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Active Consents</h1>
        <p className="text-gray-600 mt-2">Monitor and manage your active data sharing permissions</p>
      </div>

      {consents.length === 0 ? (
        <div className="card text-center py-12">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No active consents</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {consents.map((consent, index) => (
            <motion.div
              key={consent.consent_id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="card"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-canara-blue rounded-full flex items-center justify-center text-white font-bold">
                    {consent.partner_name?.charAt(0) || 'P'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{consent.partner_name}</h3>
                    <p className="text-sm text-gray-600">{consent.purpose}</p>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRevoke(consent.consent_id)}
                  disabled={revoking === consent.consent_id}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  Expires: {format(new Date(consent.token_expires_at), 'PPP')}
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Activity className="w-4 h-4 mr-2" />
                  Access: {consent.access_count} / {consent.max_access_count}
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {consent.consented_data_categories?.map((category) => (
                    <span
                      key={category.code}
                      className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-canara-blue h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${(consent.access_count / consent.max_access_count) * 100}%` 
                    }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {Math.round((consent.access_count / consent.max_access_count) * 100)}% of access limit used
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveConsents;