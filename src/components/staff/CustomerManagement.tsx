import { useState } from "react";
import { Search, Eye, Phone, History, Star } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastVisit: string;
  isLoyalty: boolean;
  rating?: number;
}

const CustomerManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "C001",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1-234-567-8900",
      totalOrders: 15,
      totalSpent: 450,
      lastVisit: "2 days ago",
      isLoyalty: true,
      rating: 5
    },
    {
      id: "C002",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1-234-567-8901",
      totalOrders: 8,
      totalSpent: 280,
      lastVisit: "1 week ago",
      isLoyalty: false,
      rating: 4
    },
    {
      id: "C003",
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1-234-567-8902",
      totalOrders: 23,
      totalSpent: 720,
      lastVisit: "3 days ago",
      isLoyalty: true,
      rating: 5
    }
  ]);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
  );

  const loyalCustomers = customers.filter((c) => c.isLoyalty);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          Customer Management
        </h2>
        <p className="text-muted-foreground mt-1">
          View customer information and order history
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">Total Customers</p>
          <p className="text-3xl font-bold">{customers.length}</p>
        </div>
        <div className="bg-purple-50 border border-purple-300 rounded-lg p-4">
          <p className="text-sm text-purple-700 font-medium mb-2">
            Loyal Customers
          </p>
          <p className="text-3xl font-bold text-purple-600">
            {loyalCustomers.length}
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
          <p className="text-sm text-blue-700 font-medium mb-2">Avg Orders</p>
          <p className="text-3xl font-bold text-blue-600">
            {Math.round(
              customers.reduce((sum, c) => sum + c.totalOrders, 0) /
                customers.length
            )}
          </p>
        </div>
        <div className="bg-green-50 border border-green-300 rounded-lg p-4">
          <p className="text-sm text-green-700 font-medium mb-2">
            Total Revenue
          </p>
          <p className="text-3xl font-bold text-green-600">
            ${customers.reduce((sum, c) => sum + c.totalSpent, 0)}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Loyal Customers */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-300 rounded-lg p-4">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <Star className="size-5 text-yellow-500" />
          VIP Loyal Customers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {loyalCustomers.map((customer) => (
            <div key={customer.id} className="bg-white rounded px-3 py-2">
              <p className="font-semibold">{customer.name}</p>
              <p className="text-xs text-muted-foreground">
                {customer.totalOrders} orders • ${customer.totalSpent} spent
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Customers List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Customer List</h3>

        {filteredCustomers.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-lg">
            <p className="text-muted-foreground">No customers found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-lg">{customer.name}</h4>
                      {customer.isLoyalty && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-semibold">
                          LOYAL
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{customer.totalOrders} orders</span>
                      <span>•</span>
                      <span>${customer.totalSpent} spent</span>
                      <span>•</span>
                      <span>Last visited: {customer.lastVisit}</span>
                    </div>
                  </div>
                  {customer.rating && (
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`size-4 ${
                              i < customer.rating!
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {customer.rating}/5
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-muted rounded px-3 py-2 mb-3">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Phone className="size-4" />
                      {customer.phone}
                    </div>
                    <span className="text-muted-foreground">
                      {customer.email}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <History className="size-4" />
                    Order History
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                    <Eye className="size-4" />
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerManagement;
