import { useState } from "react";
import { AlertCircle, Bell, TrendingDown, AlertTriangle } from "lucide-react";

interface Notification {
  id: string;
  type: "order" | "stock" | "announcement" | "alert";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "N001",
      type: "order",
      title: "New Order Alert",
      message: "Table 5 placed an order - 3 items",
      timestamp: "2 minutes ago",
      isRead: false
    },
    {
      id: "N002",
      type: "stock",
      title: "Low Stock Alert",
      message: "Chicken breast inventory at critical level",
      timestamp: "5 minutes ago",
      isRead: false
    },
    {
      id: "N003",
      type: "alert",
      title: "Urgent Kitchen Alert",
      message: "Order ORD005 is pending for 20 minutes",
      timestamp: "8 minutes ago",
      isRead: false
    },
    {
      id: "N004",
      type: "announcement",
      title: "Manager Announcement",
      message: "Staff meeting at 3 PM in the conference room",
      timestamp: "15 minutes ago",
      isRead: true
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "order":
        return <Bell className="size-5 text-blue-500" />;
      case "stock":
        return <TrendingDown className="size-5 text-orange-500" />;
      case "alert":
        return <AlertCircle className="size-5 text-red-500" />;
      case "announcement":
        return <AlertTriangle className="size-5 text-purple-500" />;
      default:
        return <Bell className="size-5" />;
    }
  };

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "order":
        return "bg-blue-50 border-blue-300";
      case "stock":
        return "bg-orange-50 border-orange-300";
      case "alert":
        return "bg-red-50 border-red-300";
      case "announcement":
        return "bg-purple-50 border-purple-300";
      default:
        return "bg-gray-50 border-gray-300";
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          Notifications Panel
        </h2>
        <p className="text-muted-foreground mt-1">
          Stay updated with real-time alerts and announcements
        </p>
      </div>

      {/* Unread Count */}
      <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-blue-900">Unread Notifications</h3>
            <p className="text-sm text-blue-700">
              {unreadCount} new notification(s)
            </p>
          </div>
          <div className="text-3xl font-bold text-blue-600">{unreadCount}</div>
        </div>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
          <p className="text-sm text-blue-700 font-medium mb-2">New Orders</p>
          <p className="text-3xl font-bold text-blue-600">
            {notifications.filter((n) => n.type === "order").length}
          </p>
        </div>
        <div className="bg-orange-50 border border-orange-300 rounded-lg p-4">
          <p className="text-sm text-orange-700 font-medium mb-2">
            Stock Alerts
          </p>
          <p className="text-3xl font-bold text-orange-600">
            {notifications.filter((n) => n.type === "stock").length}
          </p>
        </div>
        <div className="bg-red-50 border border-red-300 rounded-lg p-4">
          <p className="text-sm text-red-700 font-medium mb-2">
            Kitchen Alerts
          </p>
          <p className="text-3xl font-bold text-red-600">
            {notifications.filter((n) => n.type === "alert").length}
          </p>
        </div>
        <div className="bg-purple-50 border border-purple-300 rounded-lg p-4">
          <p className="text-sm text-purple-700 font-medium mb-2">
            Announcements
          </p>
          <p className="text-3xl font-bold text-purple-600">
            {notifications.filter((n) => n.type === "announcement").length}
          </p>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">All Notifications</h3>
          {unreadCount > 0 && (
            <button className="text-sm text-primary hover:underline">
              Mark all as read
            </button>
          )}
        </div>

        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${getNotificationColor(notification.type)} ${
                !notification.isRead ? "border-current" : "opacity-75"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-bold">{notification.title}</h4>
                    {!notification.isRead && (
                      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></span>
                    )}
                  </div>
                  <p className="text-sm mb-2">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {notification.timestamp}
                  </p>
                </div>
              </div>

              {notification.type === "alert" && (
                <div className="mt-3 ml-9 flex gap-2">
                  <button className="text-xs px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                    Take Action
                  </button>
                  <button className="text-xs px-3 py-1 border border-current rounded hover:opacity-75 transition-opacity">
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-bold mb-4">Notification Settings</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm">Enable new order notifications</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm">Enable low stock alerts</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm">Enable kitchen alerts</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-sm">Enable sound notifications</span>
          </label>
        </div>
        <button className="mt-4 w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default NotificationsPanel;
