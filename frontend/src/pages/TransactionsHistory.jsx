import { useState, useEffect } from 'react';
import { Search, Calendar, Filter, ArrowUpRight, ArrowDownLeft, CreditCard, Clock, ChevronDown, Download, Loader2 } from 'lucide-react';

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });

  useEffect(() => {
    // Simulate fetching transaction data with a more realistic delay
    const timer = setTimeout(() => {
      const mockTransactions = [
        {
          id: 1,
          type: 'credit',
          title: 'Money Received',
          amount: 2500.00,
          date: 'Apr 10, 2025',
          time: '14:32',
          recipient: 'John Smith',
          status: 'completed',
          category: 'transfer'
        },
        {
          id: 2,
          type: 'debit',
          title: 'Online Purchase',
          amount: 120.50,
          date: 'Apr 08, 2025',
          time: '09:15',
          recipient: 'Tech Store Inc.',
          status: 'completed',
          category: 'shopping'
        },
        {
          id: 3,
          type: 'debit',
          title: 'Subscription',
          amount: 14.99,
          date: 'Apr 05, 2025',
          time: '00:01',
          recipient: 'Premium Service',
          status: 'completed',
          category: 'subscription'
        },
        {
          id: 4,
          type: 'credit',
          title: 'Refund',
          amount: 39.99,
          date: 'Apr 03, 2025',
          time: '16:45',
          recipient: 'Online Retailer',
          status: 'completed',
          category: 'refund'
        },
        {
          id: 5,
          type: 'debit',
          title: 'Money Sent',
          amount: 500.00,
          date: 'Apr 01, 2025',
          time: '10:22',
          recipient: 'Sarah Johnson',
          status: 'completed',
          category: 'transfer'
        },
        {
          id: 6,
          type: 'debit',
          title: 'Bill Payment',
          amount: 89.95,
          date: 'Mar 28, 2025',
          time: '17:30',
          recipient: 'Utility Company',
          status: 'pending',
          category: 'bill'
        },
        {
          id: 7,
          type: 'credit',
          title: 'Freelance Payment',
          amount: 1200.00,
          date: 'Mar 25, 2025',
          time: '11:45',
          recipient: 'Client XYZ',
          status: 'completed',
          category: 'income'
        },
        {
          id: 8,
          type: 'debit',
          title: 'Grocery Shopping',
          amount: 87.32,
          date: 'Mar 22, 2025',
          time: '18:15',
          recipient: 'Supermarket',
          status: 'completed',
          category: 'shopping'
        }
      ];
      
      setTransactions(mockTransactions);
      setFilteredTransactions(mockTransactions);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let results = transactions;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(
        t => t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
             t.recipient.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply type filter
    if (filterType !== 'all') {
      if (filterType === 'incoming') {
        results = results.filter(t => t.type === 'credit');
      } else if (filterType === 'outgoing') {
        results = results.filter(t => t.type === 'debit');
      } else if (filterType === 'pending') {
        results = results.filter(t => t.status === 'pending');
      }
    }
    
    // Apply date range filter if both dates are provided
    if (dateRange.start && dateRange.end) {
      results = results.filter(t => {
        const transactionDate = new Date(t.date);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        return transactionDate >= startDate && transactionDate <= endDate;
      });
    }
    
    // Apply amount range filter if both values are provided
    if (amountRange.min !== '' && amountRange.max !== '') {
      results = results.filter(t => 
        t.amount >= parseFloat(amountRange.min) && 
        t.amount <= parseFloat(amountRange.max)
      );
    }
    
    setFilteredTransactions(results);
  }, [searchTerm, filterType, transactions, dateRange, amountRange]);

  const resetFilters = () => {
    setSearchTerm('');
    setFilterType('all');
    setDateRange({ start: '', end: '' });
    setAmountRange({ min: '', max: '' });
  };

  const TransactionCard = ({ transaction, index }) => {
    const isCredit = transaction.type === 'credit';
    const Icon = isCredit ? ArrowDownLeft : ArrowUpRight;
    const iconBgColor = isCredit ? 'bg-green-50' : 'bg-red-50';
    const iconColor = isCredit ? 'text-green-600' : 'text-red-600';
    const amountColor = isCredit ? 'text-green-600' : 'text-red-600';
    const amountPrefix = isCredit ? '+' : '-';
    const isPending = transaction.status === 'pending';
    
    return (
      <div 
        className={`
          bg-white rounded-xl p-4 shadow-xs border border-gray-100 mb-3 
          transition-all duration-300 hover:shadow-sm hover:border-blue-100 
          cursor-pointer animate-fade-in-up
        `}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBgColor}`}>
              <Icon className={`${iconColor}`} size={18} />
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-800">{transaction.title}</h3>
              <p className="text-sm text-gray-500">{transaction.recipient}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-semibold ${amountColor}`}>
              {amountPrefix}${transaction.amount.toFixed(2)}
            </p>
            <div className="flex items-center text-xs text-gray-500 justify-end">
              <Clock size={12} className="mr-1" />
              <span>{transaction.date} · {transaction.time}</span>
            </div>
          </div>
        </div>
        {isPending && (
          <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
            <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full border border-yellow-100">
              Pending
            </span>
            <button className="text-xs text-blue-600 hover:text-blue-800 transition-colors">
              Track
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header with subtle gradient */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-6 px-4 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Transaction History</h1>
          <p className="text-blue-100 opacity-90">View and manage your payment activities</p>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Search and filters card */}
        <div className="bg-white rounded-xl shadow-xs p-4 mb-6 border border-gray-100 transition-all duration-300 hover:shadow-sm">
          <div className="relative flex items-center border rounded-lg px-3 py-2 mb-4 bg-gray-50 transition-colors focus-within:border-blue-500 focus-within:bg-blue-50/10">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search transactions..."
              className="ml-2 flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex flex-wrap gap-2">
              <button 
                className={`px-3 py-1 text-sm rounded-full flex items-center transition-colors ${
                  filterType === 'all' 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setFilterType('all')}
              >
                All
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-full flex items-center transition-colors ${
                  filterType === 'incoming' 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setFilterType('incoming')}
              >
                Incoming
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-full flex items-center transition-colors ${
                  filterType === 'outgoing' 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setFilterType('outgoing')}
              >
                Outgoing
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-full flex items-center transition-colors ${
                  filterType === 'pending' 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setFilterType('pending')}
              >
                Pending
              </button>
            </div>
            
            <div className="relative">
              <button 
                className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter size={16} className="mr-1" />
                More Filters
                <ChevronDown size={16} className={`ml-1 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {filterOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-100 p-4 w-72 z-10 animate-fade-in">
                  <div className="mb-3">
                    <label className="text-sm font-medium text-gray-700 block mb-1">Date Range</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                        <Calendar size={14} className="text-gray-400 mr-2" />
                        <input 
                          type="date" 
                          className="flex-grow bg-transparent outline-none text-gray-700 text-sm"
                          value={dateRange.start}
                          onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                        />
                      </div>
                      <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                        <Calendar size={14} className="text-gray-400 mr-2" />
                        <input 
                          type="date" 
                          className="flex-grow bg-transparent outline-none text-gray-700 text-sm"
                          value={dateRange.end}
                          onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="text-sm font-medium text-gray-700 block mb-1">Amount Range</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="number" 
                        placeholder="Min"
                        className="border rounded-lg px-3 py-2 bg-gray-50 outline-none text-gray-700 text-sm"
                        value={amountRange.min}
                        onChange={(e) => setAmountRange({...amountRange, min: e.target.value})}
                      />
                      <input 
                        type="number" 
                        placeholder="Max"
                        className="border rounded-lg px-3 py-2 bg-gray-50 outline-none text-gray-700 text-sm"
                        value={amountRange.max}
                        onChange={(e) => setAmountRange({...amountRange, max: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button 
                      className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg transition-colors"
                      onClick={resetFilters}
                    >
                      Reset
                    </button>
                    <button 
                      className="bg-blue-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={() => setFilterOpen(false)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Transactions list */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h2 className="font-semibold text-gray-700">
              {filteredTransactions.length} {filteredTransactions.length === 1 ? 'Transaction' : 'Transactions'}
            </h2>
            <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors">
              <Download size={16} className="mr-1" />
              Export as CSV
            </button>
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              <p className="mt-4 text-gray-500">Loading your transactions...</p>
            </div>
          ) : filteredTransactions.length > 0 ? (
            <div className="space-y-3">
              {filteredTransactions.map((transaction, index) => (
                <TransactionCard 
                  key={transaction.id} 
                  transaction={transaction}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center border border-gray-100 animate-fade-in">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                <CreditCard size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">No transactions found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
              <button 
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                onClick={resetFilters}
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
        
        {/* Pagination - only show if there are enough transactions */}
        {filteredTransactions.length > 5 && !isLoading && (
          <div className="flex justify-center mt-6">
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-l-lg text-gray-600 hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 border border-blue-600 text-white hover:bg-blue-700 transition-colors">
              1
            </button>
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
              3
            </button>
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-r-lg text-gray-600 hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}