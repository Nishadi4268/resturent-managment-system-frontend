import { useState } from "react";
import { Download, RotateCcw, Star, TrendingUp } from "lucide-react";

interface PastOrder {
  id: string;
  items: string[];
  total: number;
  date: string;
  status: "completed" | "cancelled";
  rating?: number;
}

const OrderHistory = () => {
  const [pastOrders] = useState<PastOrder[]>([
    {
      id: "ORD780",
      items: ["Grilled Salmon", "Caesar Salad"],
      total: 37.98,
      date: "March 1, 2026",
      status: "completed",
      rating: 5
    },
    {
      id: "ORD775",
      items: ["Margherita Pizza", "Iced Coffee"],
      total: 24.98,
      date: "Feb 28, 2026",
      status: "completed",
      rating: 4
    },
    {
      id: "ORD770",
      items: ["Chocolate Cake"],
      total: 8.99,
      date: "Feb 25, 2026",
      status: "completed"
    },
    {
      id: "ORD765",
      items: ["Ribeye Steak", "Wine"],
      total: 45.0,
      date: "Feb 20, 2026",
      status: "cancelled"
    }
  ]);

  const totalSpent = pastOrders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.total, 0);

  const completedOrders = pastOrders.filter(
    (o) => o.status === "completed"
  ).length;

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

        {pastOrders.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-lg">
            <p className="text-muted-foreground">No order history found</p>
          </div>
        ) : (
          pastOrders.map((order) => (
            <div
              key={order.id}
              className={`bg-card border-2 rounded-lg p-4 ${
                order.status === "cancelled" ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-bold text-lg">{order.id}</h4>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    ${order.total.toFixed(2)}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-3 mb-4">
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

              {/* Rating */}
              {order.status === "completed" && (
                <div className="mb-4">
                  {order.rating ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Your Rating:
                      </span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`size-4 ${
                              i < order.rating!
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button className="flex items-center gap-2 text-sm text-primary hover:underline">
                      <Star className="size-4" />
                      Rate this order
                    </button>
                  )}
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
