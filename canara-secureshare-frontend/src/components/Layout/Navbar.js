import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, LogOut, User, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow-md flex items-center justify-between">
      <div className="flex items-center gap-2 text-xl font-bold">
        <Shield className="w-6 h-6" />
        <span>Canara SecureShare</span>
      </div>

      {user && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div className="relative">
            <Bell className="w-5 h-5 cursor-pointer" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </div>

          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <span>{user.first_name || user.username}</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-red-500 hover:bg-red-600 rounded"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
