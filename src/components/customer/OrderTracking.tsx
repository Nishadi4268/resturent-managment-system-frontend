import { useCallback, useEffect, useMemo, useState } from "react";
import { MapPin, Clock, CheckCircle, X, Truck } from "lucide-react";

type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "out-for-delivery"
  | "completed"
  | "cancelled";

interface TrackedOrder {
  _id: string;
  items: {
    id: string;
    name: string;
    quantity: number;
  }[];
  status: OrderStatus;
  orderType: "dine-in" | "takeaway" | "delivery";
  tableNumber?: string;
  createdAt: string;
  requestedDateTime?: string;
}

const API_BASE_URL = "http://localhost:5000";

const ORDER_FLOW: OrderStatus[] = [
  "pending",
  "confirmed",
  "preparing",
  "out-for-delivery",
  "completed"
];

const formatDate = (value?: string) => {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "-";
  return parsed.toLocaleString();
};

const getEstimatedTime = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return "20 mins";
    case "confirmed":
      return "18 mins";
    case "preparing":
      return "12 mins";
    case "out-for-delivery":
      return "10 mins";
    case "completed":
      return "Delivered";
    case "cancelled":
      return "Cancelled";
    default:
      return "-";
  }
};

const getTrackingSteps = (
  status: OrderStatus,
  orderType: TrackedOrder["orderType"]
) => {
  const flowForOrder =
    orderType === "delivery"
      ? ORDER_FLOW
      : ["pending", "confirmed", "preparing", "completed"];

  const currentIndex = flowForOrder.indexOf(status);

  const labelMap: Record<string, string> = {
    pending: "Order Placed",
    confirmed: "Confirmed",
    preparing: "Preparing",
    "out-for-delivery": "Out for Delivery",
    completed: orderType === "delivery" ? "Delivered" : "Served"
  };

  return flowForOrder.map((step, index) => ({
    label: labelMap[step] || step,
    completed: currentIndex >= 0 && index <= currentIndex
  }));
};

