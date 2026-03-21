import { useState } from "react";
import {
  Home,
  UtensilsCrossed,
  ShoppingCart,
  MapPin,
  History,
  User,
  Calendar,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Gift
} from "lucide-react";
import Overview from "../components/customer/Overview";
import MenuBrowsing from "../components/customer/MenuBrowsing";
import OrderPlacement from "../components/customer/OrderPlacement";
import OrderTracking from "../components/customer/OrderTracking";
import OrderHistory from "../components/customer/OrderHistory";
import ProfileManagement from "../components/customer/ProfileManagement";
import Reservations from "../components/customer/Reservations";
import FeedbackSupport from "../components/customer/FeedbackSupport";

type DashboardTab =
  | "overview"
  | "menu"
  | "cart"
  | "tracking"
  | "history"
  | "profile"
  | "reservations"
  | "feedback";

interface MenuItem {
  id: DashboardTab;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const Dashboard_customer = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems: MenuItem[] = [
    {
      id: "overview",
      label: "Dashboard Home",
      icon: <Home className="size-5" />,
      color: "text-blue-500"
    },
    {
      id: "menu",
      label: "Menu Browsing",
      icon: <UtensilsCrossed className="size-5" />,
      color: "text-orange-500"
    },
    {
      id: "cart",
      label: "Order Placement",
      icon: <ShoppingCart className="size-5" />,
      color: "text-green-500"
    },
    {
      id: "tracking",
      label: "Order Tracking",
      icon: <MapPin className="size-5" />,
      color: "text-purple-500"
    },
    {
      id: "history",
      label: "Order History",
      icon: <History className="size-5" />,
      color: "text-cyan-500"
    },
    {
      id: "profile",
      label: "Profile Management",
      icon: <User className="size-5" />,
      color: "text-pink-500"
    },
    {
      id: "reservations",
      label: "Reservations",
      icon: <Calendar className="size-5" />,
      color: "text-indigo-500"
    },
    {
      id: "feedback",
      label: "Feedback & Support",
      icon: <MessageSquare className="size-5" />,
      color: "text-emerald-500"
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "menu":
        return <MenuBrowsing />;
      case "cart":
        return <OrderPlacement />;
      case "tracking":
        return <OrderTracking />;
      case "history":
        return <OrderHistory />;
      case "profile":
        return <ProfileManagement />;
      case "reservations":
        return <Reservations />;
      case "feedback":
        return <FeedbackSupport />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300 bg-card border-r border-border shadow-lg flex flex-col overflow-hidden`}
      >
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-500 rounded-lg">
              <Gift className="size-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Customer Portal</h1>
              <p className="text-xs text-muted-foreground">Order & Enjoy</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <span
                className={
                  activeTab === item.id ? "text-primary-foreground" : item.color
                }
              >
                {item.icon}
              </span>
              <span className="text-sm font-medium text-left">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-red-50 transition-colors duration-200">
            <LogOut className="size-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 border-b border-border bg-card shadow-sm flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {sidebarOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>

          <div className="flex items-center gap-4">
            {/* Rewards Points */}
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Gift className="size-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-700">
                250 Points
              </span>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">JD</span>
              </div>
              <div className="text-sm">
                <p className="font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Customer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6 bg-background/50">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard_customer;
