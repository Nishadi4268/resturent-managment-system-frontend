import { useState } from "react";
import { TrendingUp, Clock, Users, Star } from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  ordersHandled: number;
  salesGenerated: number;
  rating: number;
  attendanceRate: number;
}

const StaffPerformance = () => {
  const [staffMembers] = useState<StaffMember[]>([
    {
      id: "ST001",
      name: "Alice Johnson",
      role: "Waiter",
      ordersHandled: 23,
      salesGenerated: 650,
      rating: 4.8,
      attendanceRate: 95
    },
    {
      id: "ST002",
      name: "Bob Smith",
      role: "Chef",
      ordersHandled: 18,
      salesGenerated: 520,
      rating: 4.6,
      attendanceRate: 98
    },
    {
      id: "ST003",
      name: "Carol Davis",
      role: "Waiter",
      ordersHandled: 19,
      salesGenerated: 580,
      rating: 4.5,
      attendanceRate: 92
    }
  ]);

  const stats = {
    averageRating: (
      staffMembers.reduce((sum, s) => sum + s.rating, 0) / staffMembers.length
    ).toFixed(1),
    totalOrders: staffMembers.reduce((sum, s) => sum + s.ordersHandled, 0),
    totalSales: staffMembers.reduce((sum, s) => sum + s.salesGenerated, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          Staff Performance
        </h2>
        <p className="text-muted-foreground mt-1">
          Track performance metrics and staff ratings
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">Total Staff</p>
          <p className="text-3xl font-bold">{staffMembers.length}</p>
        </div>
        <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
          <p className="text-sm text-blue-700 font-medium mb-2">
            Orders Handled
          </p>
          <p className="text-3xl font-bold text-blue-600">
            {stats.totalOrders}
          </p>
        </div>
        <div className="bg-green-50 border border-green-300 rounded-lg p-4">
          <p className="text-sm text-green-700 font-medium mb-2">Total Sales</p>
          <p className="text-3xl font-bold text-green-600">
            ${stats.totalSales}
          </p>
        </div>
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <p className="text-sm text-yellow-700 font-medium mb-2">Avg Rating</p>
          <p className="text-3xl font-bold text-yellow-600">
            {stats.averageRating}/5
          </p>
        </div>
      </div>

      {/* Staff Members */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Staff Members Performance</h3>

        <div className="grid gap-4">
          {staffMembers.map((staff) => (
            <div
              key={staff.id}
              className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-bold">{staff.name}</h4>
                  <p className="text-sm text-muted-foreground">{staff.role}</p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${
                        i < Math.floor(staff.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-bold">{staff.rating}/5</span>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-muted rounded-lg">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="size-4 text-blue-500" />
                    <span className="text-xs text-muted-foreground">
                      Orders
                    </span>
                  </div>
                  <p className="text-2xl font-bold">{staff.ordersHandled}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="size-4 text-green-500" />
                    <span className="text-xs text-muted-foreground">Sales</span>
                  </div>
                  <p className="text-2xl font-bold">${staff.salesGenerated}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="size-4 text-orange-500" />
                    <span className="text-xs text-muted-foreground">
                      Attendance
                    </span>
                  </div>
                  <p className="text-2xl font-bold">{staff.attendanceRate}%</p>
                </div>
              </div>

              {/* Attendance Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Attendance Rate</span>
                  <span className="font-semibold">{staff.attendanceRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-green-500 h-full transition-all"
                    style={{ width: `${staff.attendanceRate}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-medium">
                  View Details
                </button>
                <button className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-medium">
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffPerformance;
