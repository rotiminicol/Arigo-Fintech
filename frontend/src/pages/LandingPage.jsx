
import { useState, useEffect } from 'react';
import {
  ArrowRight,
  CreditCard,
  Lock,
  Smartphone,
  Menu,
  X,
  User,
  Shield,
  Wallet,
  PieChart,
  DollarSign,
  ChevronRight,
  Download,
  Clock,
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';


// Logo placeholder - replace with your actual logo
const ArigoPayLogo = "/placeholder.svg";

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll-based animations
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.7]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.scrollBehavior = 'smooth';
    return () => {
      document.body.style.scrollBehavior = 'auto';
    };
  }, []);

  // Animation variants
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 120, damping: 20 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
    hover: {
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="px-6 py-4 flex justify-between items-center sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200"
      >
        <div className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 15 }}
            className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden"
          >
            <img src={ArigoPayLogo} alt="Arigo Pay Logo" className="h-6 w-6 object-contain" />
          </motion.div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 text-transparent bg-clip-text">
            Arigo Pay
          </span>
        </div>
        <div className="hidden md:flex space-x-8 items-center">
          <motion.a
            whileHover={{ y: -2, color: "#2563eb" }}
            href="#features"
            className="font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Features
          </motion.a>
          <motion.a
            whileHover={{ y: -2, color: "#2563eb" }}
            href="#security"
            className="font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Security
          </motion.a>
          <motion.a
            whileHover={{ y: -2, color: "#2563eb" }}
            href="#about"
            className="font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            About
          </motion.a>
          <motion.a
            whileHover={{ y: -2, color: "#2563eb" }}
            href="#download"
            className="font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Download
          </motion.a>
          <motion.a
            href="/login"
            whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(29, 78, 216, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 bg-gradient-to-r from-blue-700 to-blue-500 rounded-full text-white text-sm font-medium transition-all shadow-md hover:shadow-blue-500/30"
          >
            Log In
          </motion.a>
        </div>
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
              className="md:hidden absolute top-16 right-0 left-0 bg-white border-b border-blue-100 shadow-xl p-4 z-50"
            >
              <div className="flex flex-col space-y-4">
                <a
                  href="#features"
                  className="px-4 py-2 hover:bg-blue-50 rounded-lg hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#security"
                  className="px-4 py-2 hover:bg-blue-50 rounded-lg hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Security
                </a>
                <a
                  href="#about"
                  className="px-4 py-2 hover:bg-blue-50 rounded-lg hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
                <a
                  href="#download"
                  className="px-4 py-2 hover:bg-blue-50 rounded-lg hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Download
                </a>
                <a
                  href="/login"
                  className="px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-500 rounded-lg text-white text-center transition-colors hover:opacity-90"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 px-6 max-w-7xl mx-auto"
      >
        {/* Background elements */}
        <div className="absolute top-0 -right-64 w-[500px] h-[500px] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-32 -left-64 w-[600px] h-[600px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 -right-64 w-[400px] h-[400px] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="flex flex-col lg:flex-row items-center gap-12 relative">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="lg:w-1/2 space-y-6"
          >
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              Smart Banking for the
              <span className="block bg-gradient-to-r from-blue-700 to-blue-500 text-transparent bg-clip-text mt-2">
                Modern World
              </span>
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              Arigo Pay combines advanced security with intuitive design to give you a banking experience
              thats both powerful and simple. Manage your money with confidence.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            >
              <motion.a
                href="/signup"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(29, 78, 216, 0.2)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-700 to-blue-500 rounded-full flex items-center space-x-2 text-white font-medium transition-all shadow-lg hover:shadow-blue-500/30"
              >
                <span>Open Account</span>
                <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="#features"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-blue-200 text-blue-700 font-medium rounded-full hover:bg-blue-50 transition-all flex items-center"
              >
                Explore Features
              </motion.a>
            </motion.div>

            <motion.div 
              className="pt-8 flex items-center space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <div className="flex items-center space-x-2">
                <Shield size={20} className="text-green-600" />
                <span className="text-sm font-medium text-gray-700">Bank-Grade Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <CreditCard size={20} className="text-blue-600" />
                <span className="text-sm font-medium text-gray-700">FDIC Insured</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            transition={{ delay: 0.3 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative w-full h-[450px]">
              {/* Card 1 */}
              <motion.div
                animate={{ y: [-10, 10, -10], rotate: [0, -2, 0], transition: { repeat: Infinity, duration: 5, ease: "easeInOut" } }}
                className="absolute top-0 left-8 w-64 h-40 bg-gradient-to-br from-blue-700 to-blue-500 rounded-2xl shadow-2xl overflow-hidden p-4 flex flex-col justify-between text-white"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs opacity-80">Arigo Pay</p>
                    <p className="text-xs opacity-80">Platinum</p>
                  </div>
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <CreditCard size={20} className="text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm opacity-80">Card Number</p>
                  <p className="font-mono">**** **** **** 5678</p>
                  <div className="flex justify-between items-center">
                    <p className="text-xs opacity-80">VALID THRU: 04/29</p>
                    <p className="text-xs opacity-80">JOHN DOE</p>
                  </div>
                </div>
              </motion.div>

              {/* Mobile app interface */}
              <motion.div
                animate={{ y: [5, -5, 5], transition: { repeat: Infinity, duration: 6, ease: "easeInOut" } }}
                className="absolute bottom-0 right-10 w-[280px] h-[500px] bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-800"
              >
                <div className="bg-blue-600 h-28 p-6">
                  <p className="text-white font-medium">Welcome back</p>
                  <p className="text-lg text-white font-semibold">John Doe</p>
                </div>
                <div className="p-4">
                  <div className="bg-white rounded-lg shadow-md p-3 -mt-10 mb-4">
                    <p className="text-xs text-gray-500">Available Balance</p>
                    <p className="text-2xl font-bold text-gray-800">$12,584.90</p>
                    <div className="mt-3 flex items-center justify-between">
                      <button className="bg-blue-50 text-blue-600 p-2 rounded-lg text-xs flex items-center">
                        <ArrowRight size={14} className="mr-1" />
                        Send
                      </button>
                      <button className="bg-blue-50 text-blue-600 p-2 rounded-lg text-xs flex items-center">
                        <Download size={14} className="mr-1" />
                        Receive
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-sm font-medium mb-2">Recent Transactions</p>
                  
                  {Array(4).fill(0).map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + (i * 0.1) }}
                      className="flex items-center justify-between py-3 border-b border-gray-100"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          {i % 2 === 0 ? <DollarSign size={14} /> : <CreditCard size={14} />}
                        </div>
                        <div>
                          <p className="text-xs font-medium">
                            {i % 2 === 0 ? 'Online Payment' : 'Card Transaction'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {i % 2 === 0 ? 'Amazon' : 'Coffee Shop'}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs font-medium">
                        {i % 2 === 0 ? '-$45.00' : '-$6.80'}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Card 2 - Behind */}
              <motion.div
                animate={{ y: [15, -5, 15], rotate: [3, 5, 3], transition: { repeat: Infinity, duration: 7, ease: "easeInOut" } }}
                className="absolute left-32 top-20 w-56 h-36 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-xl overflow-hidden p-4 flex flex-col justify-between text-white z-0"
              >
                <div className="flex justify-end">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                    <CreditCard size={16} className="text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-xs opacity-60">Arigo Pay</p>
                  <p className="text-xs opacity-60">Black</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats section */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-xl border border-gray-100 shadow-md relative z-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { value: '500K+', label: 'Active Users' },
            { value: '99.9%', label: 'Uptime' },
            { value: '$2B+', label: 'Transactions' },
            { value: '24/7', label: 'Support' },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              className="text-center"
              variants={itemVariants}
            >
              <p className="text-2xl md:text-3xl font-bold text-blue-700">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-medium text-blue-600 mb-2 uppercase tracking-wider">Features</p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Designed for the way you bank
            </h2>
            <p className="text-lg text-gray-600">
              Arigo Pay combines innovative technology with intuitive design to create
              a banking experience that puts you in control of your finances.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Smartphone className="h-8 w-8 text-white" />,
                color: "blue",
                title: 'Mobile-First Banking',
                description:
                  'Bank anywhere, anytime with our feature-rich mobile app. Send money, check balances, and manage cards with a few taps.',
              },
              {
                icon: <Wallet className="h-8 w-8 text-white" />,
                color: "green",
                title: 'Fee-Free Banking',
                description:
                  'No monthly fees, no minimum balances, and free transfers between Arigo Pay users. Banking that keeps money in your pocket.',
              },
              {
                icon: <Lock className="h-8 w-8 text-white" />,
                color: "purple",
                title: 'Advanced Security',
                description:
                  'Industry-leading security with biometric authentication, instant fraud alerts, and encrypted transactions.',
              },
              {
                icon: <PieChart className="h-8 w-8 text-white" />,
                color: "orange",
                title: 'Smart Insights',
                description:
                  'Track spending patterns, set budgets, and receive personalized financial insights to help you save more.',
              },
              {
                icon: <CreditCard className="h-8 w-8 text-white" />,
                color: "indigo",
                title: 'Virtual Cards',
                description:
                  'Create virtual cards for online purchases with custom spending limits and the ability to freeze cards instantly.',
              },
              {
                icon: <Clock className="h-8 w-8 text-white" />,
                color: "rose",
                title: 'Real-Time Notifications',
                description:
                  'Instant alerts for all transactions, balance updates, and important account activity.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className={`bg-${feature.color}-600 p-6`}>
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{feature.description}</p>
                  <motion.a 
                    href="#" 
                    className="mt-4 inline-flex items-center text-blue-600 font-medium"
                    whileHover={{ x: 5 }}
                  >
                    Learn more <ChevronRight size={16} className="ml-1" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm font-medium text-blue-600 mb-2 uppercase tracking-wider">Bank-Grade Security</p>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Your security is our top priority
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Weve built Arigo Pay with multiple layers of protection to keep your money and data safe.
                Our advanced security features include:
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "End-to-End Encryption",
                    description: "Your sensitive data is encrypted at rest and in transit using industry-leading standards."
                  },
                  {
                    title: "Biometric Authentication",
                    description: "Access your account securely using fingerprint or facial recognition."
                  },
                  {
                    title: "Real-time Fraud Monitoring",
                    description: "Our AI systems analyze transactions 24/7 to detect and prevent suspicious activity."
                  },
                  {
                    title: "FDIC Insurance",
                    description: "Your deposits are FDIC insured up to $250,000, giving you peace of mind."
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="mr-4 mt-1">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <Shield size={14} className="text-green-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative h-[500px] w-full flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-50 rounded-3xl"></div>
                
                <motion.div 
                  className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center p-4"
                  animate={{ y: [-10, 10, -10], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
                >
                  <Lock size={32} className="text-blue-600 mb-2" />
                  <p className="text-xs text-center font-medium">Advanced Encryption</p>
                </motion.div>
                
                <motion.div 
                  className="absolute top-1/3 right-1/4 w-32 h-32 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center p-4"
                  animate={{ y: [-15, 5, -15], transition: { repeat: Infinity, duration: 5, ease: "easeInOut" } }}
                >
                  <Shield size={32} className="text-green-600 mb-2" />
                  <p className="text-xs text-center font-medium">Fraud Protection</p>
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center p-4"
                  animate={{ y: [5, -15, 5], transition: { repeat: Infinity, duration: 4.5, ease: "easeInOut" } }}
                >
                  <User size={32} className="text-purple-600 mb-2" />
                  <p className="text-xs text-center font-medium">Biometric Auth</p>
                </motion.div>
                
                <div className="relative z-10 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs">
                  <div className="w-12 h-12 mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                    <Lock size={24} className="text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Security Center</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Your account is protected with multiple layers of security. Your last login was today at 10:45 AM.
                  </p>
                  <div className="bg-green-50 p-3 rounded-lg flex items-center">
                    <Shield size={20} className="text-green-600 mr-2" />
                    <p className="text-sm text-green-800">All systems secure</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="about" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-medium text-blue-600 mb-2 uppercase tracking-wider">Testimonials</p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Trusted by thousands of customers
            </h2>
            <p className="text-lg text-gray-600">
              Dont just take our word for it - hear what our customers have to say about their Arigo Pay experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Small Business Owner',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&h=120&auto=format&fit=crop',
                text: 'Arigo Pay has transformed how I manage my business finances. The instant notifications and detailed transaction records save me hours of bookkeeping every month.',
              },
              {
                name: 'Michael Lee',
                role: 'Software Engineer',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&h=120&auto=format&fit=crop',
                text: 'The security features are impressive. I love being able to create virtual cards for different subscriptions and lock them with a tap when not in use.',
              },
              {
                name: 'Emma Rodriguez',
                role: 'Graduate Student',
                image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=120&h=120&auto=format&fit=crop',
                text: 'As someone who travels often, the zero foreign transaction fees and instant currency conversion have been a game-changer. Best banking experience I',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section id="download" className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 bg-blue-100 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 bg-blue-200 rounded-full filter blur-3xl opacity-30"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm font-medium text-blue-600 mb-2 uppercase tracking-wider">Mobile App</p>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Your financial life in your pocket
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Download the Arigo Pay app and take control of your finances wherever you go.
                Available for iOS and Android devices.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center bg-black text-white px-6 py-3 rounded-xl"
                >
                  <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.5,2A4.5,4.5,0,0,1,22,6.5V17.5A4.5,4.5,0,0,1,17.5,22H6.5A4.5,4.5,0,0,1,2,17.5V6.5A4.5,4.5,0,0,1,6.5,2h11m0-2H6.5A6.5,6.5,0,0,0,0,6.5v11A6.5,6.5,0,0,0,6.5,24h11A6.5,6.5,0,0,0,24,17.5V6.5A6.5,6.5,0,0,0,17.5,0Z" />
                    <path d="M12,9.17a3,3,0,0,1,2.12.88,3,3,0,0,1,0,4.24,3,3,0,0,1-4.24,0,3,3,0,0,1,0-4.24A3,3,0,0,1,12,9.17Zm0-7A10,10,0,0,0,8.84,21.49,10,10,0,0,0,15.16,2.51,10.07,10.07,0,0,0,12,2.17Z" />
                  </svg>
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-semibold font-sans">App Store</div>
                  </div>
                </motion.a>

                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center bg-black text-white px-6 py-3 rounded-xl"
                >
                  <svg className="w-8 h-8 mr-3" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                  </svg>
                  <div>
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-lg font-semibold font-sans">Google Play</div>
                  </div>
                </motion.a>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-4">
                {[
                  { value: '4.9', label: 'App Store' },
                  { value: '4.8', label: 'Google Play' },
                  { value: '10M+', label: 'Downloads' },
                ].map((stat, i) => (
                  <motion.div 
                    key={i} 
                    className=""
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                  >
                    <p className="text-2xl font-bold text-blue-700">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="lg:w-1/2 flex justify-center"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <motion.div 
                  className="absolute -top-10 -left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Phone mockup 1 */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative z-10"
                >
                  <motion.div
                    animate={{ y: [-10, 10, -10], transition: { repeat: Infinity, duration: 6, ease: "easeInOut" } }}
                    className="w-[280px] h-[560px] bg-black rounded-[40px] overflow-hidden border-8 border-gray-800 shadow-2xl"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1280&h=1792&auto=format&fit=crop" 
                      alt="Arigo Pay App" 
                      className="w-full h-full object-cover object-center"
                    />
                  </motion.div>
                </motion.div>

                {/* Phone mockup 2 (offset) */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="absolute left-40 top-20 z-0"
                >
                  <motion.div
                    animate={{ y: [10, -10, 10], transition: { repeat: Infinity, duration: 5, ease: "easeInOut" } }}
                    className="w-[280px] h-[560px] bg-black rounded-[40px] overflow-hidden border-8 border-gray-800 shadow-2xl"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1280&h=1792&auto=format&fit=crop" 
                      alt="Arigo Pay App Features" 
                      className="w-full h-full object-cover object-center"
                    />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to reimagine your banking experience?
          </h2>
          <p className="text-xl text-blue-50 mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have already made the switch to Arigo Pay.
            Open your account in minutes.
          </p>
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.a
              variants={itemVariants}
              href="/signup"
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-blue-700 rounded-full font-medium text-lg transition-all shadow-lg flex items-center space-x-2"
            >
              <span>Open Free Account</span>
              <ArrowRight size={20} />
            </motion.a>
            <motion.a
              variants={itemVariants}
              href="#features"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white text-white font-medium text-lg rounded-full hover:bg-white/10 transition-all flex items-center"
            >
              Learn More
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 mb-6"
              >
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden">
                  <img src={ArigoPayLogo} alt="Arigo Pay Logo" className="h-6 w-6 object-contain" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 text-transparent bg-clip-text">
                  Arigo Pay
                </span>
              </motion.div>
              <p className="text-gray-400 mb-6 max-w-xs">
                Reimagining banking for the digital age with security, 
                simplicity, and innovation at the core of everything we do.
              </p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <motion.a
                    key={social}
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href={`#${social}`}
                    className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10z" />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                {['About Us', 'Careers', 'Press', 'News', 'Contact'].map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Products</h3>
              <ul className="space-y-2">
                {['Personal Banking', 'Business Accounts', 'Debit Cards', 'Investments', 'Security'].map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Licenses'].map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2025 Arigo Pay. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;