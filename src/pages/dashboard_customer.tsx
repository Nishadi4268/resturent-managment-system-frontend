import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

interface User {
  id: string;
  name: string;
  email: string;
}

const Dashboard_customer = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data.user || data);
      } catch (err: any) {
        setError(err.message || "Failed to load user data");
        // Redirect to login if token is invalid
        if (err.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-lg text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome, {user?.name || "User"}!
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your restaurant from here.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Users Card */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Users
            </h2>
            <p className="text-muted-foreground mb-4">
              Manage restaurant users
            </p>
            <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
              Manage Users
            </button>
          </div>

          {/* Orders Card */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Orders
            </h2>
            <p className="text-muted-foreground mb-4">View and manage orders</p>
            <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
              View Orders
            </button>
          </div>

          {/* Menu Card */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-4">Menu</h2>
            <p className="text-muted-foreground mb-4">Edit restaurant menu</p>
            <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
              Edit Menu
            </button>
          </div>
        </div>

        {/* User Info Card */}
        <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Your Information
          </h2>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium text-foreground">Name:</span>{" "}
              <span className="text-muted-foreground">{user?.name}</span>
            </p>
            <p className="text-sm">
              <span className="font-medium text-foreground">Email:</span>{" "}
              <span className="text-muted-foreground">{user?.email}</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard_customer;