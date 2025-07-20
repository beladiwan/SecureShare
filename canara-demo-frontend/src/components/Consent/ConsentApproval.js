import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ConsentApproval = () => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState(['income_range', 'employment_status']);
  const [duration, setDuration] = useState(7);
  const [accessLimit, setAccessLimit] = useState(5);

  const dataCategories = [
    {
      code: 'income_range',
      name: 'Income Range',
      description: 'Share income bracket (e.g., 75k-100k) instead of exact salary',
      icon: '💰',
      originalData: 'Exact Salary: ₹95,000',
      transformedData: 'Income Range: 75k-100k'
    },
    {
      code: 'employment_status',
      name: 'Employment Status',
      description: 'Share employment type without company details',
      icon: '💼',
      originalData: 'Company: Infosys Ltd, Position: Senior Developer',
      transformedData: 'Employment: Salaried, IT Sector, Stable'
    },
    {
      code: 'financial_stability',
      name: 'Financial Stability',
      description: 'Share financial health score without transaction details',
      icon: '📊',
      originalData: '500+ transactions, detailed spending patterns',
      transformedData: 'Financial Stability: Excellent'
    }
  ];

  const handleApprove = () => {
    toast.success('Consent approved with your conditions!');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
    toast.success(`Access token generated: ${token.substring(0, 20)}...`, {
      duration: 5000
    });
    navigate('/active-consents');
  };

  const handleReject = () => {
    toast.success('Consent request rejected');
    navigate('/consent-requests');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Consent Approval</h1>
        <button
          onClick={() => navigate('/consent')}
          className="bg-white text-canara-blue px-4 py-2 rounded-lg font-semibold border hover:bg-gray-50"
        >
          Back
        </button>
      </div>

      {/* Partner Info */}
      <div className="bg-white border rounded-xl p-5 mb-6 shadow-sm">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-canara-blue text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
            C
          </div>
          <div>
            <h2 className="text-lg font-semibold">Canara HSBC Life Insurance</h2>
            <p className="text-sm text-gray-500">Insurance Company</p>
          </div>
        </div>
        <p className="text-gray-600 text-sm">
          <strong>Purpose of Request:</strong> Term life insurance underwriting for ₹50 lakh coverage
        </p>
      </div>

      {/* Data Categories */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Select Data to Share</h3>
        <div className="space-y-4">
          {dataCategories.map((category) => (
            <div
              key={category.code}
              className="border rounded-lg p-4 bg-white shadow-sm flex flex-col space-y-2"
            >
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.code)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategories([...selectedCategories, category.code]);
                    } else {
                      setSelectedCategories(
                        selectedCategories.filter((c) => c !== category.code)
                      );
                    }
                  }}
                  className="w-5 h-5 text-canara-blue"
                />
                <span className="text-lg font-semibold">
                  {category.icon} {category.name}
                </span>
              </label>
              <p className="text-sm text-gray-600">{category.description}</p>
              <div className="flex justify-between text-sm bg-gray-50 p-2 rounded-md">
                <div>
                  <p className="text-red-600 font-medium">❌ Without Privacy</p>
                  <p className="text-gray-700">{category.originalData}</p>
                </div>
                <div>
                  <p className="text-green-600 font-medium">✅ With Privacy</p>
                  <p className="text-gray-700">{category.transformedData}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Access Controls */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Set Access Limits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Consent Duration</label>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-canara-blue"
            >
              <option value={1}>1 day</option>
              <option value={7}>7 days</option>
              <option value={30}>30 days</option>
              <option value={90}>90 days</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Access Limit</label>
            <select
              value={accessLimit}
              onChange={(e) => setAccessLimit(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-canara-blue"
            >
              <option value={1}>1 time only</option>
              <option value={5}>5 times</option>
              <option value={10}>10 times</option>
              <option value={50}>50 times</option>
            </select>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-300 text-blue-800 p-4 rounded-lg mb-6">
        <h4 className="font-semibold mb-1">Important Information</h4>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>You can revoke this consent at any time</li>
          <li>All data access will be logged and visible to you</li>
          <li>Data will be transformed to protect your privacy</li>
          <li>Access will automatically expire after {duration} days</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handleReject}
          className="bg-red-100 text-red-600 px-6 py-3 rounded-lg font-medium hover:bg-red-200"
        >
          Reject Request
        </button>
        <button
          onClick={handleApprove}
          disabled={selectedCategories.length === 0}
          className="bg-canara-blue text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          Approve with Conditions
        </button>
      </div>
    </div>
  );
};

export default ConsentApproval;
