import { FormEvent, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import login from "../assets/images/login.png";

type FormData = {
  fullName: string;
  email: string;
  employeeId: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialForm: FormData = {
  fullName: "",
  email: "",
  employeeId: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false
};

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isStaffSignup, setIsStaffSignup] = useState(false);
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

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (isStaffSignup && !form.employeeId.trim()) {
      nextErrors.employeeId = "Employee ID is required for staff signup.";
    } else if (isStaffSignup && form.employeeId.trim()) {
      // Validate Employee ID format: ST-S-xxxx (where xxxx is 4 digits)
      if (!/^ST-S-\d{4}$/.test(form.employeeId.trim())) {
        nextErrors.employeeId =
          "Employee ID must be in correct format.";
      }
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (!form.acceptTerms) {
      nextErrors.acceptTerms = "You must accept the terms and policy.";
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
        // Use appropriate endpoint based on signup type
        const endpoint = isStaffSignup
          ? "http://localhost:5000/api/auth/staff-signup"
          : "http://localhost:5000/api/auth/signup";

        const payload: Record<string, unknown> = {
          name: form.fullName,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword
        };

        // Add employeeId for staff signup
        if (isStaffSignup) {
          payload.employeeId = form.employeeId;
        }

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
          setApiError(data.message || "Signup failed");
          return;
        }

        setIsSubmitted(true);
        setForm(initialForm);

        // Store token if needed
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // Redirect to login or dashboard
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "An error occurred during signup";
        setApiError(message);
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
            <h2 className="text-2xl font-semibold">Create account</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill in your details to get started.
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Want to create a staff account?{" "}
              <button
                type="button"
                className="font-medium text-primary underline"
                onClick={() => {
                  setIsStaffSignup((prev) => {
                    const next = !prev;
                    if (!next) {
                      setForm((current) => ({ ...current, employeeId: "" }));
                      setErrors((current) => {
                        const nextErrors = { ...current };
                        delete nextErrors.employeeId;
                        return nextErrors;
                      });
                    }
                    return next;
                  });
                }}
              >
                {isStaffSignup ? "Use regular signup" : "Staff signup"}
              </button>
            </p>

            {isSubmitted ? (
              <div className="mt-4 rounded-md border border-border bg-muted px-4 py-3 text-sm">
                Account created successfully. Redirecting to login...
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
                  htmlFor="fullName"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    className={inputBaseClass}
                    placeholder="John Smith"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, fullName: e.target.value }))
                    }
                  />
                </div>
                {errors.fullName ? (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.fullName}
                  </p>
                ) : null}
              </div>

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

              {isStaffSignup ? (
                <div>
                  <label
                    htmlFor="employeeId"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Employee ID
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="employeeId"
                      type="text"
                      className={inputBaseClass}
                      placeholder="Enter your employee ID"
                      value={form.employeeId}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          employeeId: e.target.value.trimStart()
                        }))
                      }
                    />
                  </div>
                  {errors.employeeId ? (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.employeeId}
                    </p>
                  ) : null}
                </div>
              ) : null}

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
                    autoComplete="new-password"
                    className={inputBaseClass}
                    placeholder="Minimum 8 characters"
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

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    className={inputBaseClass}
                    placeholder="Re-enter password"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value
                      }))
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword ? (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.confirmPassword}
                  </p>
                ) : null}
              </div>

              <div>
                <label className="flex items-start gap-2 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    className="mt-0.5 size-4 rounded border-input"
                    checked={form.acceptTerms}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        acceptTerms: e.target.checked
                      }))
                    }
                  />
                  <span>
                    I agree to the{" "}
                    <a href="#" className="text-primary underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary underline">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
                {errors.acceptTerms ? (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.acceptTerms}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
