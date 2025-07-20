import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';

import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PrivateRoute from './components/Auth/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';
import ConsentList from './components/Consent/ConsentList';
import ConsentDetails from './components/Consent/ConsentDetails';
import ActiveConsents from './components/Consent/ActiveConsents';
import AccessHistory from './components/Audit/AccessHistory';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/consents" element={<ConsentList />} />
              <Route path="/consents/:id" element={<ConsentDetails />} />
              <Route path="/active-consents" element={<ActiveConsents />} />
              <Route path="/access-history" element={<AccessHistory />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
