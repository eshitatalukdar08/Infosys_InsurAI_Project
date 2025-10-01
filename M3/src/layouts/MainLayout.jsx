import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NotificationToast from '../components/NotificationToast';
import { useNotifications } from '../hooks/useNotifications';

const MainLayout = ({ children }) => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <NotificationToast
        notifications={notifications}
        onClose={removeNotification}
      />
    </div>
  );
};

export default MainLayout;