import React, { useState } from "react";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!isLogin && !formData.name) {
      newErrors.name = "Name is required";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (isLogin) {
        login(formData.email, formData.password);
      } else {
        register(formData.name, formData.email, formData.password);
      }
      navigate("/dashboard");
    } catch {
      setErrors({ form: "An error occurred. Please try again." });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev: Record<string, string>) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-10 lg:px-16 py-6 md:py-12 overflow-y-auto">
        <div className="max-w-md mx-auto w-full flex-shrink-0">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
              {isLogin ? "Welcome Back" : "Get Started Now"}
            </h1>
            <p className="text-gray-600 text-xs md:text-sm">
              Discover the power of AI bots to enhance business efficiency.
            </p>
          </div>

          {/* Social Login */}
          <div className="flex gap-3 mb-4">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 text-sm font-medium">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="currentColor"
                  opacity="0.1"
                />
                <text
                  x="12"
                  y="14"
                  textAnchor="middle"
                  className="text-xs font-bold"
                >
                  G
                </text>
              </svg>
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 text-sm font-medium">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="black">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.38-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.38C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8.905-.08 1.74-.74 2.95-.83 1.52-.03 2.69.57 3.42 1.63-3.39 2.04-2.63 6.29.86 7.44-.5 1.42-1.14 2.48-2.41 3.13zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Apple
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-xs">Or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name Field (Register Only) */}
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-3.5 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`w-full pl-11 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-3.5 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="william@company.com"
                  className={`w-full pl-11 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-3.5 text-gray-400 w-4 h-4" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full pl-11 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember/Terms */}
            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-gray-700">Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot Password?
                </a>
              </div>
            )}

            {!isLogin && (
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-gray-700">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Terms & Privacy
                  </a>
                </span>
              </label>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors mt-4"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          {/* Form Errors */}
          {errors.form && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">
              {errors.form}
            </div>
          )}

          {/* Toggle */}
          <p className="text-center text-xs md:text-sm text-gray-600 mt-4">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ name: "", email: "", password: "" });
                setErrors({});
              }}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Promotional */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 flex-col justify-center items-center p-8 lg:p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-sm overflow-y-auto max-h-[90vh]">
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">
            {isLogin ? "Harness the Power of AI" : "Simplify Your Workflow"}
          </h2>
          <p className="text-base lg:text-lg text-blue-100 mb-6">
            {isLogin
              ? "for Unprecedented Benefits"
              : "and Boost Business Productivity"}
          </p>

          {/* Mock UI - Task Cards */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 mb-6 text-left border border-white border-opacity-20">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">✓</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    Smart Task Management
                  </p>
                  <p className="text-blue-100 text-xs mt-1">
                    {isLogin
                      ? "Organize and track all your projects"
                      : "Manage all tasks in one place"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">✓</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    Real-time Collaboration
                  </p>
                  <p className="text-blue-100 text-xs mt-1">
                    {isLogin
                      ? "Work together seamlessly"
                      : "Collaborate with your team"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">✓</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    AI-Powered Insights
                  </p>
                  <p className="text-blue-100 text-xs mt-1">
                    {isLogin
                      ? "Get smart recommendations"
                      : "Boost your productivity"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Company Logos */}
          <div className="flex justify-center items-center gap-4 text-white text-opacity-60 text-xs">
            <span>Meta</span>
            <span>Sony</span>
            <span>Google</span>
            <span>Samsung</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
