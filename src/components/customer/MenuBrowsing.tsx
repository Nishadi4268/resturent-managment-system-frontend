import { useState } from "react";
import { Search, Filter, Star, Heart, Plus } from "lucide-react";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/constants/menu.constant";

const API_BASE_URL = "http://localhost:5000";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

const MenuBrowsing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [filterType, setFilterType] = useState<
    "all" | "veg" | "non-veg" | "sweets" | "drinks"
  >("all");
  const [sortBy, setSortBy] = useState<"name" | "price" | "rating">("name");
  const [addingItemId, setAddingItemId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");

  const addToCart = async (item: (typeof MENU_ITEMS)[number]) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setStatusType("error");
      setStatusMessage("Please login first to add items to cart.");
      return;
    }

    try {
      setAddingItemId(item.id);
      setStatusMessage("");
      setStatusType("");

      const response = await fetch(`${API_BASE_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          image: item.image
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add item to cart");
      }

      setStatusType("success");
      setStatusMessage(`${item.name} added to cart.`);
    } catch (error: unknown) {
      setStatusType("error");
      setStatusMessage(getErrorMessage(error, "Failed to add item to cart"));
    } finally {
      setAddingItemId(null);
    }
  };

  const typeLabel: Record<"veg" | "non-veg" | "sweets" | "drinks", string> = {
    veg: "VEG",
    "non-veg": "NON-VEG",
    sweets: "SWEETS",
    drinks: "DRINKS"
  };

  const typeStyle: Record<"veg" | "non-veg" | "sweets" | "drinks", string> = {
    veg: "bg-green-100 text-green-700",
    "non-veg": "bg-red-100 text-red-700",
    sweets: "bg-pink-100 text-pink-700",
    drinks: "bg-blue-100 text-blue-700"
  };

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesType = filterType === "all" || item.type === filterType;
    return matchesSearch && matchesCategory && matchesType;
  }).sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">Menu Browsing</h2>
        <p className="text-muted-foreground mt-1">
          Explore our delicious offerings
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

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for dishes..."
            className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Options */}
        <div className="flex flex-wrap gap-4">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="size-5 text-muted-foreground" />
            <select
              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {MENU_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex gap-2 border border-border rounded-lg p-1">
            <button
              onClick={() => setFilterType("all")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                filterType === "all"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType("veg")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                filterType === "veg"
                  ? "bg-green-500 text-white"
                  : "hover:bg-muted"
              }`}
            >
              🌱 Veg
            </button>
            <button
              onClick={() => setFilterType("non-veg")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                filterType === "non-veg"
                  ? "bg-red-500 text-white"
                  : "hover:bg-muted"
              }`}
            >
              🍖 Non-Veg
            </button>
            <button
              onClick={() => setFilterType("sweets")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                filterType === "sweets"
                  ? "bg-pink-500 text-white"
                  : "hover:bg-muted"
              }`}
            >
              🍰 Sweets
            </button>
            <button
              onClick={() => setFilterType("drinks")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                filterType === "drinks"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-muted"
              }`}
            >
              🥤 Drinks
            </button>
          </div>

          {/* Sort By */}
          <select
            className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>
      </div>

      {/* Popular Items Section */}
      {/* <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <Star className="size-5 text-orange-500" fill="currentColor" />
          Top Rated Items
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {MENU_ITEMS.filter((item) => item.popular).map((item) => (
            <div key={item.id} className="bg-white rounded px-3 py-2">
              <div className="flex items-center gap-2">
                <img src={item.image} alt={item.name} className="object-cover rounded" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">${item.price}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star
                    className="size-3 text-yellow-500"
                    fill="currentColor"
                  />
                  <span className="text-xs font-medium">{item.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-card border border-border rounded-lg">
            <p className="text-muted-foreground">No menu items found</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="rounded-md bg-muted p-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-96 h-56 object-cover rounded"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  {item.popular && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded">
                      POPULAR
                    </span>
                  )}
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${typeStyle[item.type]}`}
                  >
                    {typeLabel[item.type]}
                  </span>
                </div>
              </div>

              <h3 className="font-bold text-lg mb-1">{item.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {item.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <Star
                    className="size-4 text-yellow-500"
                    fill="currentColor"
                  />
                  <span className="font-medium">{item.rating}</span>
                </div>
                <span className="text-xl font-bold text-primary">
                  ${item.price}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => addToCart(item)}
                  disabled={addingItemId === item.id}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Plus className="size-4" />
                  {addingItemId === item.id ? "Adding..." : "Add to Cart"}
                </button>
                <button className="p-2 border border-border rounded-lg hover:bg-muted transition-colors">
                  <Heart className="size-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MenuBrowsing;
