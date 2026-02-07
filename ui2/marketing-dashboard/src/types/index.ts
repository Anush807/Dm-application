export interface Campaign {
  id: number;
  name: string;
  budget: number;
  createdAt: string;
  postCount: number;
}

export interface Post {
  id: number;
  campaignId: number;
  platform: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  postedAt: string;
}

export interface CampaignAnalytics {
  campaignId: number;
  campaignName: string;
  budget: number;
  totalEngagement: number;
  engagementRate: number;
  postCount: number;
  bestPost: {
    postId: number;
    engagement: number;
  } | null;
}

export interface ComparisonResult {
  range: {
    from: string | null;
    to: string | null;
  };
  campaignA: CampaignAnalytics;
  campaignB: CampaignAnalytics;
  comparison: {
    winnerByEngagement: 'campaignA' | 'campaignB' | null;
    winnerByEngagementRate: 'campaignA' | 'campaignB' | null;
    engagementDiffPercent: number | null;
    notes: string[];
  };
}

export interface InsightResponse {
  range: {
    from: string | null;
    to: string | null;
  };
  analytics: CampaignAnalytics;
  insights: string[];
}

export interface CreateCampaignPayload {
  name: string;
  budget: number;
}

export interface CreatePostPayload {
  platform: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  postedAt?: string; // Optional - backend will use default if not provided
}

export interface DateRange {
  from?: Date;
  to?: Date;
}
