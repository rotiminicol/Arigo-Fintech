import { useState, useEffect } from 'react';
import { AlertTriangle, ArrowRight, CheckCircle, ChevronDown, CreditCard, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Simulated banks data
const NIGERIAN_BANKS = [
  { id: 1, name: 'Access Bank', code: '044' },
  { id: 2, name: 'First Bank', code: '011' },
  { id: 3, name: 'GTBank', code: '058' },
  { id: 4, name: 'UBA', code: '033' },
  { id: 5, name: 'Zenith Bank', code: '057' },
  { id: 6, name: 'Kuda Bank', code: '090267' },
  { id: 7, name: 'Moniepoint', code: '50515' },
  { id: 8, name: 'Palmpay', code: '100033' },
  { id: 9, name: 'Sterling Bank', code: '232' },
  { id: 10, name: 'Wema Bank', code: '035' },
];

// Transaction history (simulated)
const RECENT_TRANSACTIONS = [
  { id: 1, name: 'Chioma Okafor', bank: 'GTBank', amount: 50000, date: '2025-04-08', status: 'success' },
  { id: 2, name: 'Emeka Nwosu', bank: 'Access Bank', amount: 25000, date: '2025-04-07', status: 'success' },
  { id: 3, name: 'Folake Adeyemi', bank: 'UBA', amount: 75000, date: '2025-04-05', status: 'failed' },
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  }).format(amount);
};

