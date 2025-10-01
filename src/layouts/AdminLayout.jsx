import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NotificationToast from '../components/NotificationToast';
import { useNotifications } from '../hooks/useNotifications';

const AdminLayout = ({ children }) => {
  const { notifications, removeNotification } = useNotifications();
  const location = useLocation();

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/policies', label: 'Policies', icon: '📋' },
    { path: '/admin/users', label: 'Users', icon: '👥' },
    {path: '/admin/claims', label: 'Claims', icon: '📝' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Admin Panel</h2>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    isActiveRoute(item.path)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
      <Footer />
      <NotificationToast
        notifications={notifications}
        onClose={removeNotification}
      />
    </div>
  );
};

export default AdminLayout;