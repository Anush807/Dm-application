import React from 'react';
import { Campaign } from '../types';
import { formatCurrency, formatDate } from '../utils/formatters';
import { Calendar, DollarSign, FileText, TrendingUp } from 'lucide-react';

interface CampaignCardProps {
  campaign: Campaign;
  onClick: () => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-primary-300 transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {campaign.name}
          </h3>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(campaign.createdAt)}</span>
          </div>
        </div>
        <div className="bg-primary-50 p-3 rounded-lg">
          <TrendingUp className="w-6 h-6 text-primary-600" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs font-medium">Budget</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(campaign.budget)}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <FileText className="w-4 h-4" />
            <span className="text-xs font-medium">Posts</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">{campaign.postCount}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="text-sm text-primary-600 font-medium hover:text-primary-700 transition-colors">
          View Analytics →
        </button>
      </div>
    </div>
  );
};

export default CampaignCard;
