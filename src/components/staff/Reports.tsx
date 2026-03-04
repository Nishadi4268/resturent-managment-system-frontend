import { useState } from "react";
import { BarChart3, TrendingUp, Download, Calendar } from "lucide-react";

interface ReportData {
  date: string;
  totalOrders: number;
  completedOrders: number;
  totalRevenue: number;
  topItem: string;
  topItemSales: number;
  peakHour: string;
  peakHourOrders: number;
}

const Reports = () => {
  const [reportData] = useState<ReportData>({
    date: "Today (March 4, 2026)",
    totalOrders: 47,
    completedOrders: 45,
    totalRevenue: 2150,
    topItem: "Grilled Salmon",
    topItemSales: 12,
    peakHour: "12:00 PM - 1:00 PM",
    peakHourOrders: 18
  });

  const topItems = [
    { name: "Grilled Salmon", sales: 12 },
    { name: "Caesar Salad", sales: 10 },
    { name: "Ribeye Steak", sales: 9 },
    { name: "Pasta Carbonara", sales: 8 },
    { name: "Chocolate Cake", sales: 7 }
  ];

  const hourlyData = [
    { hour: "9 AM", orders: 2 },
    { hour: "10 AM", orders: 5 },
    { hour: "11 AM", orders: 12 },
    { hour: "12 PM", orders: 18 },
    { hour: "1 PM", orders: 15 },
    { hour: "2 PM", orders: 8 },
    { hour: "3 PM", orders: 6 },
    { hour: "4 PM", orders: 3 }
  ];

  const maxOrders = Math.max(...hourlyData.map((h) => h.orders));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">Reports</h2>
        <p className="text-muted-foreground mt-1">
          Daily sales summary and performance analytics
        </p>
      </div>

      {/* Date Range Selector */}
      <div className="flex items-center gap-4">
        <Calendar className="size-5 text-muted-foreground" />
        <select className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
          <option>Custom Range</option>
        </select>
        <button className="ml-auto flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors">
          <Download className="size-4" />
          Export Report
        </button>
      </div>

      {/* Daily Summary */}
      <div>
        <h3 className="text-lg font-bold mb-4">
          Daily Sales Summary - {reportData.date}
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
            <p className="text-sm text-blue-700 font-medium mb-2">
              Total Orders
            </p>
            <p className="text-3xl font-bold text-blue-600">
              {reportData.totalOrders}
            </p>
            <div className="mt-2 flex items-center gap-1 text-green-600">
              <TrendingUp className="size-4" />
              <span className="text-xs">+8% from yesterday</span>
            </div>
          </div>
          <div className="bg-green-50 border border-green-300 rounded-lg p-4">
            <p className="text-sm text-green-700 font-medium mb-2">
              Completed Orders
            </p>
            <p className="text-3xl font-bold text-green-600">
              {reportData.completedOrders}
            </p>
            <p className="text-xs text-green-600 mt-2">
              Success Rate:{" "}
              {(
                (reportData.completedOrders / reportData.totalOrders) *
                100
              ).toFixed(1)}
              %
            </p>
          </div>
          <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-4">
            <p className="text-sm text-emerald-700 font-medium mb-2">
              Total Revenue
            </p>
            <p className="text-3xl font-bold text-emerald-600">
              ${reportData.totalRevenue}
            </p>
            <p className="text-xs text-emerald-600 mt-2">
              Avg: $
              {(reportData.totalRevenue / reportData.totalOrders).toFixed(2)}{" "}
              per order
            </p>
          </div>
          <div className="bg-purple-50 border border-purple-300 rounded-lg p-4">
            <p className="text-sm text-purple-700 font-medium mb-2">
              Peak Hour
            </p>
            <p className="text-lg font-bold text-purple-600">
              {reportData.peakHour}
            </p>
            <p className="text-xs text-purple-600 mt-2">
              {reportData.peakHourOrders} orders handled
            </p>
          </div>
        </div>
      </div>

      {/* Top Selling Items */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Top Selling Items Today</h3>
        <div className="space-y-4">
          {topItems.map((item, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">
                  {idx + 1}. {item.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {item.sales} sold
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-500 h-full transition-all"
                  style={{
                    width: `${(item.sales / topItems[0].sales) * 100}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Busy Hours Graph */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <BarChart3 className="size-5" />
          Busy Hours Graph - Daily Orders Distribution
        </h3>
        <div className="space-y-4">
          {hourlyData.map((data) => (
            <div key={data.hour}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium w-12">{data.hour}</span>
                <span className="text-sm text-muted-foreground">
                  {data.orders} orders
                </span>
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-400 to-blue-600 h-full transition-all"
                  style={{ width: `${(data.orders / maxOrders) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Peak Hour Info */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-300 rounded-lg">
          <p className="text-sm text-blue-900">
            <span className="font-bold">Peak Activity:</span>{" "}
            {reportData.peakHour} with {reportData.peakHourOrders} orders (the
            busiest time of the day)
          </p>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-bold mb-4">Customer Satisfaction</h4>
          <div className="text-center">
            <p className="text-4xl font-bold text-yellow-600">4.7</p>
            <p className="text-sm text-muted-foreground mt-1">out of 5 stars</p>
            <p className="text-xs text-muted-foreground mt-2">
              Based on 32 reviews
            </p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-bold mb-4">Order Fulfillment</h4>
          <div className="text-center">
            <p className="text-4xl font-bold text-green-600">95.7%</p>
            <p className="text-sm text-muted-foreground mt-1">
              On-time delivery rate
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              2 orders delayed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
