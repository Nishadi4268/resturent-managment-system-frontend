import { useEffect, useMemo, useState } from "react";
import { Download, RotateCcw, Star, TrendingUp } from "lucide-react";

type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "out-for-delivery"
  | "completed"
  | "cancelled";

interface PastOrder {
  _id: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    specialInstructions?: string;
  }[];
  pricing: {
    total: number;
  };
  status: OrderStatus;
  createdAt: string;
  requestedDateTime?: string;
}

const API_BASE_URL = "http://localhost:5000";

const formatDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleString();
};

const getStatusBadgeStyles = (status: OrderStatus) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    case "pending":
      return "bg-gray-100 text-gray-700";
    case "confirmed":
      return "bg-blue-100 text-blue-700";
    case "preparing":
      return "bg-yellow-100 text-yellow-700";
    case "out-for-delivery":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const OrderHistory = () => {
  const [pastOrders, setPastOrders] = useState<PastOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("Please login to view order history.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await fetch(`${API_BASE_URL}/api/orders/my`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load order history");
        }

        const sortedOrders = [...(data.orders || [])].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setPastOrders(sortedOrders);
      } catch (error: unknown) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Failed to load order history"
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  const totalSpent = useMemo(
    () =>
      pastOrders
        .filter((o) => o.status === "completed")
        .reduce((sum, o) => sum + (o.pricing?.total || 0), 0),
    [pastOrders]
  );

  const completedOrders = useMemo(
    () => pastOrders.filter((o) => o.status === "completed").length,
    [pastOrders]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">Order History</h2>
        <p className="text-muted-foreground mt-1">
          View your past orders and receipts
        </p>
      </div>

      {/* Spending Summary */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="size-6" />
          Your Spending Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-sm opacity-90 mb-1">Total Orders</p>
            <p className="text-3xl font-bold">{pastOrders.length}</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-sm opacity-90 mb-1">Completed Orders</p>
            <p className="text-3xl font-bold">{completedOrders}</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-sm opacity-90 mb-1">Total Spent</p>
            <p className="text-3xl font-bold">${totalSpent.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Order History List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Past Orders</h3>

        {isLoading ? (
          <div className="text-center py-12 bg-card border border-border rounded-lg">
            <p className="text-muted-foreground">Loading order history...</p>
          </div>
        ) : errorMessage ? (
          <div className="text-center py-12 bg-card border border-border rounded-lg">
            <p className="text-red-600">{errorMessage}</p>
          </div>
        ) : pastOrders.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-lg">
            <p className="text-muted-foreground">No order history found</p>
          </div>
        ) : (
          pastOrders.map((order) => (
            <div
              key={order._id}
              className={`bg-card border-2 rounded-lg p-4 ${
                order.status === "cancelled" ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-bold text-lg">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Placed: {formatDate(order.createdAt)}
                  </p>
                  {order.requestedDateTime && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Requested: {formatDate(order.requestedDateTime)}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    ${(order.pricing?.total || 0).toFixed(2)}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${getStatusBadgeStyles(order.status)}`}
                  >
                    {order.status.toUpperCase().replace(/-/g, " ")}
                  </span>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-3 mb-4">
                <p className="text-sm font-medium mb-2">Items:</p>
                <div className="flex flex-wrap gap-2">
                  {order.items.map((item, idx) => (
                    <span
                      key={`${item.id}-${idx}`}
                      className="bg-background px-2 py-1 rounded text-xs font-medium"
                    >
                      {item.name} x{item.quantity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rating */}
              {order.status === "completed" && (
                <div className="mb-4">
                  <button className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <Star className="size-4" />
                    Rate this order
                  </button>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                {order.status === "completed" && (
                  <>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors">
                      <RotateCcw className="size-4" />
                      Reorder
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                      <Download className="size-4" />
                      Invoice
                    </button>
                  </>
                )}
                {order.status === "cancelled" && (
                  <button className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                    View Details
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
