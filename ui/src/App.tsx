import { useEffect, useState } from "react";

import CampaignForm from "./components/CampaignForm";
import CampaignList from "./components/CampaignList";
import PostForm from "./components/PostForm";
import Analytics from "./components/Analytics";

import { getCampaigns, getAnalytics } from "./api/campaign";
import type { Campaign, Analytics as AnalyticsType } from "./types/campaign";

export default function App() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(
    null
  );
  const [analytics, setAnalytics] = useState<AnalyticsType | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  // Fetch all campaigns
  const fetchCampaigns = async () => {
    const data = await getCampaigns();
    setCampaigns(data);
  };

  // Fetch analytics for selected campaign
  const fetchAnalytics = async (campaignId: number) => {
    try {
      setLoadingAnalytics(true);
      const data = await getAnalytics(campaignId);
      setAnalytics(data);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchCampaigns();
  }, []);

  // When campaign changes → load analytics
  useEffect(() => {
    if (selectedCampaignId !== null) {
      fetchAnalytics(selectedCampaignId);
    } else {
      setAnalytics(null);
    }
  }, [selectedCampaignId]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold">
          Social Media Campaign Tracker
        </h1>

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CampaignForm onCreated={fetchCampaigns} />
          <CampaignList
            campaigns={campaigns}
            selectedCampaignId={selectedCampaignId}
            onSelect={setSelectedCampaignId}
          />
        </div>

        {/* Bottom Section */}
        {selectedCampaignId && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PostForm
              campaignId={selectedCampaignId}
              onCreated={() => fetchAnalytics(selectedCampaignId)}
            />

            {loadingAnalytics ? (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-sm text-gray-500">
                  Loading analytics...
                </p>
              </div>
            ) : (
              <Analytics analytics={analytics} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
