import "dotenv/config";
import { prisma } from '../../lib/prisma'
import express from "express";
import { createCampaignSchema, createPostSchema } from "../vlaidation/index"
import { computeCampaignAnalytics } from "../service/analytics";
import {
  computeInsightSignals,
  generateInsights,
} from "../service/insights";

const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        const { name, budget } = createCampaignSchema.parse(req.body);

        const campaign = await prisma.campaign.create({
            data: { name, budget }
        })
        res.json({
            message:
                "Campaign created successfully",
            campaign
        })
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
})

router.get("/all", async (_req, res) => {
    try {
        const campaigns = await prisma.campaign.findMany({
            include: {
                _count: {
                    select: { posts: true },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const response = campaigns.map(c => ({
            id: c.id,
            name: c.name,
            budget: c.budget,
            createdAt: c.createdAt,
            postCount: c._count.posts,
        }));
        res.json( response );
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch campaigns" });
    }
});

router.post("/:campaignId/post", async (req, res) => {
    const { campaignId } = req.params;
    try {
        const data = createPostSchema.parse(req.body);
        if(!campaignId){
            return res.status(400).json({ error: "Campaign ID is required" });
        }
        console.log(data, campaignId)

        const post  = await prisma.post.create({
            data:{
                ...data,
                campaignId: parseInt(campaignId)
            }
        })
        res.status(201).json({ message: "Post created successfully", post });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Failed to create post" });
    }
});

router.get("/:campaignId/analytics", async (req, res) => {
  try {
    const campaignId = Number(req.params.campaignId);

    if (isNaN(campaignId)) {
      return res.status(400).json({ message: "Invalid campaign id" });
    }

    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      include: { posts: true },
    });

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    let totalEngagement = 0;
    let bestPost: { postId: number; engagement: number } | null = null;

    for (const post of campaign.posts) {
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

    const analytics = {
      campaignId: campaign.id,
      campaignName: campaign.name,
      budget: campaign.budget,
      totalEngagement,
      engagementRate,
      postCount: campaign.posts.length,
      bestPost,
    };

    res.json(analytics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to compute analytics" });
  }
});

router.get("/:campaignId/analytics", async (req, res) => {
  try {
    const campaignId = Number(req.params.campaignId);
    if (isNaN(campaignId)) {
      return res.status(400).json({ message: "Invalid campaign id" });
    }

    const { from, to } = req.query;

    const range = {
      from: from ? new Date(from as string) : undefined,
      to: to ? new Date(to as string) : undefined,
    };

    const analytics = await computeCampaignAnalytics(campaignId, range);
    res.json({
      range: {
        from: from || null,
        to: to || null,
      },
      ...analytics,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/compare", async (req, res) => {
  try {
    const { campaignA, campaignB, from, to } = req.query;

    const campaignAId = Number(campaignA);
    const campaignBId = Number(campaignB);

    // Basic validation
    if (
      isNaN(campaignAId) ||
      isNaN(campaignBId)
    ) {
      return res.status(400).json({
        message: "campaignA and campaignB must be valid numbers",
      });
    }

    if (campaignAId === campaignBId) {
      return res.status(400).json({
        message: "Cannot compare the same campaign",
      });
    }

    // Parse date range
    const range = {
      from: from ? new Date(from as string) : undefined,
      to: to ? new Date(to as string) : undefined,
    };

    if (
      (range.from && isNaN(range.from.getTime())) ||
      (range.to && isNaN(range.to.getTime()))
    ) {
      return res.status(400).json({
        message: "Invalid date format",
      });
    }

    if (
      range.from &&
      range.to &&
      range.from > range.to
    ) {
      return res.status(400).json({
        message: "`from` date must be before `to` date",
      });
    }

    // Compute analytics for both campaigns
    const [analyticsA, analyticsB] =
      await Promise.all([
        computeCampaignAnalytics(campaignAId, range),
        computeCampaignAnalytics(campaignBId, range),
      ]);

    // Comparison logic
    let winnerByEngagement: "campaignA" | "campaignB" | null = null;
    let winnerByEngagementRate: "campaignA" | "campaignB" | null = null;

    if (analyticsA.totalEngagement !== analyticsB.totalEngagement) {
      winnerByEngagement =
        analyticsA.totalEngagement > analyticsB.totalEngagement
          ? "campaignA"
          : "campaignB";
    }

    if (analyticsA.engagementRate !== analyticsB.engagementRate) {
      winnerByEngagementRate =
        analyticsA.engagementRate > analyticsB.engagementRate
          ? "campaignA"
          : "campaignB";
    }

    // Engagement difference percentage
    let engagementDiffPercent: number | null = null;

    if (
      analyticsA.totalEngagement === 0 &&
      analyticsB.totalEngagement === 0
    ) {
      engagementDiffPercent = null;
    } else if (analyticsB.totalEngagement === 0) {
      engagementDiffPercent = 100;
    } else {
      engagementDiffPercent = Number(
        (
          ((analyticsA.totalEngagement -
            analyticsB.totalEngagement) /
            analyticsB.totalEngagement) *
          100
        ).toFixed(2)
      );
    }

    // Notes for edge cases
    const notes: string[] = [];

    if (analyticsA.postCount === 0) {
      notes.push("Campaign A has no posts in selected range");
    }

    if (analyticsB.postCount === 0) {
      notes.push("Campaign B has no posts in selected range");
    }

    if (
      analyticsA.postCount === 0 &&
      analyticsB.postCount === 0
    ) {
      notes.push("Both campaigns have no activity in selected range");
    }

    // Final response
    res.json({
      range: {
        from: from || null,
        to: to || null,
      },
      campaignA: analyticsA,
      campaignB: analyticsB,
      comparison: {
        winnerByEngagement,
        winnerByEngagementRate,
        engagementDiffPercent,
        notes,
      },
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Failed to compare campaigns",
    });
  }
});

router.get("/:campaignId/insight", async (req, res) => {
  try {
    const campaignId = Number(req.params.campaignId);

    if (isNaN(campaignId)) {
      return res.status(400).json({ message: "Invalid campaign id" });
    }

    const { from, to } = req.query;

    const currentRange = {
      from: from ? new Date(from as string) : undefined,
      to: to ? new Date(to as string) : undefined,
    };

    if (
      (currentRange.from && isNaN(currentRange.from.getTime())) ||
      (currentRange.to && isNaN(currentRange.to.getTime()))
    ) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    // 1. Compute current analytics
    const currentAnalytics =
      await computeCampaignAnalytics(campaignId, currentRange);

    let insights: string[] = [];

    // 2. Compute insights only if date range exists
    if (currentRange.from && currentRange.to) {
      const durationMs =
        currentRange.to.getTime() - currentRange.from.getTime();

      const previousRange = {
        from: new Date(currentRange.from.getTime() - durationMs),
        to: currentRange.from,
      };

      // 3. Compute previous analytics
      const previousAnalytics =
        await computeCampaignAnalytics(campaignId, previousRange);

      // 4. Build insight signals
      const signals = computeInsightSignals(
        {
          engagement: currentAnalytics.totalEngagement,
          postCount: currentAnalytics.postCount,
          engagementRate: currentAnalytics.engagementRate,
        },
        {
          engagement: previousAnalytics.totalEngagement,
          postCount: previousAnalytics.postCount,
          engagementRate: previousAnalytics.engagementRate,
        }
      );

      // 5. Generate insights
      insights = generateInsights(signals).map(insight => insight.message ?? insight.toString());
    }

    // 6. Response
    res.json({
      range: {
        from: from || null,
        to: to || null,
      },
      analytics: currentAnalytics,
      insights,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch campaign analytics",
    });
  }
});


export default router;