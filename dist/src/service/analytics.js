"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeCampaignAnalytics = computeCampaignAnalytics;
const prisma_1 = require("../../lib/prisma");
async function computeCampaignAnalytics(campaignId, range = {}) {
    const campaign = await prisma_1.prisma.campaign.findUnique({
        where: { id: campaignId },
    });
    if (!campaign) {
        throw new Error("Campaign not found");
    }
    const dateFilter = {};
    if (range.from || range.to) {
        dateFilter.createdAt = {};
        if (range.from)
            dateFilter.createdAt.gte = range.from;
        if (range.to)
            dateFilter.createdAt.lte = range.to;
    }
    const posts = await prisma_1.prisma.post.findMany({
        where: {
            campaignId,
            ...dateFilter,
        },
    });
    let totalEngagement = 0;
    let bestPost = null;
    for (const post of posts) {
        const engagement = post.likes +
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
    const engagementRate = campaign.budget > 0
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
