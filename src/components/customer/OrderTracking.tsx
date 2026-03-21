import { useState } from "react";
import { MapPin, Clock, CheckCircle, X, Truck } from "lucide-react";

interface Order {
  id: string;
  items: string[];
  status: "pending" | "preparing" | "ready" | "delivering" | "completed";
  estimatedTime: string;
  orderType: "dine-in" | "takeaway" | "delivery";
  table?: number;
  createdAt: string;
  trackingSteps: {
    label: string;
    completed: boolean;
    time?: string;
  }[];
}

const OrderTracking = () => {
  const [activeOrders] = useState<Order[]>([
    {
      id: "ORD789",
      items: ["Grilled Salmon", "Caesar Salad", "Iced Coffee"],
      status: "preparing",
      estimatedTime: "15 mins",
      orderType: "dine-in",
      table: 5,
      createdAt: "10:30 AM",
      trackingSteps: [
        { label: "Order Placed", completed: true, time: "10:30 AM" },
        { label: "Confirmed", completed: true, time: "10:31 AM" },
        { label: "Preparing", completed: true, time: "10:32 AM" },
        { label: "Ready", completed: false },
        { label: "Served", completed: false }
      ]
    },
    {
      id: "ORD790",
      items: ["Margherita Pizza", "Chocolate Cake"],
      status: "delivering",
      estimatedTime: "10 mins",
      orderType: "delivery",
      createdAt: "10:15 AM",
      trackingSteps: [
        { label: "Order Placed", completed: true, time: "10:15 AM" },
        { label: "Confirmed", completed: true, time: "10:16 AM" },
        { label: "Preparing", completed: true, time: "10:17 AM" },
        { label: "Out for Delivery", completed: true, time: "10:35 AM" },
        { label: "Delivered", completed: false }
      ]
    }
  ]);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-700 border-gray-300";
      case "preparing":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "ready":
        return "bg-green-100 text-green-700 border-green-300";
      case "delivering":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "completed":
        return "bg-purple-100 text-purple-700 border-purple-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "preparing":
        return <Clock className="size-5" />;
      case "ready":
        return <CheckCircle className="size-5" />;
      case "delivering":
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
      </div>

      {/* Active Orders */}
      {activeOrders.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <MapPin className="size-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No active orders to track</p>
        </div>
      ) : (
        <div className="space-y-6">
          {activeOrders.map((order) => (
            <div
              key={order.id}
              className="bg-card border-2 border-border rounded-lg p-6"
            >
              {/* Order Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold mb-1">{order.id}</h3>
                  <p className="text-sm text-muted-foreground">
                    Placed at {order.createdAt}
                    {order.table && ` • Table ${order.table}`}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border-2 ${getStatusColor(order.status)}`}
                  >
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                  <p className="text-sm text-muted-foreground mt-2">
                    Est. {order.estimatedTime}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-muted rounded-lg p-4 mb-6">
                <p className="text-sm font-medium mb-2">Items Ordered:</p>
                <div className="flex flex-wrap gap-2">
                  {order.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-background px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {item}
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
                    {order.trackingSteps.map((step, idx) => (
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
                          {step.time && (
                            <p className="text-xs text-muted-foreground">
                              {step.time}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
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
                order.status === "delivering" && (
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
                {order.status === "pending" && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium">
                    <X className="size-4" />
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
