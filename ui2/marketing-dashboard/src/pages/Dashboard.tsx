import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaigns } from '../hooks/useCampaigns';
import CampaignCard from '../components/CampaignCard';
import CreateCampaignModal from '../components/CreateCampaignModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import StatCard from '../components/StatCard';
import { Plus, TrendingUp, DollarSign, FileText, BarChart3 } from 'lucide-react';
import { formatCurrency, formatNumber } from '../utils/formatters';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { campaigns, loading, error, refetch } = useCampaigns();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ensure campaigns is an array before using reduce
  const campaignsList = Array.isArray(campaigns) ? campaigns : [];
  
  const totalBudget = campaignsList.reduce((sum, c) => sum + c.budget, 0);
  const totalPosts = campaignsList.reduce((sum, c) => sum + c.postCount, 0);
  const avgBudget = campaignsList.length > 0 ? totalBudget / campaignsList.length : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" text="Loading campaigns..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Marketing Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage and analyze your campaigns</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Create Campaign
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Campaigns"
            value={campaignsList.length}
            icon={BarChart3}
            iconColor="text-primary-600"
            iconBgColor="bg-primary-50"
          />
          <StatCard
            title="Total Budget"
            value={formatCurrency(totalBudget)}
            icon={DollarSign}
            iconColor="text-green-600"
            iconBgColor="bg-green-50"
          />
          <StatCard
            title="Total Posts"
            value={formatNumber(totalPosts)}
            icon={FileText}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-50"
          />
          <StatCard
            title="Avg Budget"
            value={formatCurrency(avgBudget)}
            icon={TrendingUp}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-50"
          />
        </div>

        {/* Campaigns Grid */}
        {campaignsList.length === 0 ? (
          <EmptyState
            icon={BarChart3}
            title="No campaigns yet"
            description="Get started by creating your first marketing campaign. Track performance, analyze engagement, and optimize your strategy."
            action={{
              label: 'Create Your First Campaign',
              onClick: () => setIsModalOpen(true),
            }}
          />
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                All Campaigns ({campaignsList.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaignsList.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  onClick={() => navigate(`/campaign/${campaign.id}`)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Create Campaign Modal */}
      <CreateCampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={refetch}
      />
    </div>
  );
};

export default Dashboard;
