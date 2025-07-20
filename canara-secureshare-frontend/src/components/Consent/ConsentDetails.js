import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  Clock,
  Database,
  AlertCircle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { consentService } from '../../services/consent';
import LoadingSpinner from '../Common/LoadingSpinner';
import { DATA_CATEGORIES } from '../../utils/constants';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const ConsentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [duration, setDuration] = useState(7);
  const [accessLimit, setAccessLimit] = useState(10);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchRequestDetails();
  }, [id]);

  const fetchRequestDetails = async () => {
    try {
      const data = await consentService.getConsentDetails(id);
      setRequest(data);
      setSelectedCategories(data.requested_data_categories.map(cat => cat.code));
    } catch (error) {
      toast.error('Failed to fetch request details');
      navigate('/consent-requests');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryToggle = (categoryCode) => {
    setSelectedCategories(prev =>
      prev.includes(categoryCode)
        ? prev.filter(code => code !== categoryCode)
        : [...prev, categoryCode]
    );
  };

  const handleApprove = async () => {
    if (selectedCategories.length === 0) {
      toast.error('Please select at least one data category');
      return;
    }

    setProcessing(true);
    try {
      await consentService.approveConsent(id, {
        consented_categories: selectedCategories,
        duration_days: duration,
        max_access_count: accessLimit,
      });
      toast.success('Consent approved successfully');
      navigate('/active-consents');
    } catch (error) {
      toast.error('Failed to approve consent');
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    setProcessing(true);
    try {
      await consentService.rejectConsent(id);
      toast.success('Consent request rejected');
      navigate('/consent-requests');
    } catch (error) {
      toast.error('Failed to reject consent');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner message="Loading request details..." />
      </div>
    );
  }

  if (!request) return null;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Consent Request Details</h2>
        <p className="text-gray-600">Review and configure data sharing permissions</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 text-blue-600 w-12 h-12 flex items-center justify-center rounded-full font-bold">
            {request.partner_name?.charAt(0) || 'P'}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{request.partner_name}</h3>
            <p className="text-sm text-gray-500">{request.partner_type}</p>
            <p className="text-sm text-gray-500">
              Requested on: {format(new Date(request.created_at), 'PPP')}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h4 className="text-lg font-semibold mb-2">Purpose of Request</h4>
        <p className="text-gray-700">{request.purpose}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h4 className="text-lg font-semibold mb-2">Requested Data Categories</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {request.requested_data_categories.map((category) => (
            <label key={category.code} className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.code)}
                onChange={() => handleCategoryToggle(category.code)}
                className="mt-1 w-5 h-5 text-canara-blue rounded"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{DATA_CATEGORIES[category.code]?.icon || '📁'}</span>
                  <span className="font-medium">{category.name}</span>
                </div>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <label className="block font-semibold mb-1">Consent Duration (days)</label>
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="input-field w-full border rounded p-2"
          >
            <option value={1}>1 day</option>
            <option value={7}>7 days</option>
            <option value={30}>30 days</option>
            <option value={90}>90 days</option>
          </select>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <label className="block font-semibold mb-1">Access Limit</label>
          <select
            value={accessLimit}
            onChange={(e) => setAccessLimit(Number(e.target.value))}
            className="input-field w-full border rounded p-2"
          >
            <option value={1}>1 time</option>
            <option value={5}>5 times</option>
            <option value={10}>10 times</option>
            <option value={50}>50 times</option>
            <option value={100}>100 times</option>
          </select>
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded border border-yellow-300">
        <h4 className="font-semibold text-yellow-800 mb-2">Important Information</h4>
        <ul className="text-sm text-yellow-700 list-disc pl-5 space-y-1">
          <li>You can revoke this consent at any time.</li>
          <li>All data access will be logged and visible to you.</li>
          <li>Data will be shared in a privacy-preserving format.</li>
          <li>Access will automatically expire after the set duration.</li>
        </ul>
      </div>

      <div className="flex justify-between space-x-4 mt-6">
        <button
          onClick={handleReject}
          disabled={processing}
          className="bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200 disabled:opacity-50"
        >
          <XCircle className="inline w-5 h-5 mr-1" /> Reject Request
        </button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleApprove}
          disabled={processing || selectedCategories.length === 0}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          <CheckCircle className="inline w-5 h-5 mr-2" /> Approve with Conditions
        </motion.button>
      </div>
    </div>
  );
};

export default ConsentDetails;
