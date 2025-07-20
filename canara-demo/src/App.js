import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import DemoFlow from './components/Demo/DemoFlow';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import ConsentList from './components/Consent/ConsentList';
import ConsentApproval from './components/Consent/ConsentApproval';
import ActiveConsents from './components/Consent/ActiveConsents';
import DataAccessDemo from './components/DataAccess/DataAccessDemo';
import RealTimeMonitor from './components/Monitoring/RealTimeMonitor';
import AuditLogs from './components/Monitoring/AuditLogs';
import MonitoringDashboard from './components/Monitoring/MonitoringDashboard'; // ← import it
//<Route path="/monitor" element={<RealTimeMonitor />} />
      //  <Route path="/audit-logs" element={<AuditLogs />} />


function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/demo" element={<DemoFlow />} />
        <Route path="/consent" element={<ConsentList />} />
        <Route path="/consent/:id" element={<ConsentApproval />} />
        <Route path="/active-consents" element={<ActiveConsents />} />
        <Route path="/data-access" element={<DataAccessDemo />} />
        <Route path="/monitoring" element={<MonitoringDashboard />} />
        <Route path="/monitor" element={<RealTimeMonitor />} />
        <Route path="/audit-logs" element={<AuditLogs />} />

      </Routes>
    </Router>
  );
}

export default App;
