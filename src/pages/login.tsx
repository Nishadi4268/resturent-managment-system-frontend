import { FormEvent, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import login from "../assets/images/login.png";

type FormData = {
  email: string;
  password: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialForm: FormData = {
  email: "",
  password: ""
};

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>("");

  const passwordStrength = useMemo(() => {
    let strength = 0;
    if (form.password.length >= 8) strength += 1;
    if (/[A-Z]/.test(form.password)) strength += 1;
    if (/[0-9]/.test(form.password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(form.password)) strength += 1;
    return strength;
  }, [form.password]);

  const getPasswordStrengthLabel = () => {
    if (!form.password) return "Not set";
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength <= 3) return "Medium";
    return "Strong";
  };

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(false);
    setApiError("");

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          setApiError(data.message || "Login failed");
          return;
        }

        setIsSubmitted(true);
        setForm(initialForm);

        // Store token if needed
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // Redirect to /dashboard
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } catch (error: any) {
        setApiError(error.message || "An error occurred during login");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const inputBaseClass =
    "w-full rounded-md border border-input bg-background px-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="min-h-screen mx-auto grid w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm lg:grid-cols-2">
        <div className="hidden overflow-hidden border-r border-border bg-muted/50 lg:flex lg:flex-col lg:justify-between">
          <img src={login} className="max-h-screen h-full object-cover" />
        </div>

        <div className="p-6 sm:p-8 lg:p-10 flex items-center justify-center bg-orange-100">
          <div className="mx-auto w-full max-w-md">
            <h2 className="text-2xl font-semibold">SignIn to the account</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill in your details to find your account.
            </p>

            {isSubmitted ? (
              <div className="mt-4 rounded-md border border-border bg-muted px-4 py-3 text-sm">
                Account Logged successfully. Redirecting...
              </div>
            ) : null}

            {apiError ? (
              <div className="mt-4 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                {apiError}
              </div>
            ) : null}

            <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={inputBaseClass}
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        email: e.target.value.trimStart()
                      }))
                    }
                  />
                </div>
                {errors.email ? (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className={inputBaseClass}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, password: e.target.value }))
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Password strength</span>
                  <span>{getPasswordStrengthLabel()}</span>
                </div>
                {errors.password ? (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.password}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Sign IN"}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-primary underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
