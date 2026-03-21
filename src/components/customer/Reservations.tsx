import { useState } from "react";
import { Calendar, Clock, Users, Plus, X, Check } from "lucide-react";

interface Reservation {
  id: string;
  date: string;
  time: string;
  guests: number;
  status: "upcoming" | "completed" | "cancelled";
  tableNumber?: number;
}

const Reservations = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [reservations] = useState<Reservation[]>([
    {
      id: "RES001",
      date: "March 6, 2026",
      time: "7:00 PM",
      guests: 4,
      status: "upcoming",
      tableNumber: 12
    },
    {
      id: "RES002",
      date: "March 10, 2026",
      time: "6:30 PM",
      guests: 2,
      status: "upcoming"
    },
    {
      id: "RES003",
      date: "March 1, 2026",
      time: "8:00 PM",
      guests: 6,
      status: "completed",
      tableNumber: 8
    }
  ]);

  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    guests: 2
  });

  const upcomingReservations = reservations.filter(
    (r) => r.status === "upcoming"
  );

  const getStatusColor = (status: Reservation["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "completed":
        return "bg-green-100 text-green-700 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          Table Reservations
        </h2>
        <p className="text-muted-foreground mt-1">
          Book and manage your table reservations
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
          <p className="text-sm text-blue-700 font-medium mb-2">Upcoming</p>
          <p className="text-3xl font-bold text-blue-600">
            {upcomingReservations.length}
          </p>
        </div>
        <div className="bg-green-50 border border-green-300 rounded-lg p-4">
          <p className="text-sm text-green-700 font-medium mb-2">Completed</p>
          <p className="text-3xl font-bold text-green-600">
            {reservations.filter((r) => r.status === "completed").length}
          </p>
        </div>
        <div className="bg-purple-50 border border-purple-300 rounded-lg p-4">
          <p className="text-sm text-purple-700 font-medium mb-2">Total</p>
          <p className="text-3xl font-bold text-purple-600">
            {reservations.length}
          </p>
        </div>
      </div>

      {/* Book a Table Button */}
      {!showBookingForm && (
        <button
          onClick={() => setShowBookingForm(true)}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:opacity-90 transition-opacity text-lg font-bold"
        >
          <Plus className="size-5" />
          Book a Table
        </button>
      )}

      {/* Booking Form */}
      {showBookingForm && (
        <div className="bg-card border-2 border-primary rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">New Reservation</h3>
            <button
              onClick={() => setShowBookingForm(false)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Calendar className="inline size-4 mr-1" />
                  Select Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={bookingData.date}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, date: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Clock className="inline size-4 mr-1" />
                  Select Time
                </label>
                <input
                  type="time"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={bookingData.time}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, time: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <Users className="inline size-4 mr-1" />
                Number of Guests
              </label>
              <select
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={bookingData.guests}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    guests: parseInt(e.target.value)
                  })
                }
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>

            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-bold">
              <Check className="size-5" />
              Confirm Reservation
            </button>
          </div>
        </div>
      )}

      {/* Upcoming Reservations */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Upcoming Reservations</h3>

        {upcomingReservations.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-lg">
            <Calendar className="size-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No upcoming reservations</p>
          </div>
        ) : (
          upcomingReservations.map((reservation) => (
            <div
              key={reservation.id}
              className="bg-card border border-border rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-bold text-lg">{reservation.id}</h4>
                  {reservation.tableNumber && (
                    <p className="text-sm text-muted-foreground">
                      Table {reservation.tableNumber}
                    </p>
                  )}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(reservation.status)}`}
                >
                  {reservation.status.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="font-medium">{reservation.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Time</p>
                    <p className="font-medium">{reservation.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Guests</p>
                    <p className="font-medium">{reservation.guests}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                  Modify
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  <X className="size-4" />
                  Cancel
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Past Reservations */}
      {reservations.filter((r) => r.status === "completed").length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Past Reservations</h3>
          {reservations
            .filter((r) => r.status === "completed")
            .map((reservation) => (
              <div
                key={reservation.id}
                className="bg-card border border-border rounded-lg p-4 opacity-75"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold">{reservation.id}</h4>
                    <p className="text-sm text-muted-foreground">
                      {reservation.date} at {reservation.time} •{" "}
                      {reservation.guests} guests
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(reservation.status)}`}
                  >
                    COMPLETED
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Reservations;
