import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaigns, useCampaignComparison } from '../hooks/useCampaigns';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import StatCard from '../components/StatCard';
import {
  ArrowLeft,
  TrendingUp,
  Heart,
  FileText,
  Trophy,
  Calendar,
  GitCompare,
} from 'lucide-react';
import { formatNumber, formatPercentage } from '../utils/formatters';

const CompareCampaigns: React.FC = () => {
  const navigate = useNavigate();
  const { campaigns } = useCampaigns();
  const [campaignAId, setCampaignAId] = useState<number | null>(null);
  const [campaignBId, setCampaignBId] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>({});

  // Ensure campaigns is an array
  const campaignsList = Array.isArray(campaigns) ? campaigns : [];

  const { comparison, loading, error } = useCampaignComparison(
    campaignAId,
    campaignBId,
    dateRange.from,
    dateRange.to
  );

  const handleCompare = () => {
    if (campaignAId && campaignBId && campaignAId !== campaignBId) {
      // Trigger comparison by updating state
    }
  };

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
          <div className="flex items-center gap-3">
            <GitCompare className="w-8 h-8 text-primary-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Compare Campaigns</h1>
              <p className="text-gray-600 mt-1">Side-by-side campaign performance comparison</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Selection Panel */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Campaigns to Compare</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign A
              </label>
              <select
                value={campaignAId || ''}
                onChange={(e) => setCampaignAId(Number(e.target.value) || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select a campaign</option>
                {campaignsList.map((campaign) => (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign B
              </label>
              <select
                value={campaignBId || ''}
                onChange={(e) => setCampaignBId(Number(e.target.value) || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select a campaign</option>
                {campaignsList.map((campaign) => (
                  <option
                    key={campaign.id}
                    value={campaign.id}
                    disabled={campaign.id === campaignAId}
                  >
                    {campaign.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Range */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Date Range (Optional):</span>
            </div>
            <input
              type="date"
              value={dateRange.from || ''}
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={dateRange.to || ''}
              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {campaignAId === campaignBId && campaignAId !== null && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <p className="text-yellow-800 text-sm">Please select two different campaigns to compare.</p>
            </div>
          )}
        </div>

        {/* Comparison Results */}
        {loading ? (
          <LoadingSpinner size="lg" text="Comparing campaigns..." />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : comparison ? (
          <div className="space-y-8">
            {/* Winner Announcement */}
            {comparison.comparison.winnerByEngagement && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Trophy className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Comparison Results</h3>
                    <p className="text-gray-700">
                      <span className="font-semibold text-green-700">
                        {comparison.comparison.winnerByEngagement === 'campaignA'
                          ? comparison.campaignA.campaignName
                          : comparison.campaignB.campaignName}
                      </span>{' '}
                      has higher total engagement
                      {comparison.comparison.engagementDiffPercent !== null && (
                        <span className="ml-1">
                          ({formatPercentage(Math.abs(comparison.comparison.engagementDiffPercent))} difference)
                        </span>
                      )}
                    </p>
                    {comparison.comparison.winnerByEngagementRate && (
                      <p className="text-gray-700 mt-1">
                        <span className="font-semibold text-green-700">
                          {comparison.comparison.winnerByEngagementRate === 'campaignA'
                            ? comparison.campaignA.campaignName
                            : comparison.campaignB.campaignName}
                        </span>{' '}
                        has better engagement rate
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            {comparison.comparison.notes.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-900 mb-2">Notes:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {comparison.comparison.notes.map((note, index) => (
                    <li key={index} className="text-yellow-800 text-sm">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Side-by-Side Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Campaign A */}
              <div className="bg-white rounded-lg shadow-sm border-2 border-primary-300 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {comparison.campaignA.campaignName}
                  </h3>
                  {comparison.comparison.winnerByEngagement === 'campaignA' && (
                    <Trophy className="w-6 h-6 text-yellow-500" />
                  )}
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Total Engagement
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formatNumber(comparison.campaignA.totalEngagement)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Engagement Rate
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formatPercentage(comparison.campaignA.engagementRate)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Posts
                    </span>
                    <span className="font-semibold text-gray-900">
                      {comparison.campaignA.postCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Campaign B */}
              <div className="bg-white rounded-lg shadow-sm border-2 border-gray-300 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {comparison.campaignB.campaignName}
                  </h3>
                  {comparison.comparison.winnerByEngagement === 'campaignB' && (
                    <Trophy className="w-6 h-6 text-yellow-500" />
                  )}
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Total Engagement
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formatNumber(comparison.campaignB.totalEngagement)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Engagement Rate
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formatPercentage(comparison.campaignB.engagementRate)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Posts
                    </span>
                    <span className="font-semibold text-gray-900">
                      {comparison.campaignB.postCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <GitCompare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              Select two campaigns above to see a detailed comparison
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareCampaigns;
