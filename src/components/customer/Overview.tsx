import { useState } from "react";
import { Package, Clock, Gift, Tag, TrendingUp, Star } from "lucide-react";

interface Order {
  id: string;
  items: string[];
  status: "preparing" | "ready" | "delivering";
  estimatedTime: string;
}

const Overview = () => {
  const [activeOrders] = useState<Order[]>([
    {
      id: "ORD789",
      items: ["Burger", "Fries", "Coke"],
      status: "preparing",
      estimatedTime: "15 mins"
    },
    {
      id: "ORD790",
      items: ["Pizza", "Garlic Bread"],
      status: "ready",
      estimatedTime: "Ready for pickup"
    }
  ]);

  const offers = [
    {
      id: 1,
      title: "20% OFF on orders above $50",
      code: "SAVE20",
      color: "bg-blue-50 border-blue-300"
    },
    {
      id: 2,
      title: "Free Delivery on First Order",
      code: "FIRSTFREE",
      color: "bg-green-50 border-green-300"
    },
    {
      id: 3,
      title: "Buy 1 Get 1 - Pizzas",
      code: "BOGO",
      color: "bg-orange-50 border-orange-300"
    }
  ];

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "ready":
        return "bg-green-100 text-green-700 border-green-300";
      case "delivering":
        return "bg-blue-100 text-blue-700 border-blue-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
        <p className="text-orange-100">Ready to order something delicious?</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="size-5 text-blue-600" />
            </div>
            <p className="text-sm text-muted-foreground">Active Orders</p>
          </div>
          <p className="text-3xl font-bold">{activeOrders.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Gift className="size-5 text-yellow-600" />
            </div>
            <p className="text-sm text-muted-foreground">Reward Points</p>
          </div>
          <p className="text-3xl font-bold">250</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="size-5 text-green-600" />
            </div>
            <p className="text-sm text-muted-foreground">Total Orders</p>
          </div>
          <p className="text-3xl font-bold">48</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Star className="size-5 text-purple-600" />
            </div>
            <p className="text-sm text-muted-foreground">Member Since</p>
          </div>
          <p className="text-xl font-bold">Jan 2026</p>
        </div>
      </div>

      {/* Active Orders */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Active Orders</h2>
          <button className="text-sm text-primary hover:underline">
            View All
          </button>
        </div>

        {activeOrders.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-lg">
            <Package className="size-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No active orders</p>
          </div>
        ) : (
          activeOrders.map((order) => (
            <div
              key={order.id}
              className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg">{order.id}</h3>
                  <p className="text-sm text-muted-foreground">
                    {order.items.length} item(s)
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="bg-muted rounded p-3 mb-3">
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

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="size-4" />
                <span>{order.estimatedTime}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Ongoing Offers */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Tag className="size-6 text-orange-500" />
          Ongoing Offers & Discounts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`border-2 rounded-lg p-4 ${offer.color}`}
            >
              <h3 className="font-bold mb-2">{offer.title}</h3>
              <div className="flex items-center justify-between">
                <code className="px-3 py-1 bg-white rounded font-mono text-sm font-bold">
                  {offer.code}
                </code>
                <button className="text-sm font-medium hover:underline">
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:bg-muted transition-colors">
            <Package className="size-6 text-blue-500" />
            <span className="text-sm font-medium">New Order</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:bg-muted transition-colors">
            <Clock className="size-6 text-green-500" />
            <span className="text-sm font-medium">Track Order</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:bg-muted transition-colors">
            <Gift className="size-6 text-purple-500" />
            <span className="text-sm font-medium">Rewards</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:bg-muted transition-colors">
            <Tag className="size-6 text-orange-500" />
            <span className="text-sm font-medium">Offers</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
