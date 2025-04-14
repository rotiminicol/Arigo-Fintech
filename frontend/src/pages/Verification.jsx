import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ChevronRight, ShieldCheck, CreditCard } from "lucide-react";

const VerificationPage = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [stage, setStage] = useState("email"); // email -> code -> success

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
  };

  const buttonVariants = {
    hover: { 
      scale: 1.02, 
      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.2)",
      transition: { duration: 0.2 } 
    },
    tap: { scale: 0.98 },
    disabled: { opacity: 0.7, scale: 1 },
  };

  // Timer for code resend cooldown
  useEffect(() => {
    let timer;
    if (isCodeSent && timeLeft > 0 && !canResend) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isCodeSent, canResend]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: "", message: "" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFeedback({ type: "error", message: "Please enter a valid email address" });
      setLoading(false);
      return;
    }

    try {
      // Simulate API call to send verification code
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsCodeSent(true);
      setStage("code");
      setFeedback({ type: "success", message: "Verification code sent to your email!" });
      setTimeLeft(60);
      setCanResend(false);
    } catch (error) {
      setFeedback({ type: "error", message: "Failed to send code. Please try again." });
    }
    setLoading(false);
  };

  const handleResendCode = async (e) => {
    e.preventDefault();
    if (!canResend) return;

    setLoading(true);
    setFeedback({ type: "", message: "" });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFeedback({ type: "success", message: "New code sent!" });
      setTimeLeft(60);
      setCanResend(false);
    } catch (error) {
      setFeedback({ type: "error", message: "Failed to resend code. Please try again." });
    }
    setLoading(false);
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: "", message: "" });

    const fullCode = code.join("");
    if (fullCode.length !== 6) {
      setFeedback({ type: "error", message: "Please enter the complete 6-digit code" });
      setLoading(false);
      return;
    }

    try {
      // Simulate API call to verify code
      await new Promise((resolve) => setTimeout(resolve, 1800));
      setFeedback({ type: "success", message: "Verification successful!" });
      setStage("success");
    } catch (error) {
      setFeedback({ type: "error", message: "Invalid code. Please try again." });
    }
    setLoading(false);
  };

  const handleCodeChange = (index, value) => {
    if (value && !/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    if (/^\d+$/.test(pastedData) && pastedData.length <= 6) {
      const digits = pastedData.split("").slice(0, 6);
      const newCode = [...code];

      digits.forEach((digit, index) => {
        if (index < 6) newCode[index] = digit;
      });

      setCode(newCode);

      const nextEmptyIndex = newCode.findIndex((c) => c === "");
      if (nextEmptyIndex !== -1) {
        const nextInput = document.getElementById(`code-input-${nextEmptyIndex}`);
        if (nextInput) nextInput.focus();
      } else {
        const lastInput = document.getElementById("code-input-5");
        if (lastInput) lastInput.focus();
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900 flex items-center justify-center p-4">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

      {/* Floating security icons */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ 
              duration: 2, 
              delay: i * 0.3, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="absolute text-blue-300"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
          >
            <ShieldCheck size="1em" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl w-full relative z-10 flex flex-col md:flex-row rounded-xl overflow-hidden shadow-xl">
        {/* Left Section - Verification Form */}
        <AnimatePresence mode="wait">
          {stage === "email" && (
            <motion.div
              key="email-form"
              className="w-full md:w-1/2 bg-white rounded-xl md:rounded-r-none p-8 md:p-10 max-w-md mx-auto md:mx-0"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex items-center space-x-3 mb-8">
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-md"
                >
                  <CreditCard size={24} className="text-white" />
                </motion.div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    Arigo Pay
                  </span>
                  <p className="text-xs text-gray-500 font-medium">SECURE BANKING</p>
                </div>
              </div>

              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Secure Account Verification
                </h1>
                <p className="text-gray-600 flex items-center gap-2">
                  <Lock size={16} className="text-blue-600" />
                  Enter your email to receive a secure verification code
                </p>
              </div>

              {feedback.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-md mb-6 text-sm ${
                    feedback.type === "error"
                      ? "bg-red-50 text-red-700 border border-red-100"
                      : "bg-blue-50 text-blue-700 border border-blue-100"
                  }`}
                >
                  {feedback.message}
                </motion.div>
              )}

              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-600">
                      <Mail size={20} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-300"
                      placeholder="your@email.com"
                      required
                      disabled={loading}
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Well send a 6-digit verification code to this address
                  </p>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  variants={buttonVariants}
                  whileHover={loading ? "" : "hover"}
                  whileTap={loading ? "" : "tap"}
                  animate={loading ? "disabled" : ""}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3.5 rounded-lg font-medium shadow-sm flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
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
                      <span>Sending Code...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      <span>Send Verification Code</span>
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  By continuing, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                </p>
              </div>
            </motion.div>
          )}

          {stage === "code" && (
            <motion.div
              key="code-form"
              className="w-full md:w-1/2 bg-white rounded-xl md:rounded-r-none p-8 md:p-10 max-w-md mx-auto md:mx-0"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex items-center space-x-3 mb-8">
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-md"
                >
                  <CreditCard size={24} className="text-white" />
                </motion.div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    Arigo Pay
                  </span>
                  <p className="text-xs text-gray-500 font-medium">SECURE BANKING</p>
                </div>
              </div>

              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Enter Verification Code
                </h1>
                <p className="text-gray-600">
                  Weve sent a 6-digit code to{" "}
                  <span className="font-medium text-blue-600">{email}</span>
                </p>
              </div>

              {feedback.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-md mb-6 text-sm ${
                    feedback.type === "error"
                      ? "bg-red-50 text-red-700 border border-red-100"
                      : "bg-blue-50 text-blue-700 border border-blue-100"
                  }`}
                >
                  {feedback.message}
                </motion.div>
              )}

              <form onSubmit={handleCodeSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    6-Digit Verification Code
                  </label>
                  <div className="flex gap-3 justify-between mb-3" onPaste={handlePaste}>
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        id={`code-input-${index}`}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleCodeKeyDown(index, e)}
                        className="w-full h-14 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg text-xl font-bold text-center focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-300"
                        disabled={loading}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    The code expires in 5 minutes
                  </p>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  variants={buttonVariants}
                  whileHover={loading ? "" : "hover"}
                  whileTap={loading ? "" : "tap"}
                  animate={loading ? "disabled" : ""}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3.5 rounded-lg font-medium shadow-sm flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
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
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={18} />
                      <span>Verify Account</span>
                    </>
                  )}
                </motion.button>

                <div className="text-center pt-2">
                  <p className="text-sm text-gray-600">
                    Didnt receive a code?{" "}
                    {canResend ? (
                      <button
                        onClick={handleResendCode}
                        disabled={loading}
                        className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
                      >
                        Resend Code
                      </button>
                    ) : (
                      <span className="text-gray-500">Resend in {timeLeft}s</span>
                    )}
                  </p>
                </div>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <button 
                  onClick={() => setStage("email")}
                  className="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors"
                >
                  ← Back to email entry
                </button>
              </div>
            </motion.div>
          )}

          {stage === "success" && (
            <motion.div
              key="success-screen"
              className="w-full md:w-1/2 bg-white rounded-xl md:rounded-r-none p-8 md:p-10 max-w-md mx-auto md:mx-0"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex items-center space-x-3 mb-8">
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-md"
                >
                  <CreditCard size={24} className="text-white" />
                </motion.div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    Arigo Pay
                  </span>
                  <p className="text-xs text-gray-500 font-medium">SECURE BANKING</p>
                </div>
              </div>

              <div className="flex justify-center mb-8">
                <motion.div
                  className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20 
                  }}
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center mb-8"
              >
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                  Account Verified!
                </h1>
                <p className="text-gray-600">
                  Your Arigo Pay account is now fully secured and ready to use.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3.5 rounded-lg font-medium shadow-sm flex items-center justify-center gap-2"
                  onClick={() => navigate("/welcome")}
                >
                  <span>Continue to Dashboard</span>
                  <ChevronRight size={18} />
                </motion.button>
              </motion.div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  Need help? <a href="#" className="text-blue-600 hover:underline">Contact support</a>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Section - Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl rounded-l-none items-center justify-center p-8 relative overflow-hidden"
        >
          {/* Abstract shapes */}
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute w-64 h-64 rounded-full bg-white/10 -top-20 -right-20"
          ></motion.div>
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut", 
              delay: 2 
            }}
            className="absolute w-48 h-48 rounded-full bg-white/10 -bottom-10 -left-10"
          ></motion.div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-md text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <ShieldCheck size={48} className="mb-4" />
              <h2 className="text-3xl font-bold mb-4">
                Bank-Grade Security
              </h2>
              <p className="text-blue-100 text-lg">
                Your financial security is our top priority. We use industry-leading encryption and verification to protect your account.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <svg className="h-5 w-5 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-blue-100">256-bit SSL encryption</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <svg className="h-5 w-5 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-blue-100">Two-factor authentication</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <svg className="h-5 w-5 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-blue-100">Real-time fraud monitoring</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VerificationPage;