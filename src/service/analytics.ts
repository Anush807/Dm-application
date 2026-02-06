import { prisma } from "../../lib/prisma";

interface DateRange {
  from?: Date;
  to?: Date;
}

export interface CampaignAnalytics {
  id: number;
  name: string;
  budget: number;
  postCount: number;
  totalEngagement: number;
  engagementRate: number;
  bestPost: {
    postId: number;
    engagement: number;
  } | null;
}

export async function computeCampaignAnalytics(
  campaignId: number,
  range: DateRange = {}
): Promise<CampaignAnalytics> {
  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
  });

  if (!campaign) {
    throw new Error("Campaign not found");
  }

  const dateFilter: any = {};

  if (range.from || range.to) {
    dateFilter.createdAt = {};
    if (range.from) dateFilter.createdAt.gte = range.from;
    if (range.to) dateFilter.createdAt.lte = range.to;
  }

  const posts = await prisma.post.findMany({
    where: {
      campaignId,
      ...dateFilter,
    },
  });

  let totalEngagement = 0;
  let bestPost: { postId: number; engagement: number } | null = null;

  for (const post of posts) {
    const engagement =
      post.likes +
      post.comments +
      post.shares +
      post.saves;

    totalEngagement += engagement;

    if (!bestPost || engagement > bestPost.engagement) {
      bestPost = {
        postId: post.id,
        engagement,
      };
    }
  }

  const engagementRate =
    campaign.budget > 0
      ? Number(((totalEngagement / campaign.budget) * 100).toFixed(2))
      : 0;

  return {
    id: campaign.id,
    name: campaign.name,
    budget: campaign.budget,
    postCount: posts.length,
    totalEngagement,
    engagementRate,
    bestPost,
  };
}
