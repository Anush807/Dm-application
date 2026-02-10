"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const campaign_1 = __importDefault(require("../../routes/campaign"));
vitest_1.vi.mock("../../services/analytics", () => ({
    computeCampaignAnalytics: vitest_1.vi.fn()
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
const app = (0, express_1.default)();
app.use("/campaign", campaign_1.default);
(0, vitest_1.describe)("GET /campaign/:id/analytics", () => {
    (0, vitest_1.it)("returns analytics with insights", async () => {
        const res = await (0, supertest_1.default)(app).get("/campaign/1/analytics?from=2026-02-01&to=2026-02-07");
        (0, vitest_1.expect)(res.status).toBe(200);
        (0, vitest_1.expect)(res.body.analytics).toBeDefined();
        (0, vitest_1.expect)(res.body.insights).toBeInstanceOf(Array);
    });
});
