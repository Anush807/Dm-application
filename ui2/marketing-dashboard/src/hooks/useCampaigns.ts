import { useState, useEffect, useCallback } from 'react';
import { campaignService } from '../services/api';
import { Campaign, CampaignAnalytics, ComparisonResult, InsightResponse } from '../types';

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await campaignService.getAllCampaigns();
      // Ensure we always set an array
      setCampaigns(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch campaigns');
      setCampaigns([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  return { campaigns, loading, error, refetch: fetchCampaigns };
};

export const useCampaignAnalytics = (
  campaignId: number | null,
  from?: string,
  to?: string
) => {
  const [analytics, setAnalytics] = useState<CampaignAnalytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    if (!campaignId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await campaignService.getAnalytics(campaignId, from, to);
      setAnalytics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  }, [campaignId, from, to]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return { analytics, loading, error, refetch: fetchAnalytics };
};

export const useCampaignComparison = (
  campaignAId: number | null,
  campaignBId: number | null,
  from?: string,
  to?: string
) => {
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComparison = useCallback(async () => {
    if (!campaignAId || !campaignBId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await campaignService.compareCampaigns(campaignAId, campaignBId, from, to);
      setComparison(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to compare campaigns');
    } finally {
      setLoading(false);
    }
  }, [campaignAId, campaignBId, from, to]);

  useEffect(() => {
    fetchComparison();
  }, [fetchComparison]);

  return { comparison, loading, error, refetch: fetchComparison };
};

export const useCampaignInsights = (
  campaignId: number | null,
  from?: string,
  to?: string
) => {
  const [insights, setInsights] = useState<InsightResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = useCallback(async () => {
    if (!campaignId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await campaignService.getInsights(campaignId, from, to);
      setInsights(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch insights');
    } finally {
      setLoading(false);
    }
  }, [campaignId, from, to]);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  return { insights, loading, error, refetch: fetchInsights };
};
