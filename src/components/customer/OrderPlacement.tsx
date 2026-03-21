import { useCallback, useEffect, useState } from "react";
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  Tag,
  MapPin,
  CreditCard,
  Check,
  Square,
  SquareCheck,
  Clock3
} from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  specialInstructions?: string;
}

const API_BASE_URL = "http://localhost:5000";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

const toDateTimeLocalValue = (date: Date) => {
  const pad = (value: number) => String(value).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const OrderPlacement = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [orderType, setOrderType] = useState<
    "dine-in" | "takeaway" | "delivery"
  >("dine-in");
  const [selectedTable, setSelectedTable] = useState("5");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [requestedDateTime, setRequestedDateTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "cash" | "card" | "online"
  >("card");
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");
  const minRequestedDateTime = toDateTimeLocalValue(new Date());

  const getToken = () => localStorage.getItem("token");

  const loadCart = useCallback(async () => {
    const token = getToken();

    if (!token) {
      setCartItems([]);
      setStatusType("error");
      setStatusMessage("Please login to view your cart.");
      setIsCartLoading(false);
      return;
    }

    try {
      setIsCartLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load cart");
      }

      setCartItems(data.cart?.items || []);
      setSelectedItemIds([]);
      setStatusType("");
      setStatusMessage("");
    } catch (error: unknown) {
      setStatusType("error");
      setStatusMessage(getErrorMessage(error, "Failed to load cart"));
    } finally {
      setIsCartLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const updateQuantity = async (id: string, change: number) => {
    const currentItem = cartItems.find((item) => item.id === id);

    if (!currentItem) return;

    const nextQuantity = Math.max(1, currentItem.quantity + change);
    const token = getToken();

    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ quantity: nextQuantity })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update quantity");
      }

      setCartItems(data.cart?.items || []);
    } catch (error: unknown) {
      setStatusType("error");
      setStatusMessage(getErrorMessage(error, "Failed to update quantity"));
    }
  };

  const removeItem = async (id: string) => {
    const token = getToken();

    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/items/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove item");
      }

      setCartItems(data.cart?.items || []);
      setSelectedItemIds((prev) =>
        prev.filter((selectedId) => selectedId !== id)
      );
    } catch (error: unknown) {
      setStatusType("error");
      setStatusMessage(getErrorMessage(error, "Failed to remove item"));
    }
  };

  const clearCart = async () => {
    const token = getToken();

    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to clear cart");
      }

      setCartItems(data.cart?.items || []);
      setSelectedItemIds([]);
    } catch (error: unknown) {
      setStatusType("error");
      setStatusMessage(getErrorMessage(error, "Failed to clear cart"));
    }
  };

  const toggleItemSelection = (id: string) => {
    setSelectedItemIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const currentCartIds = cartItems.map((item) => item.id);
    const allSelected =
      currentCartIds.length > 0 &&
      currentCartIds.every((id) => selectedItemIds.includes(id));

    setSelectedItemIds(allSelected ? [] : currentCartIds);
  };

  const placeOrder = async () => {
    const token = getToken();

    if (!token) {
      setStatusType("error");
      setStatusMessage("Please login first to place order.");
      return;
    }

    if (selectedItemIds.length === 0) {
      setStatusType("error");
      setStatusMessage("Please select at least one cart item to place order.");
      return;
    }

    if (!requestedDateTime) {
      setStatusType("error");
      setStatusMessage("Please select your requested order date and time.");
      return;
    }

    if (new Date(requestedDateTime).getTime() < Date.now()) {
      setStatusType("error");
      setStatusMessage("Requested order date and time cannot be in the past.");
      return;
    }

    try {
      setIsPlacingOrder(true);
      const selectedCount = selectedItemIds.length;

      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          selectedItemIds,
          items: selectedCartItems.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            specialInstructions: item.specialInstructions
          })),
          promoCode,
          orderType,
          tableNumber: orderType === "dine-in" ? selectedTable : undefined,
          deliveryAddress:
            orderType === "delivery" ? deliveryAddress : undefined,
          requestedDateTime,
          paymentMethod
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      setStatusType("success");
      setStatusMessage(
        `Order placed successfully with ${selectedCount} selected item${selectedCount > 1 ? "s" : ""}.`
      );
      setPromoCode("");
      setSelectedItemIds([]);
      await loadCart();
    } catch (error: unknown) {
      setStatusType("error");
      setStatusMessage(getErrorMessage(error, "Failed to place order"));
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const selectedCartItems = cartItems.filter((item) =>
    selectedItemIds.includes(item.id)
  );

  const subtotal = selectedCartItems.reduce(
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
        <p className="text-xs text-muted-foreground mt-1">
          You can select multiple cart items and place them in one order.
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <ShoppingCart className="size-5" />
              Shopping Cart ({cartItems.length} items)
            </h3>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSelectAll}
                className="text-sm text-primary hover:underline"
              >
                {cartItems.length > 0 &&
                cartItems.every((item) => selectedItemIds.includes(item.id))
                  ? "Unselect All"
                  : "Select All"}
              </button>
              <button
                onClick={clearCart}
                className="text-sm text-destructive hover:underline"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {isCartLoading ? (
            <div className="text-center py-12 bg-card border border-border rounded-lg">
              <p className="text-muted-foreground">Loading cart...</p>
            </div>
          ) : cartItems.length === 0 ? (
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
                  <div className="flex items-start gap-3 flex-1">
                    <button
                      onClick={() => toggleItemSelection(item.id)}
                      className="mt-0.5 text-primary"
                      aria-label={`Select ${item.name}`}
                    >
                      {selectedItemIds.includes(item.id) ? (
                        <SquareCheck className="size-5" />
                      ) : (
                        <Square className="size-5" />
                      )}
                    </button>

                    <div>
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-sm text-primary font-semibold">
                        ${item.price}
                      </p>
                    </div>
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
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
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

          {/* Requested Date & Time */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Clock3 className="size-5 text-indigo-500" />
              Requested Date & Time
            </h3>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={requestedDateTime}
              onChange={(e) => setRequestedDateTime(e.target.value)}
              min={minRequestedDateTime}
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Choose when you want this order prepared or delivered.
            </p>
          </div>

          {/* Price Summary */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-bold mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal ({selectedItemIds.length} selected)</span>
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
          <button
            onClick={placeOrder}
            disabled={
              isPlacingOrder ||
              selectedItemIds.length === 0 ||
              !requestedDateTime
            }
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-bold text-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Check className="size-5" />
            {isPlacingOrder ? "Placing Order..." : "Confirm Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPlacement;
