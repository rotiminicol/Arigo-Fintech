import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { DollarSign, Lock, Phone, Calendar, MapPin, User, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

const WelcomePage = () => {
  // Form state management
  const [formData, setFormData] = useState({
    phoneNumber: "",
    dateOfBirth: "",
    address: "",
    gender: "",
  });

  // Hooks initialization
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Helper function to generate account number
  const generateAccountNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  // Mutation for form submission
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (data) => {
      const userId = "mock-user-id-123";
      const accountNumber = generateAccountNumber();
      const res = await fetch("/api/account/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, accountNumber, ...data }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to complete setup");
      return result;
    },
    onSuccess: () => {
      toast.success("Account setup completed successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Failed to complete setup. Please try again.");
    },
  });

  // Event handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, duration: 0.6 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-white text-gray-900 flex items-center justify-center p-4 font-sans">
      {/* Main content container */}
      <div className="max-w-6xl w-full relative z-10 flex flex-col lg:flex-row rounded-3xl overflow-hidden bg-white shadow-2xl">
        {/* Left Section - Form */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full lg:w-1/2 p-8 lg:p-12 bg-white"
        >
          {/* Brand logo */}
          <motion.div variants={itemVariants} className="flex items-center space-x-3 mb-10">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md">
              <DollarSign size={24} className="text-white" />
            </div>
            <span className="text-3xl font-extrabold text-blue-800 tracking-tight">Arigo Pay</span>
          </motion.div>

          {/* Header */}
          <motion.div variants={itemVariants} className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Get Started with Arigo Pay</h1>
            <p className="text-gray-600 flex items-center gap-2 text-base">
              <Lock size={18} className="text-blue-600" />
              Complete your profile to unlock secure banking
            </p>
          </motion.div>

          {/* Form */}
          <motion.form onSubmit={handleSubmit} className="space-y-6" variants={containerVariants}>
            {/* Phone Number */}
            <motion.div variants={itemVariants}>
              <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-blue-600">
                  <Phone size={20} />
                </div>
                <input
                  type="tel"
                  className="w-full bg-white border border-gray-300 text-gray-900 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 hover:border-blue-400"
                  placeholder="Enter your phone number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  aria-label="Phone Number"
                />
              </div>
            </motion.div>

            {/* Date of Birth */}
            <motion.div variants={itemVariants}>
              <label className="block mb-2 text-sm font-medium text-gray-700">Date of Birth</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-blue-600">
                  <Calendar size={20} />
                </div>
                <input
                  type="date"
                  className="w-full bg-white border border-gray-300 text-gray-900 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 hover:border-blue-400"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                  aria-label="Date of Birth"
                />
              </div>
            </motion.div>

            {/* Address */}
            <motion.div variants={itemVariants}>
              <label className="block mb-2 text-sm font-medium text-gray-700">Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-blue-600">
                  <MapPin size={20} />
                </div>
                <input
                  type="text"
                  className="w-full bg-white border border-gray-300 text-gray-900 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 hover:border-blue-400"
                  placeholder="Enter your address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  aria-label="Address"
                />
              </div>
            </motion.div>

            {/* Gender */}
            <motion.div variants={itemVariants}>
              <label className="block mb-2 text-sm font-medium text-gray-700">Gender</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-blue-600">
                  <User size={20} />
                </div>
                <select
                  className="w-full bg-white border border-gray-300 text-gray-900 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 hover:border-blue-400 appearance-none"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  aria-label="Gender"
                >
                  <option value="" disabled>Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={isPending}
                whileHover={{ scale: 1.03, boxShadow: "0 8px 25px rgba(37, 99, 235, 0.3)" }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg disabled:opacity-50 hover:from-blue-700 hover:to-blue-800"
              >
                {isPending ? (
                  <span className="flex items-center">
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
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Setting up...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Complete Setup
                    <ChevronRight size={22} className="ml-2" />
                  </span>
                )}
              </motion.button>
            </motion.div>

            {/* Error Message */}
            {isError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-200"
              >
                {error.message}
              </motion.div>
            )}
          </motion.form>
        </motion.div>

        {/* Right Section - Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-r-3xl items-center justify-center p-12 relative overflow-hidden"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full max-w-lg"
          >
            <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="mb-8">
              {/* Background Circle */}
              <motion.circle
                cx="200"
                cy="200"
                r="120"
                fill="rgba(255, 255, 255, 0.1)"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Card Shape */}
              <rect x="80" y="100" width="240" height="120" rx="12" fill="#ffffff" />
              <rect x="90" y="110" width="200" height="20" rx="4" fill="rgba(59, 130, 246, 0.2)" />
              <rect x="90" y="140" width="140" height="12" rx="4" fill="rgba(59, 130, 246, 0.15)" />
              <circle cx="280" cy="160" r="10" fill="#60A5FA" />

              {/* Floating Elements */}
              <motion.circle
                cx="100"
                cy="260"
                r="12"
                fill="#FBBF24"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle
                cx="300"
                cy="260"
                r="12"
                fill="#34D399"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              <path
                d="M100 260 L300 260"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="2"
              />
            </svg>

            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Banking, Redefined</h2>
              <p className="text-blue-100 text-base max-w-md mx-auto leading-relaxed">
                Join Arigo Pay for a secure, seamless, and modern banking experience tailored to your needs.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomePage;