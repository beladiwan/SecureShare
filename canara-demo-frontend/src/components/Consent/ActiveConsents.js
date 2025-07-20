import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ActiveConsents = () => {
  const navigate = useNavigate();
  const [consents, setConsents] = useState([
    {
      id: '1',
      partner: 'Canara HSBC Life Insurance',
      purpose: 'Term life insurance underwriting',
      categories: ['Income Range', 'Employment Status'],
      accessCount: 2,
      maxAccess: 5,
      expiresIn: '5 days',
      token: 'eyJhbGciOiJIUzI1NiIs...'
    },
    {
      id: '2',
      partner: 'HDFC Bank',
      purpose: 'Loan eligibility check',
      categories: ['Financial Stability'],
      accessCount: 3,
      maxAccess: 10,
      expiresIn: '12 days',
      token: 'eyJhbGciOiJIUzI1NiIs...'
    }
  ]);

  const handleRevoke = (consentId) => {
    if (window.confirm('Are you sure you want to revoke this consent? This action cannot be undone.')) {
      setConsents(consents.filter(c => c.id !== consentId));
      toast.success('Consent revoked successfully!');
      toast.success('Partner access has been terminated immediately', {
        icon: '🔒'
      });
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Active Consents</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-white text-canara-blue px-4 py-2 rounded-lg font-semibold border hover:bg-gray-50"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Info Text */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-700">Your Active Consents</h2>
        <p className="text-sm text-gray-500">Monitor and manage your data sharing permissions</p>
      </div>

      {/* Consent Cards */}
      <div className="space-y-6">
        {consents.map((consent, index) => {
          const percentage = Math.round((consent.accessCount / consent.maxAccess) * 100);
          return (
            <div
              key={consent.id}
              className="bg-white border rounded-xl p-5 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-600 font-medium">● Active</span>
              </div>

              <div>
                <h3 className="text-lg font-semibold">{consent.partner}</h3>
                <p className="text-sm text-gray-600">{consent.purpose}</p>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                <p><strong>Expires in:</strong> {consent.expiresIn}</p>
                <p><strong>Access:</strong> {consent.accessCount} / {consent.maxAccess}</p>
                <p className="flex flex-wrap gap-2 items-center">
                  <strong>Categories:</strong>
                  {consent.categories.map((cat, i) => (
                    <span key={i} className="bg-gray-100 px-2 py-1 rounded text-xs">{cat}</span>
                  ))}
                </p>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-canara-blue h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{percentage}% of access limit used</p>
              </div>

              <button
                onClick={() => handleRevoke(consent.id)}
                className="w-full bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-200"
              >
                Revoke Consent
              </button>
            </div>
          );
        })}
      </div>

      {/* Info Notice */}
      <div className="mt-10 bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded-lg">
        <h4 className="font-semibold mb-1">Instant Revocation</h4>
        <p className="text-sm">
          When you revoke consent, access is terminated immediately. The partner will no longer
          be able to access your data, even if they haven't used their full quota.
        </p>
      </div>
    </div>
  );
};

export default ActiveConsents;
