import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import ArigoPayLogo from "/Money.png";
import { useEffect } from "react";
import VantaAurora from "vanta/dist/vanta.waves.min";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();

  // Initialize WebGL background
  useEffect(() => {
    const vantaEffect = VantaAurora({
      el: "#vanta-bg",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x4c1d95,
    });
    return () => vantaEffect.destroy();
  }, []);

  const { mutate: loginMutation, isPending, isError, error } = useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed. Please try again.");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen w-full text-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* WebGL Background */}
      <div id="vanta-bg" className="fixed inset-0 z-0" />

      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center relative z-10 gap-8">
        {/* Left side - Branding and visual */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden md:flex md:w-1/2 flex-col items-center md:items-start"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3 mb-8"
          >
            <img src={ArigoPayLogo} alt="Arigo Pay" className="h-12 w-12" />
            <span className="text-3xl font-bold text-blue-900">Arigo Pay</span>
          </motion.div>

          {/* 3D card animation placeholder */}
          <div className="mb-6 md:mb-10 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="w-64 h-64 md:w-80 md:h-80"
            >
              <div className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-400 rounded-lg flex items-center justify-center text-gray-900">
                [Lottie Animation: 3D Credit Card]
              </div>
            </motion.div>
          </div>

          {/* Testimonial slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center md:text-left px-4 md:px-0 mt-6"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome Back
            </h2>
            <motion.p
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="text-gray-600 text-lg max-w-md"
            >
              “Arigo Pay makes banking effortless.” - Jane D.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Right side - Login form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2"
        >
          {/* Mobile logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:hidden flex justify-center mb-8"
          >
            <div className="flex items-center space-x-2">
              <img src={ArigoPayLogo} alt="Arigo Pay" className="h-12 w-12" />
              <span className="text-3xl font-bold text-blue-900">
                Arigo Pay
              </span>
            </div>
          </motion.div>

          {/* Login card with glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Sign In
              </h1>
              <p className="text-gray-600 flex items-center justify-center gap-2">
                <Lock size={16} className="text-blue-600" />
                Secure access to your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email field */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative"
              >
                <label className="absolute -top-3 left-4 bg-white/10 px-2 text-sm font-medium text-gray-700 transition-all">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-600">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    className={`w-full bg-white/5 border border-gray-200/20 text-gray-900 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-500 ${
                      isError && formData.email ? "animate-shake border-red-500" : ""
                    }`}
                    placeholder="your@email.com"
                    name="email"
                    onChange={handleInputChange}
                    value={formData.email}
                    required
                    autoComplete="email"
                    aria-describedby={isError ? "email-error" : undefined}
                  />
                </div>
              </motion.div>

              {/* Password field */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="relative"
              >
                <div className="flex justify-between items-center mb-2">
                  <label className="absolute -top-3 left-4 bg-white/10 px-2 text-sm font-medium text-gray-700 transition-all">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-600">
                    <Lock size={20} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`w-full bg-white/5 border border-gray-200/20 text-gray-900 rounded-lg py-3 pl-10 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-500 ${
                      isError && formData.password ? "animate-shake border-red-500" : ""
                    }`}
                    placeholder="••••••••"
                    name="password"
                    onChange={handleInputChange}
                    value={formData.password}
                    required
                    autoComplete="current-password"
                    minLength={6}
                    aria-describedby={isError ? "password-error" : undefined}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-blue-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </motion.div>

              {/* Submit button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <motion.button
                  type="submit"
                  disabled={isPending}
                  whileHover={{ scale: 1.02, backgroundColor: "#2563eb" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all flex items-center justify-center shadow-lg disabled:opacity-70"
                >
                  {isPending ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </motion.button>
              </motion.div>

              {/* SSO buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="flex gap-4"
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 px-4 bg-white/10 border border-gray-200/20 text-gray-900 rounded-lg hover:bg-white/20 transition-all flex items-center justify-center"
                >
                  <span>Google</span>
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 px-4 bg-white/10 border border-gray-200/20 text-gray-900 rounded-lg hover:bg-white/20 transition-all flex items-center justify-center"
                >
                  <span>Apple</span>
                </motion.button>
              </motion.div>

              {/* Error message */}
              {isError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-100/50 text-red-700 rounded-lg text-sm border border-red-200/50"
                  role="alert"
                  aria-live="assertive"
                  id="form-error"
                >
                  {error.message}
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Sign up link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-center mt-6 text-gray-600"
          >
            <p>
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Create one
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;