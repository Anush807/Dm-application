import "dotenv/config";
import { prisma } from '../../lib/prisma'
import express from "express";
import { createCampaignSchema, createPostSchema } from "../vlaidation/index"

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
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch campaign" });
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

    // 3. Build response
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


export default router;