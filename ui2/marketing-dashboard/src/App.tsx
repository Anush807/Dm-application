import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import Dashboard from './pages/Dashboard';
import CampaignDetails from './pages/CampaignDetails';
import CompareCampaigns from './pages/CompareCampaigns';
import { BarChart3, GitCompare } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import { setAuthToken } from './services/api';
import { useEffect } from 'react';

function App() {

  const { getToken } = useAuth();

  useEffect(() => {
    setAuthToken(getToken);
  }, [getToken]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Left side - Logo and nav links */}
              <div className="flex items-center space-x-8">
                <Link to="/" className="flex items-center space-x-2">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  <span className="text-xl font-bold text-gray-900">TYM</span>
                </Link>
                
                {/* Only show navigation links when signed in */}
                <SignedIn>
                  <div className="flex space-x-4">
                    <Link
                      to="/"
                      className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to="/compare"
                      className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    >
                      <GitCompare className="w-4 h-4" />
                      <span>Compare</span>
                    </Link>
                  </div>
                </SignedIn>
              </div>

              {/* Right side - Auth buttons */}
              <div className="flex items-center space-x-4">
                {/* Show sign-in and sign-up buttons when signed out */}
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                      Sign Up
                    </button>
                  </SignUpButton>
                </SignedOut>
                
                {/* Show user button when signed in */}
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes - Protected by Clerk */}
        <SignedIn>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/campaign/:id" element={<CampaignDetails />} />
            <Route path="/compare" element={<CompareCampaigns />} />
          </Routes>
        </SignedIn>

        {/* Landing page for signed out users */}
        <SignedOut>
          <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to MarketingHub
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Sign in to access your marketing campaigns and analytics
              </p>
              <div className="flex justify-center space-x-4">
                <SignInButton mode="modal">
                  <button className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    Get Started
                  </button>
                </SignUpButton>
              </div>
            </div>
          </div>
        </SignedOut>
      </div>
    </BrowserRouter>
  );
}

export default App;