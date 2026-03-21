import { useState } from "react";
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  Tag,
  MapPin,
  CreditCard,
  Check
} from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
}

const OrderPlacement = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: "1", name: "Grilled Salmon", price: 24.99, quantity: 1 },
    {
      id: "2",
      name: "Caesar Salad",
      price: 12.99,
      quantity: 2,
      specialInstructions: "No croutons"
    }
  ]);
  const [promoCode, setPromoCode] = useState("");
  const [orderType, setOrderType] = useState<
    "dine-in" | "takeaway" | "delivery"
  >("dine-in");
  const [selectedTable, setSelectedTable] = useState("5");
  const [paymentMethod, setPaymentMethod] = useState<
    "cash" | "card" | "online"
  >("card");

  const updateQuantity = (id: string, change: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = promoCode === "SAVE20" ? subtotal * 0.2 : 0;
  const deliveryFee = orderType === "delivery" ? 5.0 : 0;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">Order Placement</h2>
        <p className="text-muted-foreground mt-1">
          Review and confirm your order
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <ShoppingCart className="size-5" />
              Shopping Cart ({cartItems.length} items)
            </h3>
            <button className="text-sm text-destructive hover:underline">
              Clear Cart
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-lg">
              <ShoppingCart className="size-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold">{item.name}</h4>
                    <p className="text-sm text-primary font-semibold">
                      ${item.price}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-destructive hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                {item.specialInstructions && (
                  <div className="bg-yellow-50 border border-yellow-300 rounded px-3 py-2 mb-3">
                    <p className="text-xs text-yellow-800">
                      <strong>Note:</strong> {item.specialInstructions}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-2 border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="font-bold w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-2 border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                  <span className="font-bold text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                <button className="mt-3 text-sm text-primary hover:underline">
                  + Add special instructions
                </button>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          {/* Promo Code */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Tag className="size-5 text-orange-500" />
              Apply Promo Code
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter code"
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors">
                Apply
              </button>
            </div>
            {promoCode === "SAVE20" && (
              <p className="mt-2 text-sm text-green-600 font-medium">
                ✓ 20% discount applied!
              </p>
            )}
          </div>

          {/* Order Type */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-bold mb-3">Order Type</h3>
            <div className="space-y-2">
              {["dine-in", "takeaway", "delivery"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-3 p-2 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                >
                  <input
                    type="radio"
                    name="orderType"
                    value={type}
                    checked={orderType === type}
                    onChange={(e) =>
                      setOrderType(e.target.value as typeof orderType)
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium capitalize">
                    {type.replace("-", " ")}
                  </span>
                </label>
              ))}
            </div>

            {orderType === "dine-in" && (
              <div className="mt-3">
                <label className="text-sm font-medium mb-2 block">
                  Select Table
                </label>
                <select
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={selectedTable}
                  onChange={(e) => setSelectedTable(e.target.value)}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      Table {num}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {orderType === "delivery" && (
              <div className="mt-3">
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <MapPin className="size-4" />
                  Delivery Address
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  placeholder="Enter your delivery address..."
                />
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <CreditCard className="size-5" />
              Payment Method
            </h3>
            <div className="space-y-2">
              {[
                { value: "cash", label: "Cash", icon: "💵" },
                { value: "card", label: "Card", icon: "💳" },
                { value: "online", label: "Online", icon: "💻" }
              ].map((method) => (
                <label
                  key={method.value}
                  className="flex items-center gap-3 p-2 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.value}
                    checked={paymentMethod === method.value}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value as typeof paymentMethod)
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-xl">{method.icon}</span>
                  <span className="text-sm font-medium">{method.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-bold mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount (20%)</span>
                  <span className="font-medium">-${discount.toFixed(2)}</span>
                </div>
              )}
              {deliveryFee > 0 && (
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-border pt-2 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Confirm Order Button */}
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-bold text-lg">
            <Check className="size-5" />
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPlacement;
