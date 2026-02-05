export interface Campaign {
  id: number;
  name: string;
  budget: number;
  createdAt: string;
  postCount: number;
}

export interface Analytics {
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

