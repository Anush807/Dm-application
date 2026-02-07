import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCampaignAnalytics, useCampaignInsights } from '../hooks/useCampaigns';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import StatCard from '../components/StatCard';
import EngagementChart from '../components/EngagementChart';
import CreatePostModal from '../components/CreatePostModal';
import {
  ArrowLeft,
  TrendingUp,
  DollarSign,
  FileText,
  Heart,
  Trophy,
  Calendar,
  Lightbulb,
  Plus,
} from 'lucide-react';
import { formatCurrency, formatNumber, formatPercentage } from '../utils/formatters';

const CampaignDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>({});
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const campaignId = id ? parseInt(id) : null;
  const { analytics, loading, error, refetch } = useCampaignAnalytics(
    campaignId,
    dateRange.from,
    dateRange.to
  );
  const {
    insights,
    loading: insightsLoading,
    error: insightsError,
  } = useCampaignInsights(campaignId, dateRange.from, dateRange.to);

  const handleDateRangeChange = (from: string, to: string) => {
    setDateRange({ from, to });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" text="Loading analytics..." />
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ErrorMessage message={error || 'Campaign not found'} onRetry={refetch} />
      </div>
    );
  }

  // Prepare chart data
  const chartData = [
    {
      name: 'Current Period',
      engagement: analytics.totalEngagement,
      posts: analytics.postCount,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{analytics.campaignName}</h1>
              <p className="text-gray-600 mt-1">Campaign Analytics & Insights</p>
            </div>
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Add Post
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Date Range Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Date Range:</span>
            </div>
            <input
              type="date"
              value={dateRange.from || ''}
              onChange={(e) => handleDateRangeChange(e.target.value, dateRange.to || '')}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="From"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={dateRange.to || ''}
              onChange={(e) => handleDateRangeChange(dateRange.from || '', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="To"
            />
            {(dateRange.from || dateRange.to) && (
              <button
                onClick={() => setDateRange({})}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Budget"
            value={formatCurrency(analytics.budget)}
            icon={DollarSign}
            iconColor="text-green-600"
            iconBgColor="bg-green-50"
          />
          <StatCard
            title="Total Engagement"
            value={formatNumber(analytics.totalEngagement)}
            icon={Heart}
            iconColor="text-red-600"
            iconBgColor="bg-red-50"
          />
          <StatCard
            title="Engagement Rate"
            value={formatPercentage(analytics.engagementRate)}
            icon={TrendingUp}
            iconColor="text-primary-600"
            iconBgColor="bg-primary-50"
          />
          <StatCard
            title="Total Posts"
            value={analytics.postCount}
            icon={FileText}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-50"
          />
        </div>

        {/* Best Post */}
        {analytics.bestPost && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Best Performing Post</h3>
                <p className="text-gray-700">
                  Post #{analytics.bestPost.postId} generated{' '}
                  <span className="font-semibold text-yellow-700">
                    {formatNumber(analytics.bestPost.engagement)}
                  </span>{' '}
                  total engagements
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Chart */}
        <div className="mb-8">
          <EngagementChart data={chartData} type="bar" />
        </div>

        {/* Insights */}
        {dateRange.from && dateRange.to && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-6 h-6 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
            </div>

            {insightsLoading ? (
              <LoadingSpinner size="sm" text="Generating insights..." />
            ) : insightsError ? (
              <p className="text-red-600 text-sm">{insightsError}</p>
            ) : insights && insights.insights.length > 0 ? (
              <div className="space-y-3">
                {insights.insights.map((insight, index) => (
                  <div key={index} className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                    <p className="text-gray-700">{insight}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                No insights available. Make sure you have data in both current and previous periods.
              </p>
            )}
          </div>
        )}

        {/* No Posts Warning */}
        {analytics.postCount === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
            <p className="text-yellow-800">
              This campaign has no posts yet. Analytics will be more meaningful once you add posts.
            </p>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        campaignId={campaignId!}
        campaignName={analytics.campaignName}
        onSuccess={refetch}
      />
    </div>
  );
};

export default CampaignDetails;
