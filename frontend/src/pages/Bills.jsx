import { useState, useEffect } from 'react';
import { ArrowRight, Send, Phone, Wifi, Zap, Bus, Gamepad2, AlertCircle, Check, Moon, Sun } from 'lucide-react';

const Bills = () => {
  const [activeTab, setActiveTab] = useState('transfer');
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [networkProvider, setNetworkProvider] = useState('');
  const [meterNumber, setMeterNumber] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [banks, setBanks] = useState([]);
  const [errors, setErrors] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Fetch Nigerian banks (mocked for demo)
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        setBanks([
          { name: 'Access Bank', code: '044' },
          { name: 'First Bank of Nigeria', code: '011' },
          { name: 'Guaranty Trust Bank', code: '058' },
          { name: 'United Bank for Africa', code: '033' },
          { name: 'Zenith Bank', code: '057' },
          { name: 'Wema Bank', code: '035' },
          { name: 'Sterling Bank', code: '232' },
          { name: 'Fidelity Bank', code: '070' },
        ]);
      } catch (error) {
        console.error('Error fetching banks:', error);
      }
    };
    fetchBanks();
  }, []);

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (activeTab === 'transfer') {
      if (!selectedBank) newErrors.selectedBank = 'Please select a bank';
      if (!accountNumber.match(/^\d{10}$/)) newErrors.accountNumber = 'Enter a valid 10-digit account number';
      if (!amount || amount < 100) newErrors.amount = 'Amount must be at least ₦100';
    } else if (activeTab === 'airtime') {
      if (!networkProvider) newErrors.networkProvider = 'Please select a network provider';
      if (!phoneNumber.match(/^\d{11}$/)) newErrors.phoneNumber = 'Enter a valid 11-digit phone number';
      if (!amount || amount < 50) newErrors.amount = 'Amount must be at least ₦50';
    } else if (activeTab === 'electricity') {
      if (!meterNumber) newErrors.meterNumber = 'Enter a valid meter number';
      if (!amount || amount < 500) newErrors.amount = 'Amount must be at least ₦500';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        setAmount('');
        setAccountNumber('');
        setSelectedBank('');
        setPhoneNumber('');
        setNetworkProvider('');
        setMeterNumber('');
        setErrors({});
      }, 3000);
    }, 2000);
  };

  const tabs = [
    { id: 'transfer', name: 'Transfer', icon: <Send className="w-5 h-5" /> },
    { id: 'airtime', name: 'Airtime', icon: <Phone className="w-5 h-5" /> },
    { id: 'data', name: 'Data', icon: <Wifi className="w-5 h-5" /> },
    { id: 'electricity', name: 'Electricity', icon: <Zap className="w-5 h-5" /> },
    { id: 'transport', name: 'Transport', icon: <Bus className="w-5 h-5" /> },
    { id: 'betting', name: 'Betting', icon: <Gamepad2 className="w-5 h-5" /> },
  ];

  const networkProviders = [
    { id: 'mtn', name: 'MTN Nigeria' },
    { id: 'airtel', name: 'Airtel Nigeria' },
    { id: 'glo', name: 'Globacom' },
    { id: '9mobile', name: '9Mobile' },
  ];

  const electricityProviders = [
    { id: 'ekedc', name: 'Eko Electricity' },
    { id: 'ikedc', name: 'Ikeja Electricity' },
    { id: 'aedc', name: 'Abuja Electricity' },
    { id: 'phedc', name: 'Port Harcourt Electricity' },
  ];

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="fixed top-4 left-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
        >
          {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>

        <div className={`rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 transform hover:scale-[1.01] ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="p-8">
            <h1 className={`text-4xl font-extrabold mb-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'} tracking-tight`}>
              Nigerian Bills Payment Hub
            </h1>

            {/* Tabs */}
            <div className="flex overflow-x-auto mb-10 pb-2 scrollbar-hide gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-5 py-3 rounded-xl whitespace-nowrap transition-all duration-300 ${
                    activeTab === tab.id
                      ? `${isDarkMode ? 'bg-blue-500 text-white shadow-lg' : 'bg-blue-600 text-white shadow-md'}`
                      : `${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  <span className="font-semibold">{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Transfer Form */}
              {activeTab === 'transfer' && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Select Bank
                    </label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                        isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                      } ${errors.selectedBank ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select a bank</option>
                      {banks.map((bank) => (
                        <option key={bank.code} value={bank.code}>
                          {bank.name}
                        </option>
                      ))}
                    </select>
                    {errors.selectedBank && <p className="text-red-500 text-sm mt-1">{errors.selectedBank}</p>}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="Enter 10-digit account number"
                      className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                        isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                      } ${errors.accountNumber ? 'border-red-500' : ''}`}
                      maxLength={10}
                    />
                    {errors.accountNumber && <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Amount (₦)
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                        isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                      } ${errors.amount ? 'border-red-500' : ''}`}
                      min="100"
                    />
                    {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
                  </div>
                </div>
              )}

              {/* Airtime Form */}
              {activeTab === 'airtime' && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Network Provider
                    </label>
                    <select
                      value={networkProvider}
                      onChange={(e) => setNetworkProvider(e.target.value)}
                      className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                        isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                      } ${errors.networkProvider ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select network provider</option>
                      {networkProviders.map((provider) => (
                        <option key={provider.id} value={provider.id}>
                          {provider.name}
                        </option>
                      ))}
                    </select>
                    {errors.networkProvider && <p className="text-red-500 text-sm mt-1">{errors.networkProvider}</p>}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter phone number"
                      className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                        isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                      } ${errors.phoneNumber ? 'border-red-500' : ''}`}
                      maxLength={11}
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Amount (₦)
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                        isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                      } ${errors.amount ? 'border-red-500' : ''}`}
                      min="50"
                    />
                    {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
                  </div>
                </div>
              )}

              {/* Data Form */}
              {activeTab === 'data' && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Network Provider
                    </label>
                    <select
                      value={networkProvider}
                      onChange={(e) => setNetworkProvider(e.target.value)}
                      className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                        isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                      }`}
                    >
                      <option value="">Select network provider</option>
                      {networkProviders.map((provider) => (
                        <option key={provider.id} value={provider.id}>
                          {provider.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Data Plan
                    </label>
                    <select
                      className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                        isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                      }`}
                    >
                      <option value="">Select data plan</option>
                      <option value="daily">Daily (100MB - ₦100)</option>
                      <option value="weekly">Weekly (1GB - ₦500)</option>
                      <option value="monthly">Monthly (3GB - ₦1,500)</option>
                      <option value="premium">Premium (10GB - ₦5,000)</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter phone number"
                      className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                        isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                      }`}
                      maxLength={11}
                    />
                  </div>
                </div>
              )}

              {/* Electricity Form */}
              {activeTab === 'electricity' && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Electricity Provider
                    </label>
                    <select
                      className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                        isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                      }`}
                    >
                      <option value="">Select electricity provider</option>
                      {electricityProviders.map((provider) => (
                        <option key={provider.id} value={provider.id}>
                          {provider.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Meter Number
                    </label>
                    <input
                      type="text"
                      value={meterNumber}
                      onChange={(e) => setMeterNumber(e.target.value)}
                      placeholder="Enter meter number"
                      className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                        isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                      } ${errors.meterNumber ? 'border-red-500' : ''}`}
                    />
                    {errors.meterNumber && <p className="text-red-500 text-sm mt-1">{errors.meterNumber}</p>}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Amount (₦)
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                        isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                      } ${errors.amount ? 'border-red-500' : ''}`}
                      min="500"
                    />
                    {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-4 px-6 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 ${
                  isLoading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : `${isDarkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'}`
                } text-white font-semibold text-lg shadow-lg`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Pay Now
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </div>
                )}
              </button>
            </form>

            {/* Recent Transactions */}
            <div className="mt-12">
              <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Recent Transactions
              </h2>
              <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                {[
                  { name: 'Bank Transfer to GTBank', date: 'Apr 10, 2025', amount: '25,000', status: 'Successful' },
                  { name: 'MTN Airtime Purchase', date: 'Apr 09, 2025', amount: '2,000', status: 'Successful' },
                  { name: 'Ikeja Electric Payment', date: 'Apr 08, 2025', amount: '10,000', status: 'Successful' },
                ].map((txn, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-4 ${index < 2 ? 'border-b' : ''} ${
                      isDarkMode ? 'border-gray-600' : 'border-gray-200'
                    } hover:bg-opacity-50 transition-all duration-200`}
                  >
                    <div>
                      <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{txn.name}</p>
                      <p className="text-sm text-gray-500">{txn.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-500">-₦{txn.amount}</p>
                      <p className="text-sm text-green-500">{txn.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 animate-in fade-in duration-300">
            <div
              className={`rounded-2xl p-10 max-w-md w-full shadow-2xl transform animate-in zoom-in-90 duration-500 ${
                isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Check className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Transaction Successful!</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
                  Your transaction has been processed successfully.
                </p>
                <div className={`border-t w-full pt-6 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                  <div className="flex justify-between mb-3">
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Reference:</span>
                    <span className="font-semibold">NGN{Math.floor(Math.random() * 1000000000)}</span>
                  </div>
                  <div className="flex justify-between mb-3">
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Amount:</span>
                    <span className="font-semibold">₦{amount || '10,000'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Date:</span>
                    <span className="font-semibold">Apr 14, 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Debit Alert */}
        {isLoading && (
          <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-right duration-500">
            <div
              className={`rounded-xl shadow-xl p-6 max-w-sm w-full border-l-4 border-red-500 ${
                isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'
              }`}
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-6 w-6 text-red-500" />
                </div>
                <div className="ml-4">
                  <p className="text-base font-semibold">Debit Alert</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Your account has been debited with ₦{amount || '0.00'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bills;