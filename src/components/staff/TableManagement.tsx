import { useState } from "react";
import { Plus, Settings2, Filter, Eye, RefreshCw } from "lucide-react";

interface Table {
  number: number;
  status: "available" | "reserved" | "occupied";
  capacity: number;
  currentCustomers?: number;
  reservedUntil?: string;
}

const TableManagement = () => {
  const [filterStatus, setFilterStatus] = useState<"all" | Table["status"]>(
    "all"
  );
  const [tables, setTables] = useState<Table[]>([
    { number: 1, status: "occupied", capacity: 4, currentCustomers: 3 },
    { number: 2, status: "available", capacity: 2 },
    { number: 3, status: "reserved", capacity: 6, reservedUntil: "7:30 PM" },
    { number: 4, status: "occupied", capacity: 4, currentCustomers: 4 },
    { number: 5, status: "available", capacity: 6 },
    { number: 6, status: "available", capacity: 4 },
    { number: 7, status: "occupied", capacity: 2, currentCustomers: 2 },
    { number: 8, status: "reserved", capacity: 8, reservedUntil: "8:00 PM" }
  ]);

  const getStatusColor = (status: Table["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-100 border-green-300 text-green-700";
      case "reserved":
        return "bg-yellow-100 border-yellow-300 text-yellow-700";
      case "occupied":
        return "bg-blue-100 border-blue-300 text-blue-700";
      default:
        return "bg-gray-100 border-gray-300 text-gray-700";
    }
  };

  const filteredTables = tables.filter(
    (table) => filterStatus === "all" || table.status === filterStatus
  );

  const stats = {
    available: tables.filter((t) => t.status === "available").length,
    occupied: tables.filter((t) => t.status === "occupied").length,
    reserved: tables.filter((t) => t.status === "reserved").length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">Table Management</h2>
        <p className="text-muted-foreground mt-1">
          Manage table status, reservations, and seating
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">Available</p>
          <p className="text-3xl font-bold text-green-600">{stats.available}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">Occupied</p>
          <p className="text-3xl font-bold text-blue-600">{stats.occupied}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">Reserved</p>
          <p className="text-3xl font-bold text-yellow-600">{stats.reserved}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">Total Tables</p>
          <p className="text-3xl font-bold">{tables.length}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <Filter className="size-5 text-muted-foreground" />
        <select
          className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(e.target.value as typeof filterStatus)
          }
        >
          <option value="all">All Tables</option>
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
          <option value="reserved">Reserved</option>
        </select>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredTables.map((table) => (
          <div
            key={table.number}
            className={`border-2 rounded-lg p-4 transition-all hover:shadow-lg cursor-pointer ${getStatusColor(table.status)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold">Table {table.number}</h3>
                <p className="text-sm opacity-75">Capacity: {table.capacity}</p>
              </div>
              <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold">
                {table.status === "occupied" &&
                  `${table.currentCustomers}/${table.capacity}`}
                {table.status === "reserved" && "RESERVED"}
                {table.status === "available" && "OPEN"}
              </span>
            </div>

            {table.status === "reserved" && (
              <p className="text-xs mb-3 opacity-75">
                Reserved until: {table.reservedUntil}
              </p>
            )}

            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white hover:bg-gray-100 rounded font-medium text-xs transition-colors">
                <Eye className="size-3" />
                View
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white hover:bg-gray-100 rounded font-medium text-xs transition-colors">
                <RefreshCw className="size-3" />
                Change
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="bg-card border border-border rounded-lg p-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold mb-1">Additional Actions</h3>
          <p className="text-sm text-muted-foreground">
            Manage reservations and table assignments
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors">
            <Plus className="size-4" />
            Add Reservation
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
            <Settings2 className="size-4" />
            Manage Tables
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableManagement;
