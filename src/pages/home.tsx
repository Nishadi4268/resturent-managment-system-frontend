import { Link } from "react-router-dom";
import {
  ChefHat,
  UtensilsCrossed,
  ClipboardList,
  BarChart3,
  Users,
  Clock,
  Shield,
  Sparkles,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { ROUTE_PATHS } from "../constants/route.constant";
import FeatureCard from "../components/FeatureCard";
import img1 from "../assets/images/img1.jpg";
import img2 from "../assets/images/img2.jpg";
import img3 from "../assets/images/img3.jpg";
import img4 from "../assets/images/img4.jpg";
import img5 from "../assets/images/img5.jpg";
import img6 from "../assets/images/img6.jpg";
import hero from "../assets/images/hero.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to={ROUTE_PATHS.ROOT} className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">RestaurantPro</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-sm font-medium hover:text-primary transition"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-sm font-medium hover:text-primary transition"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-sm font-medium hover:text-primary transition"
              >
                Contact
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                to={ROUTE_PATHS.LOGIN}
                className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted transition"
              >
                Login
              </Link>
              <Link
                to={ROUTE_PATHS.SIGNUP}
                className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:opacity-90 transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-orange-100 to-amber-50 dark:from-orange-950 dark:via-orange-900 dark:to-amber-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm">
                <Sparkles className="h-4 w-4 mr-2 text-primary" />
                <span className="font-medium">
                  Modern Restaurant Management
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Manage Your Restaurant{" "}
                <span className="text-primary">Effortlessly</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl">
                Streamline operations, track inventory, manage orders, and grow
                your business with our all-in-one restaurant management
                solution.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to={ROUTE_PATHS.SIGNUP}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
                >
                  Get Started Free
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-muted transition"
                >
                  Learn More
                </a>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border/50">
                <div>
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">
                    Restaurants
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">
                    Orders/Day
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src={hero}
                alt="Restaurant dashboard interface"
                className="w-full h-auto rounded-2xl shadow-2xl border border-border object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 lg:py-24 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Inside Our Restaurant Experience
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A quick look at the ambiance, quality dishes, and service style
              powered by RestaurantPro.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group overflow-hidden rounded-xl border border-border bg-card">
              <img
                src={img1}
                alt="Restaurant interior"
                className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="group overflow-hidden rounded-xl border border-border bg-card">
              <img
                src={img2}
                alt="Prepared food plate"
                className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="group overflow-hidden rounded-xl border border-border bg-card">
              <img
                src={img3}
                alt="Restaurant service team"
                className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="group overflow-hidden rounded-xl border border-border bg-card">
              <img
                src={img4}
                alt="Restaurant service team"
                className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="group overflow-hidden rounded-xl border border-border bg-card">
              <img
                src={img5}
                alt="Restaurant service team"
                className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="group overflow-hidden rounded-xl border border-border bg-card">
              <img
                src={img6}
                alt="Restaurant service team"
                className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Everything You Need to Run Your Restaurant
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make restaurant management simple
              and efficient
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<UtensilsCrossed className="h-6 w-6 text-primary" />}
              title="Menu Management"
              description="Create, update, and organize your menu items with ease. Add photos, descriptions, and pricing in seconds."
              image={img1}
              imageAlt="Menu Management"
            />
            <FeatureCard
              icon={<ClipboardList className="h-6 w-6 text-primary" />}
              title="Order Management"
              description="Track orders from placement to delivery. Manage dine-in, takeout, and delivery orders seamlessly."
              image={img2}
              imageAlt="Order Management"
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6 text-primary" />}
              title="Analytics & Reports"
              description="Get detailed insights into sales, popular items, and customer preferences with powerful analytics."
              image={img3}
              imageAlt="Analytics & Reports"
            />
            <FeatureCard
              icon={<Users className="h-6 w-6 text-primary" />}
              title="Staff Management"
              description="Manage your team efficiently with role-based access, shift scheduling, and performance tracking."
              image={img4}
              imageAlt="Staff Management"
            />
            <FeatureCard
              icon={<Clock className="h-6 w-6 text-primary" />}
              title="Real-time Updates"
              description="Stay updated with real-time notifications for new orders, inventory alerts, and customer requests."
              image={img5}
              imageAlt="Real-time Updates"
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6 text-primary" />}
              title="Secure & Reliable"
              description="Your data is protected with enterprise-grade security and automatic backups for peace of mind."
              image={img6}
              imageAlt="Secure & Reliable"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-orange-500/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-12 lg:p-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Transform Your Restaurant?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of successful restaurants already using
              RestaurantPro. Start your free trial today - no credit card
              required.
            </p>
            <Link
              to={ROUTE_PATHS.SIGNUP}
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground hover:opacity-90 transition"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <Link
                to={ROUTE_PATHS.ROOT}
                className="flex items-center space-x-2 mb-4"
              >
                <ChefHat className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">RestaurantPro</span>
              </Link>
              <p className="text-sm text-muted-foreground mb-4">
                The complete solution for modern restaurant management.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#features"
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#about"
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    Press
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-2">
                  <Mail className="h-4 w-4 text-primary mt-0.5" />
                  <a
                    href="mailto:info@restaurantpro.com"
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    info@restaurantpro.com
                  </a>
                </li>
                <li className="flex items-start space-x-2">
                  <Phone className="h-4 w-4 text-primary mt-0.5" />
                  <a
                    href="tel:+1234567890"
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    +1 (234) 567-890
                  </a>
                </li>
                <li className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-primary mt-0.5" />
                  <span className="text-muted-foreground">
                    123 Restaurant St, Food City, FC 12345
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-sm text-muted-foreground">
                © 2026 RestaurantPro. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
