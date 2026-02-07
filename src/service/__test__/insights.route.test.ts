import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import express from "express";
import campaignRoutes from "../../routes/campaign";

vi.mock("../../services/analytics", () => ({
  computeCampaignAnalytics: vi.fn()
    .mockResolvedValueOnce({
      id: 1,
      name: "Test Campaign",
      budget: 1000,
      postCount: 2,
      totalEngagement: 80,
      engagementRate: 8,
      bestPost: null,
    })
    .mockResolvedValueOnce({
      id: 1,
      name: "Test Campaign",
      budget: 1000,
      postCount: 2,
      totalEngagement: 120,
      engagementRate: 12,
      bestPost: null,
    }),
}));

const app = express();
app.use("/campaign", campaignRoutes);

describe("GET /campaign/:id/analytics", () => {
  it("returns analytics with insights", async () => {
    const res = await request(app).get(
      "/campaign/1/analytics?from=2026-02-01&to=2026-02-07"
    );

    expect(res.status).toBe(200);
    expect(res.body.analytics).toBeDefined();
    expect(res.body.insights).toBeInstanceOf(Array);
  });
});
