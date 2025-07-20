import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    username: 'priya.sharma',
    password: 'demo123'
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    localStorage.setItem('token', 'demo-jwt-token');
    localStorage.setItem('user', JSON.stringify({
      username: formData.username,
      name: 'Priya Sharma'
    }));
    toast.success('Login successful!');
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md relative">
        <div className="text-center mb-6">
          <Shield className="mx-auto text-canara-blue" size={40} />
          <h2 className="text-2xl font-bold mt-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to Canara SecureShare</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-canara-blue"
              required
            />
          </div>

          <div className="relative">
            <label className="block font-medium text-gray-700 mb-1">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-canara-blue pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-canara-blue text-white font-semibold py-2 rounded-lg flex justify-center items-center gap-2"
          >
            Sign In
            <ArrowRight size={16} />
          </motion.button>
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-canara-blue font-medium hover:underline">
            Sign up
          </Link>
        </p>

        <div className="text-xs text-gray-500 mt-6 text-center">
          <strong>Demo Credentials:</strong><br />
          Username: <code>priya.sharma</code><br />
          Password: <code>demo123</code>
        </div>
      </div>
    </div>
  );
};

export default Login;
