import { useState } from "react";
import {
  CreditCard,
  DollarSign,
  Printer,
  Download,
  Filter
} from "lucide-react";

interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: "cash" | "card" | "online";
  status: "paid" | "unpaid" | "pending";
  date: string;
  table?: number;
}

const PaymentSection = () => {
  const [filterStatus, setFilterStatus] = useState<"all" | Payment["status"]>(
    "all"
  );
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "PAY001",
      orderId: "ORD001",
      amount: 150,
      method: "card",
      status: "paid",
      date: "10:45 AM",
      table: 5
    },
    {
      id: "PAY002",
      orderId: "ORD002",
      amount: 85,
      method: "cash",
      status: "paid",
      date: "11:00 AM",
      table: 8
    },
    {
      id: "PAY003",
      orderId: "ORD003",
      amount: 120,
      method: "online",
      status: "pending",
      date: "11:15 AM"
    },
    {
      id: "PAY004",
      orderId: "ORD004",
      amount: 95,
      method: "card",
      status: "unpaid",
      date: "10:30 AM",
      table: 12
    }
  ]);

  const getPaymentMethodIcon = (method: Payment["method"]) => {
    const icons: Record<Payment["method"], string> = {
      cash: "💵",
      card: "💳",
      online: "💻"
    };
    return icons[method];
  };

  const getStatusColor = (status: Payment["status"]) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700 border-green-300";
      case "unpaid":
        return "bg-red-100 text-red-700 border-red-300";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredPayments = payments.filter(
    (payment) => filterStatus === "all" || payment.status === filterStatus
  );

  const stats = {
    totalPaid: payments
      .filter((p) => p.status === "paid")
      .reduce((sum, p) => sum + p.amount, 0),
    totalUnpaid: payments
      .filter((p) => p.status === "unpaid")
      .reduce((sum, p) => sum + p.amount, 0),
    totalPending: payments
      .filter((p) => p.status === "pending")
      .reduce((sum, p) => sum + p.amount, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">Payment Section</h2>
        <p className="text-muted-foreground mt-1">
          Track and manage payment statuses
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-green-50 border border-green-300 rounded-lg p-4">
          <p className="text-sm text-green-700 font-medium mb-2">Paid</p>
          <p className="text-3xl font-bold text-green-600">
            ${stats.totalPaid}
          </p>
          <p className="text-xs text-green-600 mt-1">
            {payments.filter((p) => p.status === "paid").length} transactions
          </p>
        </div>
        <div className="bg-red-50 border border-red-300 rounded-lg p-4">
          <p className="text-sm text-red-700 font-medium mb-2">Unpaid</p>
          <p className="text-3xl font-bold text-red-600">
            ${stats.totalUnpaid}
          </p>
          <p className="text-xs text-red-600 mt-1">
            {payments.filter((p) => p.status === "unpaid").length} transactions
          </p>
        </div>
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <p className="text-sm text-yellow-700 font-medium mb-2">Pending</p>
          <p className="text-3xl font-bold text-yellow-600">
            ${stats.totalPending}
          </p>
          <p className="text-xs text-yellow-600 mt-1">
            {payments.filter((p) => p.status === "pending").length} transactions
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
          <p className="text-sm text-blue-700 font-medium mb-2">Total</p>
          <p className="text-3xl font-bold text-blue-600">
            ${stats.totalPaid + stats.totalUnpaid + stats.totalPending}
          </p>
          <p className="text-xs text-blue-600 mt-1">
            {payments.length} transactions
          </p>
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
          <option value="all">All Status</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Payments List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Payment Transactions</h3>

        {filteredPayments.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-lg">
            <p className="text-muted-foreground">No payments found</p>
          </div>
        ) : (
          filteredPayments.map((payment) => (
            <div
              key={payment.id}
              className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">
                      {getPaymentMethodIcon(payment.method)}
                    </span>
                    <div>
                      <h4 className="font-bold">{payment.id}</h4>
                      <p className="text-sm text-muted-foreground">
                        Order {payment.orderId}
                        {payment.table && ` • Table ${payment.table}`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">${payment.amount}</p>
                  <p className="text-xs text-muted-foreground">
                    {payment.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <CreditCard className="size-4" />
                  <span className="text-sm font-medium capitalize">
                    {payment.method}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(payment.status)}`}
                  >
                    {payment.status.charAt(0).toUpperCase() +
                      payment.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                {payment.status === "unpaid" && (
                  <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
                    Process Payment
                  </button>
                )}
                {payment.status === "pending" && (
                  <button className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium">
                    Verify Payment
                  </button>
                )}
                {payment.status === "paid" && (
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium">
                    <Printer className="size-4" />
                    Print Receipt
                  </button>
                )}
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                  <Download className="size-4" />
                  Invoice
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PaymentSection;
