import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext(null);

// Notification shape:
// { id, title, message, time, type: 'success'|'warning'|'danger'|'trip'|'info', isRead }

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback(({ title, message, type = 'info' }) => {
    const newNotif = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
      title,
      message,
      time: 'Just now',
      type,
      isRead: false,
      createdAt: Date.now(),
    };
    setNotifications(prev => [newNotif, ...prev]);
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  }, []);

  const markOneRead = useCallback((id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        addNotification,
        markAllRead,
        markOneRead,
        unreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);
