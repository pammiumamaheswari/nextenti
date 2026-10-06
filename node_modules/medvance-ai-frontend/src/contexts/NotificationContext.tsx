import React, { createContext, useContext, useState } from 'react';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'APPLICATION' | 'INTERVIEW' | 'AI_MATCH' | 'VERIFICATION' | 'MESSAGE';
  time: string;
  isRead: boolean;
}

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'time' | 'isRead'>) => void;
}

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    title: 'High AI Job Match (96%)',
    message: 'NovaCare Health Institute posted "Senior Interventional Cardiologist" matching your clinical specialty.',
    type: 'AI_MATCH',
    time: '15m ago',
    isRead: false
  },
  {
    id: 'notif_2',
    title: 'Clinical Interview Scheduled',
    message: 'Medisphere Hospitals scheduled your Video Assessment on April 18 at 11:00 AM.',
    type: 'INTERVIEW',
    time: '2h ago',
    isRead: false
  },
  {
    id: 'notif_3',
    title: 'Medical Registration Verified',
    message: 'Your State Medical Council credentials have been officially validated by the board.',
    type: 'VERIFICATION',
    time: '1d ago',
    isRead: true
  }
];

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const addNotification = (notif: Omit<AppNotification, 'id' | 'time' | 'isRead'>) => {
    const newEntry: AppNotification = {
      ...notif,
      id: `notif_${Date.now()}`,
      time: 'Just now',
      isRead: false
    };
    setNotifications(prev => [newEntry, ...prev]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
};
