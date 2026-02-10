"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const insights_1 = require("../insights");
function baseSignals(overrides = {}) {
    return {
        engagementChangePercent: 0,
        postCountChange: 0,
        engagementPerPostChangePercent: 0,
        engagementRateChange: 0,
        isActive: true,
        wasActiveBefore: true,
        current: {
            engagement: 100,
            postCount: 2,
            engagementRate: 2,
        },
        previous: {
            engagement: 100,
            postCount: 2,
            engagementRate: 2,
        },
        ...overrides,
    };
}
(0, vitest_1.describe)("generateInsights", () => {
    (0, vitest_1.it)("flags significant engagement drop", () => {
        const insights = (0, insights_1.generateInsights)(baseSignals({ engagementChangePercent: -25 }));
        (0, vitest_1.expect)(insights[0].type).toBe("warning");
        (0, vitest_1.expect)(insights[0].confidence).toBe("high");
        (0, vitest_1.expect)(insights[0].basedOn).toContain("engagementChangePercent");
    });
    (0, vitest_1.it)("detects campaign inactivity", () => {
        const insights = (0, insights_1.generateInsights)(baseSignals({
            isActive: false,
            wasActiveBefore: true,
        }));
        (0, vitest_1.expect)(insights).toHaveLength(1);
        (0, vitest_1.expect)(insights[0].message).toMatch(/inactive/);
    });
    (0, vitest_1.it)("returns stability insight for minimal changes", () => {
        const insights = (0, insights_1.generateInsights)(baseSignals({
            engagementChangePercent: 2,
            postCountChange: 0,
        }));
        (0, vitest_1.expect)(insights[0].message).toMatch(/stable/);
    });
});
