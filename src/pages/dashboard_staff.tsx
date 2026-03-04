import { useState } from "react";
import {
  ClipboardList,
//   Chair,
  UtensilsCrossed,
  Package,
  Users,
  CreditCard,
  TrendingUp,
  Bell,
  BarChart3,
  LogOut,
  Menu,
  X,
  ChefHat,
  AlertCircle
} from "lucide-react";
import OrderManagement from "../components/staff/OrderManagement";
import TableManagement from "../components/staff/TableManagement";
import MenuKitchenView from "../components/staff/MenuKitchenView";
import InventoryAccess from "../components/staff/InventoryAccess";
import CustomerManagement from "../components/staff/CustomerManagement";
import PaymentSection from "../components/staff/PaymentSection";
import StaffPerformance from "../components/staff/StaffPerformance";
import NotificationsPanel from "../components/staff/NotificationsPanel";
import Reports from "../components/staff/Reports";

type DashboardTab =
  | "orders"
  | "tables"
  | "menu"
  | "inventory"
  | "customers"
  | "payment"
  | "performance"
  | "notifications"
  | "reports";

interface MenuItem {
  id: DashboardTab;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const StaffDashboard = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>("orders");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems: MenuItem[] = [
    {
      id: "orders",
      label: "Order Management",
      icon: <ClipboardList className="size-5" />,
      color: "text-blue-500"
    },
    // {
    //   id: "tables",
    //   label: "Table Management",
    //   icon: <Chair className="size-5" />,
    //   color: "text-purple-500"
    // },
    {
      id: "menu",
      label: "Menu & Kitchen View",
      icon: <UtensilsCrossed className="size-5" />,
      color: "text-orange-500"
    },
    {
      id: "inventory",
      label: "Inventory Quick Access",
      icon: <Package className="size-5" />,
      color: "text-green-500"
    },
    {
      id: "customers",
      label: "Customer Management",
      icon: <Users className="size-5" />,
      color: "text-pink-500"
    },
    {
      id: "payment",
      label: "Payment Section",
      icon: <CreditCard className="size-5" />,
      color: "text-emerald-500"
    },
    {
      id: "performance",
      label: "Staff Performance",
      icon: <TrendingUp className="size-5" />,
      color: "text-indigo-500"
    },
    {
      id: "notifications",
      label: "Notifications Panel",
      icon: <Bell className="size-5" />,
      color: "text-red-500"
    },
    {
      id: "reports",
      label: "Reports",
      icon: <BarChart3 className="size-5" />,
      color: "text-cyan-500"
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return <OrderManagement />;
      case "tables":
        return <TableManagement />;
      case "menu":
        return <MenuKitchenView />;
      case "inventory":
        return <InventoryAccess />;
      case "customers":
        return <CustomerManagement />;
      case "payment":
        return <PaymentSection />;
      case "performance":
        return <StaffPerformance />;
      case "notifications":
        return <NotificationsPanel />;
      case "reports":
        return <Reports />;
      default:
        return <OrderManagement />;
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
              <ChefHat className="size-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Staff Portal</h1>
              <p className="text-xs text-muted-foreground">Restaurant Hub</p>
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
            {/* Quick Alerts */}
            <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="size-4 text-red-500" />
              <span className="text-sm font-medium text-red-700">
                3 Low Stock Items
              </span>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">ST</span>
              </div>
              <div className="text-sm">
                <p className="font-medium">Staff Name</p>
                <p className="text-xs text-muted-foreground">Staff Member</p>
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

export default StaffDashboard;
