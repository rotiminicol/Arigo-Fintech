import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "./components/common/LoadingSpinner";
import Sidebar from "./components/common/Sidebar";

// Page imports
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import Verification from "./pages/Verification";
import LandingPage from "./pages/LandingPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import TransactionsHistory from "./pages/TransactionsHistory";
import Transfers from "./pages/Transfers";
import Bills from "./pages/Bills";
import Savings from "./pages/Savings";
import SchoolFees from "./pages/SchoolFees";
import International from "./pages/InternationalTransfer";
import Loans from "./pages/Loans";
import Investments from "./pages/Investment";
import Cards from "./pages/Card";
import Security from "./pages/Security";
import Settings from "./pages/Setting";
import WelcomePage from "./pages/auth/Welcome";

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 to-blue-700">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Sidebar - Only rendered for authenticated users */}
      {authUser && <Sidebar />}
      
      {/* Main Content Area - Adjusted for sidebar presence */}
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${authUser ? 'md:ml-80' : ''}`}>
        <div className="min-h-screen max-w-8xl mx-auto"> 
          <Routes>
            {/* Public landing page */}
            <Route path="/landing" element={<LandingPage />} />
            
            {/* Default route redirects based on authentication */}
            <Route 
              path="/" 
              element={authUser ? <Navigate to="/dashboard" /> : <Navigate to="/landing" />} 
            />
            
            {/* Protected routes for authenticated users */}
            <Route
              path="/dashboard"
              element={authUser ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route 
              path="/transaction-history" 
              element={authUser ? <TransactionsHistory /> : <Navigate to="/login" />} 
            />
            <Route
              path="/transfers"
              element={authUser ? <Transfers /> : <Navigate to="/login" />}
            />
            <Route
              path="/payments"
              element={authUser ? <Bills /> : <Navigate to="/login" />}
            />
            <Route
              path="/school-fees"
              element={authUser ? <SchoolFees /> : <Navigate to="/login" />}
            />
            <Route
              path="/international"
              element={authUser ? <International /> : <Navigate to="/login" />}
            />
            <Route
              path="/loans"
              element={authUser ? <Loans /> : <Navigate to="/login" />}
            />
            <Route
              path="/savings"
              element={authUser ? <Savings /> : <Navigate to="/login" />}
            />
            <Route
              path="/investments"
              element={authUser ? <Investments /> : <Navigate to="/login" />}
            />
            <Route
              path="/cards"
              element={authUser ? <Cards /> : <Navigate to="/login" />}
            />
            <Route
              path="/security"
              element={authUser ? <Security /> : <Navigate to="/login" />}
            />
            <Route
              path="/settings"
              element={authUser ? <Settings /> : <Navigate to="/login" />}
            />
            <Route
              path="/verification"
              element={authUser ? <Verification /> : <Navigate to="/login" />}
            />
             <Route
              path="/welcome"
              element={authUser ? <WelcomePage /> : <Navigate to="/login" />}
            />

            {/* Public routes for authentication */}
            <Route
              path="/login"
              element={!authUser ? <LoginPage /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/signup"
              element={!authUser ? <SignUpPage /> : <Navigate to="/verification" />}
            />
            <Route
              path="/forgot-password"
              element={!authUser ? <ForgotPasswordPage /> : <Navigate to="/dashboard" />}
            />
          </Routes>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;