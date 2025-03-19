import { useState, useEffect } from 'react';
import './App.css';
import notificationData from './notifications'; 

const NotificationItem = ({ notification, onClear }) => {
  return (
    <li key={notification.id}>
      <p><strong>{notification.name}:</strong> {notification.message}</p>
      <button onClick={() => onClear(notification.id)}>Dismiss</button>
    </li>
  );
};

//display notification count
const NotificationCount = ({ count }) => {
  return (
    <p>{count} New Notifications</p>
  );
};

//app component
const NotificationApp = () => {
  const [notifications, setNotifications] = useState(notificationData);

  //remove a notification
  const dismissNotification = (id) => {
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== id));
  };

  //clear all notifications
  const dismissAllNotifications = () => {
    setNotifications([]);
  };

  //notification count
  const totalNotifications = notifications.length;

  //logging total notification count whenever it changes
  useEffect(() => {
    console.log(`There are now ${totalNotifications} notifications.`);
  }, [totalNotifications]);

  return (
    <div className="notification-container">
      <h2>Notifications</h2>

      <NotificationCount count={totalNotifications} />

      <ul>
        {notifications.map(notification => (
          <NotificationItem 
            key={notification.id} 
            notification={notification} 
            onClear={dismissNotification}
          />
        ))}
      </ul>

      <button 
        onClick={dismissAllNotifications} 
        disabled={totalNotifications === 0}
      >
        Dismiss All Notifications
      </button>
    </div>
  );
};

export default NotificationApp;

