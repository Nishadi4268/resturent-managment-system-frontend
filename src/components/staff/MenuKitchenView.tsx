import { useState } from "react";
import { AlertCircle, Eye, Clock, Zap } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  available: boolean;
  prepTime: number;
  specialInstructions?: string;
}

const MenuKitchenView = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Grilled Salmon",
      category: "Main",
      available: true,
      prepTime: 15,
      specialInstructions: "No salt"
    },
    {
      id: "2",
      name: "Caesar Salad",
      category: "Appetizer",
      available: true,
      prepTime: 5
    },
    {
      id: "3",
      name: "Ribeye Steak",
      category: "Main",
      available: false,
      prepTime: 20
    },
    {
      id: "4",
      name: "Chocolate Cake",
      category: "Dessert",
      available: true,
      prepTime: 8
    },
    {
      id: "5",
      name: "French Fries",
      category: "Side",
      available: true,
      prepTime: 6
    }
  ]);

  const toggleAvailability = (id: string) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  const categories = [...new Set(menuItems.map((item) => item.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          Menu & Kitchen View
        </h2>
        <p className="text-muted-foreground mt-1">
          Kitchen Display Panel & Menu Management
        </p>
      </div>

      {/* KDS Status */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 flex items-center gap-4">
        <Zap className="size-6 text-blue-600" />
        <div className="flex-1">
          <h3 className="font-semibold text-blue-900">
            Kitchen Display System Active
          </h3>
          <p className="text-sm text-blue-700">
            Real-time order tracking and prep time management
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          View KDS
        </button>
      </div>

      {/* Menu Items by Category */}
      {categories.map((category) => (
        <div key={category} className="space-y-4">
          <h3 className="text-xl font-bold text-foreground">{category}s</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {menuItems
              .filter((item) => item.category === category)
              .map((item) => (
                <div
                  key={item.id}
                  className={`border-2 rounded-lg p-4 transition-all ${
                    item.available
                      ? "bg-green-50 border-green-300"
                      : "bg-red-50 border-red-300"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{item.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="size-4" />
                        <span className="text-sm text-muted-foreground">
                          {item.prepTime} min prep
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.available
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {item.available ? "AVAILABLE" : "OUT OF STOCK"}
                    </span>
                  </div>

                  {item.specialInstructions && (
                    <div className="bg-yellow-100 border border-yellow-300 rounded px-3 py-2 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <AlertCircle className="size-4 text-yellow-700" />
                        <span className="font-medium text-yellow-800">
                          {item.specialInstructions}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleAvailability(item.id)}
                      className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                        item.available
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-green-500 hover:bg-green-600 text-white"
                      }`}
                    >
                      {item.available ? "Mark Out of Stock" : "Mark Available"}
                    </button>
                    <button className="flex items-center justify-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                      <Eye className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* Kitchen Alert */}
      <div className="bg-orange-50 border border-orange-300 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="size-6 text-orange-600" />
          <div>
            <h3 className="font-semibold text-orange-900">
              Pending Special Instructions
            </h3>
            <p className="text-sm text-orange-800">
              3 orders with custom instructions in kitchen
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuKitchenView;