const Transfer = () => {
  const [selectedBank, setSelectedBank] = useState(null);
  const [bankDropdownOpen, setBankDropdownOpen] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [amount, setAmount] = useState('');
  const [narration, setNarration] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [transferError, setTransferError] = useState(null);
  const [availableBalance, setAvailableBalance] = useState(250000);

  // Verify account number
  const verifyAccount = () => {
    if (!selectedBank || accountNumber.length !== 10) return;

    setVerifying(true);
    setTimeout(() => {
      if (accountNumber === '0123456789') {
        setAccountName('John Okonkwo');
      } else if (accountNumber === '9876543210') {
        setAccountName('Amina Ibrahim');
      } else {
        const firstNames = ['Chioma', 'Emeka', 'Ngozi', 'Oluwaseun', 'Tunde', 'Blessing', 'Chinedu'];
        const lastNames = ['Okafor', 'Mohammed', 'Adeyemi', 'Okonkwo', 'Ibrahim', 'Nwosu', 'Eze'];
        const randomName = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
          lastNames[Math.floor(Math.random() * lastNames.length)]
        }`;
        setAccountName(randomName);
      }
      setVerifying(false);
    }, 1500);
  };

  useEffect(() => {
    if (accountNumber.length === 10 && selectedBank) {
      verifyAccount();
    } else {
      setAccountName('');
    }
  }, [accountNumber, selectedBank]);

  const handleTransfer = () => {
    if (!selectedBank || !accountNumber || !accountName || !amount || parseFloat(amount) <= 0) {
      setTransferError('Please fill all required fields correctly');
      return;
    }

    if (parseFloat(amount) > availableBalance) {
      setTransferError('Insufficient funds');
      return;
    }

    setLoading(true);
    setTransferError(null);

    setTimeout(() => {
      setAvailableBalance((prev) => prev - parseFloat(amount));
      setLoading(false);
      setTransferSuccess(true);

      setTimeout(() => {
        setSelectedBank(null);
        setAccountNumber('');
        setAccountName('');
        setAmount('');
        setNarration('');
        setTransferSuccess(false);
      }, 3000);
    }, 2000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 25px rgba(59, 130, 246, 0.5)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
      boxShadow: '0 5px 15px rgba(59, 130, 246, 0.3)',
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Decorative Background Elements */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, -20, 0], scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-40 left-10 w-40 h-40 rounded-full bg-blue-300/10 blur-2xl"
        animate={{ x: [0, -10, 0], y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
      />

      <div className="flex flex-col lg:flex-row h-full">
        {/* Main transfer form */}
        <div className="lg:w-2/3 p-6 lg:p-10">
          <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg shadow-blue-700/30">
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Bank Transfer</h1>
            <p className="text-blue-100 text-sm mb-8">Send money securely to any Nigerian bank account</p>

            <AnimatePresence>
              {transferSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-green-500/20 border border-green-300/30 rounded-lg p-4 flex items-center mb-6"
                >
                  <CheckCircle className="text-green-400 mr-3 h-6 w-6" />
                  <div>
                    <p className="font-medium text-green-100">Transfer Successful!</p>
                    <p className="text-green-200 text-sm">
                      {formatCurrency(amount)} sent to {accountName}.
                    </p>
                  </div>
                </motion.div>
              )}

              {transferError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-500/20 border border-red-300/30 rounded-lg p-4 flex items-center mb-6"
                >
                  <AlertTriangle className="text-red-400 mr-3 h-5 w-5" />
                  <p className="text-red-200 text-sm">{transferError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bank Selection */}
            <div className="mb-6">
              <label
                htmlFor="bank-select"
                className="block text-sm font-medium text-blue-100 uppercase tracking-wider mb-2"
              >
                Select Bank <span className="text-red-300">*</span>
              </label>
              <div className="relative">
                <button
                  id="bank-select"
                  type="button"
                  className="w-full flex justify-between items-center px-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                  onClick={() => setBankDropdownOpen(!bankDropdownOpen)}
                  aria-expanded={bankDropdownOpen}
                  aria-haspopup="listbox"
                >
                  <span className={selectedBank ? 'text-white' : 'text-white/50'}>
                    {selectedBank ? selectedBank.name : 'Choose a bank'}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-white/70 transition-transform duration-300 ${
                      bankDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {bankDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 mt-2 w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg max-h-60 overflow-auto"
                    role="listbox"
                  >
                    {NIGERIAN_BANKS.map((bank) => (
                      <div
                        key={bank.id}
                        className="px-4 py-2 hover:bg-white/10 cursor-pointer text-white/80 hover:text-white transition duration-150"
                        onClick={() => {
                          setSelectedBank(bank);
                          setBankDropdownOpen(false);
                        }}
                        role="option"
                        aria-selected={selectedBank?.id === bank.id}
                      >
                        {bank.name}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Account Number */}
            <div className="mb-6">
              <label
                htmlFor="account-number"
                className="block text-sm font-medium text-blue-100 uppercase tracking-wider mb-2"
              >
                Account Number <span className="text-red-300">*</span>
              </label>
              <input
                id="account-number"
                type="text"
                maxLength={10}
                className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                placeholder="Enter 10-digit account number"
                value={accountNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && value.length <= 10) {
                    setAccountNumber(value);
                  }
                }}
                aria-required="true"
              />
            </div>

            {/* Account Name */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-blue-100 uppercase tracking-wider mb-2">
                Account Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/10 text-white/70 placeholder-white/50"
                  value={accountName}
                  readOnly
                  placeholder={verifying ? 'Verifying...' : 'Account name will appear here'}
                  aria-live="polite"
                />
                {verifying && (
                  <Loader className="absolute right-3 top-3 h-5 w-5 text-blue-400 animate-spin" />
                )}
              </div>
            </div>

            {/* Amount */}
            <div className="mb-6">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-blue-100 uppercase tracking-wider mb-2"
              >
                Amount (₦) <span className="text-red-300">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-white/70">₦</span>
                <input
                  id="amount"
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*\.?\d{0,2}$/.test(value)) {
                      setAmount(value);
                    }
                  }}
                  aria-required="true"
                />
              </div>
              <p className="text-xs text-blue-200 mt-1.5">
                Available balance: {formatCurrency(availableBalance)}
              </p>
            </div>

            {/* Narration */}
            <div className="mb-8">
              <label
                htmlFor="narration"
                className="block text-sm font-medium text-blue-100 uppercase tracking-wider mb-2"
              >
                Narration (Optional)
              </label>
              <textarea
                id="narration"
                className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 resize-none"
                placeholder="What's this transfer for?"
                rows={3}
                value={narration}
                onChange={(e) => setNarration(e.target.value)}
              />
            </div>

            {/* Transfer Button */}
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className={`w-full py-3 rounded-lg font-medium flex items-center justify-center transition duration-300 ${
                loading || !selectedBank || !accountNumber || !accountName || !amount
                  ? 'bg-white/10 cursor-not-allowed text-white/50'
                  : 'bg-gradient-to-r from-blue-500 to-blue-400 text-white'
              }`}
              onClick={handleTransfer}
              disabled={loading || !selectedBank || !accountNumber || !accountName || !amount}
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <Loader className="animate-spin mr-2 h-5 w-5" />
                  Processing...
                </>
              ) : (
                <>
                  Transfer Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </motion.button>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3 p-6 lg:p-10">
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-sm font-bold text-blue-100 uppercase tracking-wider">
              Recent Transactions
            </h3>

            <div className="space-y-4">
              {RECENT_TRANSACTIONS.map((tx) => (
                <motion.div
                  key={tx.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)' }}
                  className="p-4 bg-white/10 backdrop-blur-sm rounded-lg transition duration-300"
                >
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-white">{tx.name}</p>
                    <div
                      className={`text-sm font-medium ${
                        tx.status === 'success' ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {tx.status === 'success' ? 'Success' : 'Failed'}
                    </div>
                  </div>
                  <div className="text-sm text-blue-200">{tx.bank}</div>
                  <div className="flex justify-between mt-2">
                    <div className="font-semibold text-white">{formatCurrency(tx.amount)}</div>
                    <div className="text-xs text-blue-200">{tx.date}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={itemVariants}
              className="p-5 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
            >
              <h4 className="text-sm font-bold text-blue-100 uppercase tracking-wider mb-3">
                Transfer Tips
              </h4>
              <ul className="text-sm text-blue-200 space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-400 mr-2 mt-1" />
                  Always verify account details before transferring.
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-400 mr-2 mt-1" />
                  Transfers within Nigeria are typically instant.
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-400 mr-2 mt-1" />
                  Save frequent recipients for quick transfers.
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-5 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
            >
              <h4 className="text-sm font-bold text-blue-100 uppercase tracking-wider flex items-center mb-2">
                <CreditCard className="h-5 w-5 mr-2 text-blue-400" />
                Need Help?
              </h4>
              <p className="text-sm text-blue-200">
                Our support team is available 24/7 to assist you.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, color: '#ffffff' }}
                whileTap={{ scale: 0.95 }}
                className="mt-3 text-blue-300 font-medium text-sm transition duration-150"
              >
                Contact Support
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Transfer;