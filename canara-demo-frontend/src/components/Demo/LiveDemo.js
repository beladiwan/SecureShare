import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const LiveDemo = ({ step }) => {
  const getDemoContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-3 text-sm font-mono text-gray-700">
            <h3 className="font-bold text-lg">API Demo: User Registration</h3>
            <div>
              <span className="font-semibold text-green-600">POST</span> /api/v1/auth/register/
            </div>
            <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
              {JSON.stringify({
                username: "priya.sharma",
                email: "priya@example.com",
                password: "SecurePass123",
                first_name: "Priya",
                last_name: "Sharma",
                phone_number: "+919876543210"
              }, null, 2)}
            </pre>
            <div className="font-medium text-gray-600">Response:</div>
            <pre className="bg-green-100 p-3 rounded-md overflow-x-auto">
              {JSON.stringify({
                message: "User created successfully",
                user: {
                  id: 1,
                  username: "priya.sharma",
                  email: "priya@example.com"
                }
              }, null, 2)}
            </pre>
          </div>
        );

      case 3:
        return (
          <div className="space-y-3 text-sm font-mono text-gray-700">
            <h3 className="font-bold text-lg">API Demo: Consent Approval</h3>
            <div>
              <span className="font-semibold text-green-600">POST</span> /api/v1/consent/123/approve/
            </div>
            <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
              {JSON.stringify({
                consented_categories: ["income_range", "employment_status"],
                duration_days: 7,
                max_access_count: 5
              }, null, 2)}
            </pre>
            <div className="font-medium text-gray-600">Response:</div>
            <pre className="bg-green-100 p-3 rounded-md overflow-x-auto">
              {JSON.stringify({
                message: "Consent granted successfully",
                consent_id: "c123-456-789",
                access_token: "eyJhbGciOiJIUzI1NiIs...",
                expires_at: "2025-01-25T15:30:00Z"
              }, null, 2)}
            </pre>
          </div>
        );

      case 4:
        return (
          <div className="space-y-3 text-sm font-mono text-gray-700">
            <h3 className="font-bold text-lg">API Demo: Data Access</h3>
            <div>
              <span className="font-semibold text-blue-600">GET</span> /api/v1/data-access/eyJhbGciOiJIUzI1NiIs.../
            </div>
            <div className="font-medium text-gray-600">Response - Privacy Preserved:</div>
            <pre className="bg-blue-100 p-3 rounded-md overflow-x-auto">
              {JSON.stringify({
                data: {
                  income_range: "75k_100k",
                  employment_status: "salaried_stable",
                  financial_stability: "excellent"
                },
                remaining_access: 4,
                expires_at: "2025-01-25T15:30:00Z"
              }, null, 2)}
            </pre>
            <div className="text-yellow-800 bg-yellow-100 p-3 rounded-md">
              <strong>Notice:</strong> No exact salary (₹95,000), no company name (Infosys),
              no transaction details – only privacy-safe insights!
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const content = getDemoContent();
  if (!content) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border rounded-xl shadow-lg p-6 mt-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Terminal className="text-gray-600" size={20} />
        <h2 className="text-xl font-semibold text-gray-800">Live API Demo</h2>
      </div>
      {content}
    </motion.div>
  );
};

export default LiveDemo;
