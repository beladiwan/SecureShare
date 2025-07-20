import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileCheck, Clock, ChevronRight } from 'lucide-react';
import { consentService } from '../../services/consent';
import LoadingSpinner from '../Common/LoadingSpinner';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const ConsentList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await consentService.getConsentRequests();
      setRequests(data.results || data);
    } catch (error) {
      toast.error('Failed to fetch consent requests');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner message="Loading consent requests..." />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Consent Requests</h2>
        <p className="text-gray-600">Review and manage data sharing requests</p>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white shadow rounded p-6 text-gray-500 text-center">
          No pending consent requests
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request, index) => (
            <motion.div
              key={request.request_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition-all cursor-pointer"
              onClick={() => navigate(`/consents/${request.request_id}`)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    {request.partner_name?.charAt(0) || 'P'}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{request.partner_name}</h3>
                    <p className="text-sm text-gray-500">{request.partner_type}</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-400 mt-1" />
              </div>

              <div className="mt-3 text-sm text-gray-700">
                <strong>Purpose:</strong> {request.purpose}
              </div>

              <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-600">
                {request.requested_data_categories?.map((category, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 px-2 py-1 rounded-full border text-gray-700"
                  >
                    {category.name}
                  </span>
                ))}
              </div>

              <div className="mt-3 text-sm text-gray-500">
                <Clock className="inline mr-1 w-4 h-4" />
                Expires: {format(new Date(request.expires_at), 'PPP')}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConsentList;
