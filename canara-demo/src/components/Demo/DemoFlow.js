import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  ChevronRight,
  Play,
  Monitor,
  Database,
  Lock,
  Users,
  Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import LiveDemo from './LiveDemo';

const DemoFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const navigate = useNavigate();

  const demoSteps = [
    {
      title: "The Problem",
      duration: "30 seconds",
      icon: Database,
      description:
        "Currently, when Canara Bank customers apply for insurance, the insurance company gets ALL their financial data - exact salary, every transaction, spending habits - forever. Users have no control or visibility.",
      action: () => setShowAdminPanel(true),
      buttonText: "Show Admin Panel"
    },
    {
      title: "User Registration/Login",
      duration: "30 seconds",
      icon: Users,
      description:
        "Our platform gives users control. Let me show you. First, users create an account with privacy preferences.",
      action: () => navigate('/register'),
      buttonText: "Show Registration"
    },
    {
      title: "Consent Request",
      duration: "1 minute",
      icon: Shield,
      description:
        "When an insurance company wants data, they create a request. Users see EXACTLY what's being asked for.",
      action: () => navigate('/consent'),
      buttonText: "Show Consent Requests"
    },
    {
      title: "Consent Approval with Conditions",
      duration: "1 minute",
      icon: Lock,
      description:
        "Users can approve with CONDITIONS - selecting what to share, for how long, and how many times.",
      action: () => navigate('/consent/demo-request-123'),
      buttonText: "Show Approval Flow"
    },
    {
      title: "Data Transformation Magic",
      duration: "1 minute",
      icon: Activity,
      description:
        "Here's the innovation - we transform data before sharing. Instead of exact salary ₹95,000, we share 'income range: 75k-100k'",
      action: () => navigate('/data-access'),
      buttonText: "Show Data Transformation"
    },
    {
      title: "Real-time Monitoring",
      duration: "30 seconds",
      icon: Monitor,
      description: "Users see every access in real-time",
      action: () => navigate('/monitor'),
      buttonText: "Show Live Monitoring"
    },
    {
      title: "Revocation Power",
      duration: "30 seconds",
      icon: Shield,
      description: "Users can revoke access instantly",
      action: () => navigate('/active-consents'),
      buttonText: "Show Revocation"
    }
  ];

  const currentStepData = demoSteps[currentStep];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-canara-blue">Canara SecureShare</h1>
          <p className="text-gray-600">Privacy-First Banking Data Platform</p>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-white text-canara-blue px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
        >
          Go to Dashboard
        </button>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-4">
        {demoSteps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center cursor-pointer ${
              index < demoSteps.length - 1 ? 'flex-1' : ''
            }`}
            onClick={() => setCurrentStep(index)}
          >
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold ${
                index === currentStep
                  ? 'bg-canara-blue text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {index + 1}
            </div>
            {index < demoSteps.length - 1 && (
              <ChevronRight className="text-gray-400 mx-1" />
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <div className="flex items-center gap-4">
          <currentStepData.icon size={32} className="text-canara-blue" />
          <div>
            <h2 className="text-xl font-semibold">
              Step {currentStep + 1}: {currentStepData.title}
            </h2>
            <p className="text-sm text-gray-500">Duration: {currentStepData.duration}</p>
          </div>
          <span className="ml-auto bg-gray-100 px-3 py-1 rounded text-xs font-medium text-gray-700">
            Demo Mode
          </span>
        </div>

        <p className="text-gray-700">{currentStepData.description}</p>

        <div className="flex gap-4">
          <button
            onClick={currentStepData.action}
            className="bg-canara-blue text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            {currentStepData.buttonText}
          </button>

          {currentStep < demoSteps.length - 1 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-green-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
            >
              Next Step
              <ChevronRight size={18} />
            </motion.button>
          )}
        </div>
      </div>

      {/* Admin Panel Modal */}
      {showAdminPanel && <AdminPanel onClose={() => setShowAdminPanel(false)} />}
    </div>
  );
};

export default DemoFlow;
