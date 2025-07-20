import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DataAccessDemo = () => {
  const navigate = useNavigate();
  const [showTransformation, setShowTransformation] = useState(false);
  const [accessCount, setAccessCount] = useState(1);

  const originalData = {
    name: "Priya Sharma",
    salary: "₹95,000",
    company: "Infosys Ltd",
    position: "Senior Software Developer",
    transactions: [
      { date: "2025-01-15", merchant: "Swiggy", amount: "₹543", category: "Food" },
      { date: "2025-01-14", merchant: "Amazon", amount: "₹2,341", category: "Shopping" },
      { date: "2025-01-13", merchant: "Uber", amount: "₹187", category: "Transport" }
    ],
    creditScore: 782,
    accountBalance: "₹4,52,000"
  };

  const transformedData = {
    income_range: "75k_100k",
    employment_status: "salaried_stable",
    financial_stability: "excellent"
  };

  const handleAccessData = () => {
    setShowTransformation(true);
    setAccessCount(prev => prev + 1);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Data Transformation Demo</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-white text-canara-blue px-4 py-2 rounded-lg font-semibold border hover:bg-gray-50"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Info */}
      <div>
        <h2 className="text-lg font-semibold">Privacy-Preserving Data Transformation</h2>
        <p className="text-sm text-gray-600">See how we protect your data while sharing useful insights</p>
      </div>

      {/* API Request Format */}
      <div className="bg-gray-100 p-4 rounded text-sm font-mono text-gray-700">
        <p className="mb-1 text-gray-600 font-semibold"># Partner API Request</p>
        GET /api/v1/data-access/eyJhbGciOiJIUzI1NiIs.../ <br />
        Authorization: Bearer partner-api-key
      </div>

      {/* Original Data */}
      <div className="bg-white border rounded-lg p-6 shadow-sm space-y-2">
        <h3 className="font-semibold text-gray-800 text-lg">Your Actual Data</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li><strong>Name:</strong> {originalData.name}</li>
          <li><strong>Exact Salary:</strong> {originalData.salary}/month</li>
          <li><strong>Company:</strong> {originalData.company}</li>
          <li><strong>Position:</strong> {originalData.position}</li>
          <li><strong>Credit Score:</strong> {originalData.creditScore}</li>
          <li><strong>Account Balance:</strong> {originalData.accountBalance}</li>
          <li><strong>Recent Transactions:</strong>
            <ul className="ml-4 list-disc">
              {originalData.transactions.map((tx, i) => (
                <li key={i}>
                  {tx.date}: {tx.merchant} - {tx.amount}
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <p className="text-red-500 text-sm mt-2">❌ This sensitive data is NEVER shared directly</p>
      </div>

      {/* Transformed Data */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="font-semibold text-gray-800 text-lg">What Partner Receives</h3>
        {!showTransformation ? (
          <button
            onClick={handleAccessData}
            className="mt-4 bg-canara-blue text-white px-4 py-2 rounded hover:bg-blue-800"
          >
            Simulate Partner Access
          </button>
        ) : (
          <div className="space-y-2 text-sm text-gray-700 mt-3">
            <p><strong>Income Range:</strong> {transformedData.income_range}</p>
            <p><strong>Employment Status:</strong> {transformedData.employment_status}</p>
            <p><strong>Financial Stability:</strong> {transformedData.financial_stability}</p>
            <p className="mt-3">
              <strong>Access Count:</strong> {accessCount} / 5
              <br />
              <strong>Remaining Access:</strong> {5 - accessCount} times
            </p>
            <p className="text-green-600 text-sm mt-2">✅ Only privacy-safe insights are shared</p>
          </div>
        )}
      </div>

      {/* API Response */}
      {showTransformation && (
        <div className="bg-gray-900 text-green-400 font-mono p-4 rounded text-xs overflow-auto">
          <p className="text-white font-semibold mb-2"># API Response</p>
          <pre>
            {JSON.stringify({
              status: "success",
              data: transformedData,
              metadata: {
                consent_id: "c123-456-789",
                access_count: accessCount,
                remaining_access: 5 - accessCount,
                expires_at: "2025-01-25T15:30:00Z"
              }
            }, null, 2)}
          </pre>
        </div>
      )}

      {/* Key Privacy Benefits */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg space-y-2 text-sm">
        <h4 className="font-semibold text-yellow-700">Key Privacy Benefits</h4>
        <ul className="list-disc list-inside text-yellow-800">
          <li><strong>No PII Exposure:</strong> Your name, exact salary, and personal details are never shared</li>
          <li><strong>Purpose-Limited:</strong> Partner only gets data relevant to insurance underwriting</li>
          <li><strong>Access Control:</strong> Limited access count and automatic expiry protects your data</li>
        </ul>
      </div>
    </div>
  );
};

export default DataAccessDemo;
