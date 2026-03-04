import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
}

const Profile = () => {
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center space-x-2 text-primary hover:opacity-80 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-foreground mb-8">
            User Profile
          </h1>

          {error && (
            <div className="mb-6 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <div className="px-4 py-2 bg-muted rounded-md text-foreground">
                {user?.name}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="px-4 py-2 bg-muted rounded-md text-foreground">
                {user?.email}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                User ID
              </label>
              <div className="px-4 py-2 bg-muted rounded-md text-foreground font-mono text-xs">
                {user?.id}
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <button className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
