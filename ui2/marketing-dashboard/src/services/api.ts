import axios from 'axios';
import { useAuth } from '@clerk/clerk-react'; // or your Clerk hook
import {
  Campaign,
  CampaignAnalytics,
  ComparisonResult,
  CreateCampaignPayload,
  CreatePostPayload,
  InsightResponse,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL

// Create axios instance without auth headers (we'll add them per request)
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to get auth token
let getTokenFunction: (() => Promise<string | null>) | null = null;

export const setAuthToken = (getToken: () => Promise<string | null>) => {
  getTokenFunction = getToken;
};

// Add request interceptor to include auth token
api.interceptors.request.use(
  async (config) => {
    if (getTokenFunction) {
      const token = await getTokenFunction();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const campaignService = {
  // Create a new campaign
  createCampaign: async (data: CreateCampaignPayload): Promise<{ message: string; campaign: Campaign }> => {
    const response = await api.post('/campaign/create', data);
    return response.data;
  },

  // Get all campaigns
  getAllCampaigns: async (): Promise<Campaign[]> => {
    const response = await api.get('/campaign/all');
    return response.data;
  },

  // Create a post for a campaign
  createPost: async (campaignId: number, data: CreatePostPayload): Promise<void> => {
    await api.post(`/campaign/${campaignId}/post`, data);
  },

  // Get campaign analytics
  getAnalytics: async (
    campaignId: number,
    from?: string,
    to?: string
  ): Promise<CampaignAnalytics & { range: { from: string | null; to: string | null } }> => {
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    const response = await api.get(`/campaign/${campaignId}/analytics?${params.toString()}`);
    return response.data;
  },

  // Compare two campaigns
  compareCampaigns: async (
    campaignAId: number,
    campaignBId: number,
    from?: string,
    to?: string
  ): Promise<ComparisonResult> => {
    const params = new URLSearchParams({
      campaignA: campaignAId.toString(),
      campaignB: campaignBId.toString(),
    });
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    const response = await api.get(`/campaign/compare?${params.toString()}`);
    return response.data;
  },

  // Get campaign insights
  getInsights: async (
    campaignId: number,
    from?: string,
    to?: string
  ): Promise<InsightResponse> => {
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    const response = await api.get(`/campaign/${campaignId}/insight?${params.toString()}`);
    return response.data;
  },
};

export default api;