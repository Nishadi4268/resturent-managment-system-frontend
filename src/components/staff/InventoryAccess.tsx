import { useState } from "react";
import { AlertTriangle, Plus, TrendingDown, RefreshCw } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  minStock: number;
  category: string;
  expiryDate?: string;
}

const InventoryAccess = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: "1",
      name: "Tomatoes",
      quantity: 12,
      unit: "kg",
      minStock: 10,
      category: "Vegetables"
    },
    {
      id: "2",
      name: "Chicken Breast",
      quantity: 5,
      unit: "kg",
      minStock: 15,
      category: "Meat",
      expiryDate: "2026-03-10"
    },
    {
      id: "3",
      name: "Olive Oil",
      quantity: 8,
      unit: "liters",
      minStock: 5,
      category: "Oils"
    },
    {
      id: "4",
      name: "Flour",
      quantity: 3,
      unit: "kg",
      minStock: 20,
      category: "Dry Goods"
    },
    {
      id: "5",
      name: "Cheese",
      quantity: 7,
      unit: "kg",
      minStock: 8,
      category: "Dairy"
    }
  ]);

  const lowStockItems = inventory.filter(
    (item) => item.quantity <= item.minStock
  );
  const expiringItems = inventory.filter((item) => item.expiryDate);

  const requestRefill = (itemId: string) => {
    alert(
      `Refill request sent for ${inventory.find((i) => i.id === itemId)?.name}`
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          Inventory Quick Access
        </h2>
        <p className="text-muted-foreground mt-1">
          Manage stock levels and get alerts
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">Total Items</p>
          <p className="text-3xl font-bold">{inventory.length}</p>
        </div>
        <div className="bg-red-50 border border-red-300 rounded-lg p-4">
          <p className="text-sm text-red-700 font-medium mb-2">
            Low Stock Alerts
          </p>
          <p className="text-3xl font-bold text-red-600">
            {lowStockItems.length}
          </p>
        </div>
        <div className="bg-orange-50 border border-orange-300 rounded-lg p-4">
          <p className="text-sm text-orange-700 font-medium mb-2">
            Expiring Soon
          </p>
          <p className="text-3xl font-bold text-orange-600">
            {expiringItems.length}
          </p>
        </div>
        <div className="bg-green-50 border border-green-300 rounded-lg p-4">
          <p className="text-sm text-green-700 font-medium mb-2">In Stock</p>
          <p className="text-3xl font-bold text-green-600">
            {inventory.filter((i) => i.quantity > i.minStock).length}
          </p>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-red-50 border border-red-300 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-red-900">Low Stock Items</h3>
              <p className="text-sm text-red-700 mt-1">
                {lowStockItems.length} item(s) below minimum stock level
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {lowStockItems.map((item) => (
                  <span
                    key={item.id}
                    className="px-2 py-1 bg-red-200 rounded text-xs font-medium"
                  >
                    {item.name}: {item.quantity} {item.unit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expiring Items */}
      {expiringItems.length > 0 && (
        <div className="bg-orange-50 border border-orange-300 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-6 text-orange-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-orange-900">Items Expiring Soon</h3>
              <p className="text-sm text-orange-700 mt-1">
                {expiringItems.length} item(s) expiring within 7 days
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {expiringItems.map((item) => (
                  <span
                    key={item.id}
                    className="px-2 py-1 bg-orange-200 rounded text-xs font-medium"
                  >
                    {item.name}: {item.expiryDate}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inventory List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">All Items</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors">
            <Plus className="size-4" />
            Add Item
          </button>
        </div>

        <div className="grid gap-4">
          {inventory.map((item) => {
            const isLowStock = item.quantity <= item.minStock;
            const usagePercent = (item.quantity / item.minStock) * 100;

            return (
              <div
                key={item.id}
                className={`border-2 rounded-lg p-4 transition-all ${
                  isLowStock
                    ? "bg-red-50 border-red-300"
                    : "bg-card border-border"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-lg">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      {item.quantity}{" "}
                      <span className="text-sm font-normal">{item.unit}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Min: {item.minStock}
                    </p>
                  </div>
                </div>

                {/* Stock Level Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      usagePercent > 50
                        ? "bg-green-500"
                        : usagePercent > 25
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                    style={{ width: `${Math.min(usagePercent, 100)}%` }}
                  />
                </div>

                {item.expiryDate && (
                  <div className="text-xs font-medium text-orange-600 mb-3">
                    Expires: {item.expiryDate}
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => requestRefill(item.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      isLowStock
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                  >
                    <Plus className="size-4" />
                    {isLowStock ? "Urgent Refill" : "Request Refill"}
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                    <TrendingDown className="size-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InventoryAccess;
