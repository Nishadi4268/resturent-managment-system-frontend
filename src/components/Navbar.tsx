import { User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string>("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link
              to="/dashboard"
              className="font-semibold text-xl text-primary"
            >
              Restaurant Manager
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-primary transition"
            >
              Dashboard
            </Link>
            <div className="relative group">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-primary transition">
                <User className="w-5 h-5" />
                <span>Profile</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10 hidden group-hover:block">
                <button
                  onClick={handleProfile}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </div>
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-700 hover:bg-red-50"
                >
                  <div className="flex items-center space-x-2">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <Link
            to="/dashboard"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Dashboard
          </Link>
          <button
            onClick={handleProfile}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            My Profile
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-red-700 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
