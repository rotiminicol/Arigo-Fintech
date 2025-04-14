import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, CreditCard, Loader2, CheckCircle, ChevronLeft, Shield, ArrowRight } from "lucide-react";

// Constants
const TRANSACTION_FEE_PERCENTAGE = 1.5;
const MIN_TRANSACTION_FEE = 100; // in Naira

// SchoolFees component
const SchoolFees = () => {
  // States
  const [stage, setStage] = useState("form"); // form -> confirmation -> success
  const [formData, setFormData] = useState({
    schoolType: "",
    institution: "",
    studentId: "",
    studentName: "",
    amount: "",
    email: "",
    phone: "",
    semester: "First Semester",
    academicYear: new Date().getFullYear().toString(),
  });
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [recentSchools, setRecentSchools] = useState([]);
  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);
  const [transactionFee, setTransactionFee] = useState(0);

  // Calculate transaction fee whenever amount changes
  useEffect(() => {
    if (formData.amount) {
      const amount = parseFloat(formData.amount);
      const fee = Math.max(amount * (TRANSACTION_FEE_PERCENTAGE / 100), MIN_TRANSACTION_FEE);
      setTransactionFee(fee);
    } else {
      setTransactionFee(0);
    }
  }, [formData.amount]);

  // Popular Nigerian institutions
  const popularInstitutions = [
    "University of Lagos",
    "University of Ibadan",
    "Ahmadu Bello University",
    "University of Nigeria, Nsukka",
    "Obafemi Awolowo University",
    "University of Benin",
    "Lagos State University",
    "Covenant University",
    "Babcock University",
    "Federal University of Technology, Akure"
  ];

  // Semester options
  const semesterOptions = [
    "First Semester",
    "Second Semester",
    "Third Semester",
    "Full Session"
  ];

  // Load recent schools from local storage
  useEffect(() => {
    const saved = localStorage.getItem("recentSchools");
    if (saved) {
      try {
        setRecentSchools(JSON.parse(saved).slice(0, 3));
      } catch (e) {
        console.error("Failed to parse recent schools", e);
      }
    }
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.02, boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)", transition: { duration: 0.2 } },
    tap: { scale: 0.98 },
    disabled: { opacity: 0.7, scale: 1 },
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.schoolType) newErrors.schoolType = "Please select a school type";
    if (!formData.institution) newErrors.institution = "Institution name is required";
    if (!formData.studentId) newErrors.studentId = "Student ID is required";
    if (!formData.studentName) newErrors.studentName = "Student name is required";
    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else if (parseFloat(formData.amount) < 100) {
      newErrors.amount = "Amount must be at least ₦100";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{11}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid Nigerian phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Save school to recent list
      if (formData.institution) {
        const updatedRecent = [
          formData.institution,
          ...recentSchools.filter(school => school !== formData.institution)
        ].slice(0, 3);
        
        setRecentSchools(updatedRecent);
        localStorage.setItem("recentSchools", JSON.stringify(updatedRecent));
      }
      
      setStage("confirmation");
    }
  };

  const confirmPayment = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setPaymentDetails({
        reference: `ARP-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        authorization_url: "#",
        timestamp: new Date().toISOString(),
      });
      setIsProcessing(false);
      setStage("success");
    }, 2000);
  };

  const handleSchoolSelect = (school) => {
    setFormData(prev => ({ ...prev, institution: school }));
    setShowSchoolDropdown(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount).replace('NGN', '₦');
  };

  const resetForm = () => {
    setFormData({
      schoolType: "",
      institution: "",
      studentId: "",
      studentName: "",
      amount: "",
      email: "",
      phone: "",
      semester: "First Semester",
      academicYear: new Date().getFullYear().toString()
    });
    setStage("form");
  };

  // Nigerian school fee structure (approximate ranges)
  const feeStructure = {
    primary: {
      public: "₦5,000 - ₦20,000 per term",
      private: "₦50,000 - ₦500,000 per term",
    },
    secondary: {
      public: "₦10,000 - ₦50,000 per term",
      private: "₦100,000 - ₦3,000,000 per term",
    },
    tertiary: {
      public: "₦30,000 - ₦200,000 per session",
      private: "₦300,000 - ₦2,000,000 per session",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden border border-blue-100"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full opacity-20 transform translate-x-10 -translate-y-10"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-700 rounded-full opacity-20 transform -translate-x-10 translate-y-10"></div>
            
            <div className="flex items-center space-x-3 mb-2 relative z-10">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow"
              >
                <DollarSign size={22} className="text-blue-600" />
              </motion.div>
              <span className="text-2xl font-bold">
                Arigo Pay
              </span>
            </div>
            
            <h1 className="text-xl font-semibold">
              {stage === "form" && "Pay School Fees"}
              {stage === "confirmation" && "Confirm Payment"}
              {stage === "success" && "Payment Complete"}
            </h1>
            <p className="text-blue-100 text-sm mt-1 max-w-md">
              {stage === "form" && "Fast, secure payments for any Nigerian educational institution"}
              {stage === "confirmation" && "Review your payment details before proceeding"}
              {stage === "success" && "Your transaction has been processed successfully"}
            </p>
          </div>

          {/* Main Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {stage === "form" && (
                <motion.div
                  key="form"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        School Type<span className="text-red-500">*</span>
                      </label>
                      <select
                        name="schoolType"
                        value={formData.schoolType}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-50 border ${errors.schoolType ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'} text-gray-900 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-300`}
                      >
                        <option value="">Select school type</option>
                        <option value="primary">Primary School</option>
                        <option value="secondary">Secondary School</option>
                        <option value="tertiary">Tertiary Institution</option>
                      </select>
                      {errors.schoolType && <p className="mt-1 text-xs text-red-500">{errors.schoolType}</p>}
                      {formData.schoolType && (
                        <p className="mt-1 text-xs text-gray-600">
                          Typical Fees: {feeStructure[formData.schoolType].public} (Public),{" "}
                          {feeStructure[formData.schoolType].private} (Private)
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Institution Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="institution"
                        value={formData.institution}
                        onChange={handleInputChange}
                        onFocus={() => setShowSchoolDropdown(true)}
                        className={`w-full bg-gray-50 border ${errors.institution ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'} text-gray-900 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-300`}
                        placeholder="e.g., University of Lagos"
                      />
                      {errors.institution && <p className="mt-1 text-xs text-red-500">{errors.institution}</p>}
                      
                      {/* Institution dropdown */}
                      {showSchoolDropdown && (formData.institution || recentSchools.length > 0) && (
                        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {recentSchools.length > 0 && (
                            <div className="p-2 bg-gray-50">
                              <p className="text-xs font-medium text-gray-500 mb-1">Recent</p>
                              {recentSchools.map((school, idx) => (
                                <div 
                                  key={idx}
                                  className="cursor-pointer hover:bg-blue-50 p-2 rounded text-sm"
                                  onClick={() => handleSchoolSelect(school)}
                                >
                                  {school}
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className="p-2">
                            <p className="text-xs font-medium text-gray-500 mb-1">Popular Institutions</p>
                            {popularInstitutions
                              .filter(s => s.toLowerCase().includes(formData.institution.toLowerCase()))
                              .map((school, idx) => (
                                <div
                                  key={idx}
                                  className="cursor-pointer hover:bg-blue-50 p-2 rounded text-sm"
                                  onClick={() => handleSchoolSelect(school)}
                                >
                                  {school}
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Semester
                        </label>
                        <select
                          name="semester"
                          value={formData.semester}
                          onChange={handleInputChange}
                          className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-300"
                        >
                          {semesterOptions.map((option, idx) => (
                            <option key={idx} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Academic Year
                        </label>
                        <select
                          name="academicYear"
                          value={formData.academicYear}
                          onChange={handleInputChange}
                          className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-300"
                        >
                          {[0, 1, 2, 3].map((offset) => {
                            const year = new Date().getFullYear() - offset;
                            return (
                              <option key={year} value={year}>
                                {year}/{year + 1}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Student ID<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="studentId"
                          value={formData.studentId}
                          onChange={handleInputChange}
                          className={`w-full bg-gray-50 border ${errors.studentId ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'} text-gray-900 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-300`}
                          placeholder="Enter student ID"
                        />
                        {errors.studentId && <p className="mt-1 text-xs text-red-500">{errors.studentId}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Student Name<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="studentName"
                          value={formData.studentName}
                          onChange={handleInputChange}
                          className={`w-full bg-gray-50 border ${errors.studentName ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'} text-gray-900 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-300`}
                          placeholder="Full name"
                        />
                        {errors.studentName && <p className="mt-1 text-xs text-red-500">{errors.studentName}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Amount (₦)<span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 text-gray-500">₦</span>
                        <input
                          type="number"
                          name="amount"
                          value={formData.amount}
                          onChange={handleInputChange}
                          className={`w-full bg-gray-50 border ${errors.amount ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'} text-gray-900 rounded-lg py-3 pl-8 pr-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-300`}
                          placeholder="0.00"
                          min="100"
                        />
                      </div>
                      {errors.amount && <p className="mt-1 text-xs text-red-500">{errors.amount}</p>}
                      {formData.amount && transactionFee > 0 && (
                        <p className="mt-1 text-xs text-gray-600">
                          Transaction fee: {formatCurrency(transactionFee)} ({TRANSACTION_FEE_PERCENTAGE}%)
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Email<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full bg-gray-50 border ${errors.email ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'} text-gray-900 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-300`}
                          placeholder="yourname@example.com"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Phone Number<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full bg-gray-50 border ${errors.phone ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'} text-gray-900 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-300`}
                          placeholder="08012345678"
                        />
                        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="pt-4">
                      <motion.button
                        type="submit"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3.5 rounded-lg font-semibold shadow-md flex items-center justify-center group"
                      >
                        <span>Continue to Review</span>
                        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}

              {stage === "confirmation" && (
                <motion.div
                  key="confirmation"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="bg-blue-50 rounded-lg p-5 mb-6 border border-blue-100">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Institution</p>
                        <p className="font-medium text-gray-900">{formData.institution}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Student ID</p>
                        <p className="font-medium text-gray-900">{formData.studentId}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Student Name</p>
                        <p className="font-medium text-gray-900">{formData.studentName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Payment For</p>
                        <p className="font-medium text-gray-900">{formData.semester}, {formData.academicYear}/{parseInt(formData.academicYear) + 1}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Contact</p>
                        <p className="font-medium text-gray-900">{formData.email}</p>
                        <p className="text-sm text-gray-700">{formData.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between text-gray-700 mb-1">
                      <span>Subtotal</span>
                      <span>{formatCurrency(parseFloat(formData.amount) || 0)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700 mb-1">
                      <span>Transaction Fee ({TRANSACTION_FEE_PERCENTAGE}%)</span>
                      <span>{formatCurrency(transactionFee)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg mt-3 pt-3 border-t border-gray-200">
                      <span>Total</span>
                      <span>{formatCurrency((parseFloat(formData.amount) || 0) + transactionFee)}</span>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 mb-6 flex items-start border border-green-100">
                    <Shield className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-green-800">
                      Your payment is secure and encrypted. You will receive a receipt via email once the payment is complete.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <motion.button
                      onClick={() => setStage("form")}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="w-full bg-gray-100 text-gray-700 py-3.5 rounded-lg font-medium flex items-center justify-center"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      <span>Edit Details</span>
                    </motion.button>
                    <motion.button
                      onClick={confirmPayment}
                      disabled={isProcessing}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3.5 rounded-lg font-semibold shadow-md flex items-center justify-center"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5 mr-2" />
                          <span>Pay Now</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {stage === "success" && (
                <motion.div
                  key="success"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-center"
                >
                  <div className="mb-6 flex justify-center">
                    <motion.div
                      className="h-20 w-20 rounded-full bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <CheckCircle className="h-10 w-10 text-white" />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      Payment Successful!
                    </h1>
                    <p className="text-gray-600 mb-4">
                      Your payment of {formatCurrency(parseFloat(formData.amount))} to {formData.institution} has been processed.
                    </p>
                    
                    <div className="bg-gray-50 rounded-lg py-4 px-6 mb-6 inline-block">
                      <div className="text-left">
                        <p className="text-sm text-gray-500">Reference Number</p>
                        <p className="font-mono font-medium text-gray-900">{paymentDetails?.reference}</p>
                        <p className="text-xs text-gray-500 mt-2">Date & Time</p>
                        <p className="text-sm text-gray-700">
                          {new Date().toLocaleDateString('en-NG', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-6">
                      A receipt has been sent to your email at {formData.email}
                    </p>
                  </motion.div>

                  <div className="flex gap-4">
                    <motion.button
                      onClick={resetForm}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3.5 rounded-lg font-semibold shadow-md"
                    >
                      Make Another Payment
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        
        {/* Footer */}
        <div className="text-center text-xs text-gray-500 mt-4">
          <p>© {new Date().getFullYear()} Arigo Pay. All rights reserved.</p>
          <p className="mt-1">Secured by industry standard encryption.</p>
        </div>
      </div>
    </div>
  );
};

export default SchoolFees;