import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, ChevronRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ConsentList = () => {
  const navigate = useNavigate();

  const requests = [
    {
      id: 'demo-request-123',
      partner: 'Canara HSBC Life Insurance',
      purpose: 'Term life insurance underwriting for ₹50 lakh coverage',
      dataRequested: ['Income Range', 'Employment Status', 'Financial Stability'],
      expires: '7 days',
      status: 'pending'
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Consent Requests</h1>
        <button 
          onClick={() => navigate('/dashboard')}
          className="bg-white text-canara-blue px-4 py-2 rounded-lg border hover:bg-gray-50 font-semibold"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Content */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-700 mb-1">Pending Consent Requests</h2>
        <p className="text-gray-500 mb-4">Review and manage data sharing requests</p>

        {requests.map((request, index) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md cursor-pointer mb-4"
            onClick={() => navigate(`/consent/${request.id}`)}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-3">
                <div className="bg-canara-blue text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {request.partner[0]}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{request.partner}</h3>
                  <p className="text-sm text-yellow-600 font-medium">Pending Review</p>
                </div>
              </div>
              <ChevronRight className="text-gray-400" />
            </div>

            <p className="text-gray-700 mb-2">{request.purpose}</p>

            <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-2">
              {request.dataRequested.map((data, i) => (
                <span
                  key={i}
                  className="bg-gray-100 border px-2 py-1 rounded-full text-xs"
                >
                  {data}
                </span>
              ))}
            </div>

            <p className="text-sm text-gray-500 flex items-center">
              <Clock className="w-4 h-4 mr-1" /> Expires in: {request.expires}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Help Message */}
      <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded-lg">
        <div className="flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 mt-1" />
          <div>
            <h4 className="font-semibold">What happens next?</h4>
            <p className="text-sm mt-1">
              Click on the request to review details and set your privacy conditions. 
              You control what data to share, for how long, and how many times it can be accessed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentList;
