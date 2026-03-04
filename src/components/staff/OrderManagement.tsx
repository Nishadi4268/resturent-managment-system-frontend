import { useState } from "react";
import {
  Plus,
  Search,
  Clock,
  ChefHat,
  CheckCircle,
  Trash2,
  Eye,
  Filter
} from "lucide-react";

interface Order {
  id: string;
  tableNumber: number;
  customerName: string;
  items: string[];
  status: "pending" | "preparing" | "ready" | "served";
  createdAt: string;
}

const OrderManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | Order["status"]>(
    "all"
  );
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD001",
      tableNumber: 5,
      customerName: "John Doe",
      items: ["Burger", "Fries", "Coke"],
      status: "pending",
      createdAt: "10:30 AM"
    },
    {
      id: "ORD002",
      tableNumber: 8,
      customerName: "Jane Smith",
      items: ["Pizza", "Water"],
      status: "preparing",
      createdAt: "10:35 AM"
    }
  ]);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "preparing":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "ready":
        return "bg-green-100 text-green-700 border-green-300";
      case "served":
        return "bg-gray-100 text-gray-700 border-gray-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getNextStatus = (current: Order["status"]): Order["status"] => {
    const statusFlow: Record<Order["status"], Order["status"]> = {
      pending: "preparing",
      preparing: "ready",
      ready: "served",
      served: "served"
    };
    return statusFlow[current];
  };

  const updateOrderStatus = (orderId: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, status: getNextStatus(order.status) }
          : order
      )
    );
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.tableNumber.toString().includes(searchQuery);

    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">Order Management</h2>
        <p className="text-muted-foreground mt-1">
          Manage and track all customer orders in real-time
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">New Orders</p>
          <p className="text-3xl font-bold">
            {orders.filter((o) => o.status === "pending").length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">Preparing</p>
          <p className="text-3xl font-bold">
            {orders.filter((o) => o.status === "preparing").length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">Ready</p>
          <p className="text-3xl font-bold">
            {orders.filter((o) => o.status === "ready").length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">Total Orders</p>
          <p className="text-3xl font-bold">{orders.length}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by Order ID / Table Number / Customer Name"
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="size-5 text-muted-foreground" />
          <select
            className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as typeof filterStatus)
            }
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="served">Served</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Orders</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90">
            <Plus className="size-4" />
            New Order
          </button>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-lg">
            <p className="text-muted-foreground">No orders found</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-lg">{order.id}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Table {order.tableNumber} • {order.customerName}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="size-4" />
                  {order.createdAt}
                </span>
              </div>

              <div className="bg-muted rounded p-3 mb-4">
                <p className="text-sm font-medium mb-2">Items:</p>
                <div className="flex flex-wrap gap-2">
                  {order.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-background px-2 py-1 rounded text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => updateOrderStatus(order.id)}
                  disabled={order.status === "served"}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChefHat className="size-4" />
                  {order.status === "served"
                    ? "Order Completed"
                    : `Move to ${getNextStatus(order.status)}`}
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  <Eye className="size-4" />
                  View Details
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  <Trash2 className="size-4" />
                  Cancel
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