const OrderTracking = () => {
  const [activeOrders, setActiveOrders] = useState<TrackedOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(
    null
  );
  const [confirmCancelOrder, setConfirmCancelOrder] =
    useState<TrackedOrder | null>(null);

  const token = useMemo(() => localStorage.getItem("token"), []);

  const loadActiveOrders = useCallback(async () => {
    if (!token) {
      setIsLoading(false);
      setStatusType("error");
      setStatusMessage("Please login to track your orders.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/orders/my/active`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load active orders");
      }

      const sortedOrders = [...(data.orders || [])].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setActiveOrders(sortedOrders);
      setStatusType("");
      setStatusMessage("");
    } catch (error: unknown) {
      setStatusType("error");
      setStatusMessage(
        error instanceof Error ? error.message : "Failed to load active orders"
      );
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadActiveOrders();
  }, [loadActiveOrders]);

  const cancelOrder = async (orderId: string) => {
    if (!token) return;

    try {
      setCancellingOrderId(orderId);
      const response = await fetch(
        `${API_BASE_URL}/api/orders/${orderId}/cancel`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to cancel order");
      }

      setStatusType("success");
      setStatusMessage("Order cancelled successfully.");
      await loadActiveOrders();
    } catch (error: unknown) {
      setStatusType("error");
      setStatusMessage(
        error instanceof Error ? error.message : "Failed to cancel order"
      );
    } finally {
      setCancellingOrderId(null);
    }
  };

  const getStatusColor = (status: TrackedOrder["status"]) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-700 border-gray-300";
      case "confirmed":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "preparing":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "out-for-delivery":
        return "bg-purple-100 text-purple-700 border-purple-300";
      case "completed":
        return "bg-green-100 text-green-700 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: TrackedOrder["status"]) => {
    switch (status) {
      case "preparing":
        return <Clock className="size-5" />;
      case "completed":
        return <CheckCircle className="size-5" />;
      case "out-for-delivery":
        return <Truck className="size-5" />;
      default:
        return <MapPin className="size-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">Order Tracking</h2>
        <p className="text-muted-foreground mt-1">
          Track your orders in real-time
        </p>
        {statusMessage && (
          <p
            className={`mt-2 text-sm font-medium ${
              statusType === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {statusMessage}
          </p>
        )}
      </div>

      {/* Active Orders */}
      {isLoading ? (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <p className="text-muted-foreground">Loading active orders...</p>
        </div>
      ) : activeOrders.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <MapPin className="size-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No active orders to track</p>
        </div>
      ) : (
        <div className="space-y-6">
          {activeOrders.map((order) => (
            <div
              key={order._id}
              className="bg-card border-2 border-border rounded-lg p-6"
            >
              {/* Order Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold mb-1">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Placed at {formatDate(order.createdAt)}
                    {order.tableNumber && ` • Table ${order.tableNumber}`}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Requested: {formatDate(order.requestedDateTime)}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border-2 ${getStatusColor(order.status)}`}
                  >
                    {getStatusIcon(order.status)}
                    {order.status.replace(/-/g, " ")}
                  </span>
                  <p className="text-sm text-muted-foreground mt-2">
                    Est. {getEstimatedTime(order.status)}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-muted rounded-lg p-4 mb-6">
                <p className="text-sm font-medium mb-2">Items Ordered:</p>
                <div className="flex flex-wrap gap-2">
                  {order.items.map((item, idx) => (
                    <span
                      key={`${item.id}-${idx}`}
                      className="bg-background px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {item.name} x{item.quantity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tracking Progress */}
              <div className="mb-6">
                <h4 className="font-bold mb-4">Order Progress</h4>
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

                  <div className="space-y-6">
                    {getTrackingSteps(order.status, order.orderType).map(
                      (step, idx) => (
                        <div
                          key={idx}
                          className="relative flex items-start gap-4"
                        >
                          {/* Step Circle */}
                          <div
                            className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                              step.completed
                                ? "bg-green-500 border-green-500"
                                : "bg-background border-border"
                            }`}
                          >
                            {step.completed ? (
                              <CheckCircle className="size-5 text-white" />
                            ) : (
                              <div className="w-3 h-3 rounded-full bg-gray-300" />
                            )}
                          </div>

                          {/* Step Content */}
                          <div className="flex-1 pt-1">
                            <p
                              className={`font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {step.label}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Kitchen Updates */}
              {order.status === "preparing" && (
                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <Clock className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">
                        Kitchen Update
                      </p>
                      <p className="text-sm text-blue-700">
                        Your order is being freshly prepared by our chef
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Delivery Tracking */}
              {order.orderType === "delivery" &&
                order.status === "out-for-delivery" && (
                  <div className="bg-purple-50 border border-purple-300 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <Truck className="size-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-purple-900">
                          Out for Delivery
                        </p>
                        <p className="text-sm text-purple-700 mb-2">
                          Your delivery partner is on the way
                        </p>
                        <button className="text-sm text-purple-600 hover:underline font-medium">
                          Track on Map →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-medium">
                  View Details
                </button>
                {(order.status === "pending" ||
                  order.status === "confirmed") && (
                  <button
                    onClick={() => setConfirmCancelOrder(order)}
                    disabled={cancellingOrderId === order._id}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <X className="size-4" />
                    {cancellingOrderId === order._id
                      ? "Cancelling..."
                      : "Cancel Order"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {confirmCancelOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-xl">
            <h3 className="text-lg font-bold text-foreground">
              Cancel This Order?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Are you sure you want to cancel Order #
              {confirmCancelOrder._id.slice(-6).toUpperCase()}?
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setConfirmCancelOrder(null)}
                className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                Keep Order
              </button>
              <button
                onClick={async () => {
                  const orderId = confirmCancelOrder._id;
                  setConfirmCancelOrder(null);
                  await cancelOrder(orderId);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Yes, Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
