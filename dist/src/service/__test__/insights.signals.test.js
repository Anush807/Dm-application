"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const insights_1 = require("../insights");
(0, vitest_1.describe)("computeInsightSignals", () => {
    (0, vitest_1.it)("computes engagement and post deltas correctly", () => {
        const signals = (0, insights_1.computeInsightSignals)({
            engagement: 200,
            postCount: 4,
            engagementRate: 4,
        }, {
            engagement: 100,
            postCount: 4,
            engagementRate: 2,
        });
        (0, vitest_1.expect)(signals.engagementChangePercent).toBe(100);
        (0, vitest_1.expect)(signals.postCountChange).toBe(0);
        (0, vitest_1.expect)(signals.engagementRateChange).toBe(2);
        (0, vitest_1.expect)(signals.isActive).toBe(true);
        (0, vitest_1.expect)(signals.wasActiveBefore).toBe(true);
    });
    (0, vitest_1.it)("handles zero previous engagement safely", () => {
        const signals = (0, insights_1.computeInsightSignals)({
            engagement: 100,
            postCount: 2,
            engagementRate: 2,
        }, {
            engagement: 0,
            postCount: 0,
            engagementRate: 0,
        });
        (0, vitest_1.expect)(signals.engagementChangePercent).toBe(100);
        (0, vitest_1.expect)(signals.wasActiveBefore).toBe(false);
    });
});
