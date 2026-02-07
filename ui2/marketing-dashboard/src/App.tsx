import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CampaignDetails from './pages/CampaignDetails';
import CompareCampaigns from './pages/CompareCampaigns';
import { BarChart3, GitCompare } from 'lucide-react';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center gap-2">
                <BarChart3 className="w-8 h-8 text-primary-600" />
                <span className="text-xl font-bold text-gray-900">MarketingHub</span>
              </Link>
              <div className="flex items-center gap-4">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/compare"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <GitCompare className="w-4 h-4" />
                  Compare
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/campaign/:id" element={<CampaignDetails />} />
          <Route path="/compare" element={<CompareCampaigns />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
