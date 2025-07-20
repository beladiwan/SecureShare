import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  FileCheck, 
  Shield, 
  History, 
  Settings,
  PieChart
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/consents', icon: FileCheck, label: 'Consent Requests' },
    { path: '/active-consents', icon: Shield, label: 'Active Consents' },
    { path: '/access-history', icon: History, label: 'Access History' },
    { path: '/analytics', icon: PieChart, label: 'Analytics' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-64 h-full bg-white border-r shadow-sm p-4 space-y-2">
      {menuItems.map(({ path, icon: Icon, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <Icon className="w-5 h-5" />
          <span className="text-sm font-medium">{label}</span>
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
