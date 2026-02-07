import { describe, it, expect } from "vitest";
import { generateInsights } from "../insights";
import type { InsightSignals } from "../insights";

function baseSignals(overrides: Partial<InsightSignals> = {}): InsightSignals {
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

describe("generateInsights", () => {
  it("flags significant engagement drop", () => {
    const insights = generateInsights(
      baseSignals({ engagementChangePercent: -25 })
    );

    expect(insights[0].type).toBe("warning");
    expect(insights[0].confidence).toBe("high");
    expect(insights[0].basedOn).toContain("engagementChangePercent");
  });

  it("detects campaign inactivity", () => {
    const insights = generateInsights(
      baseSignals({
        isActive: false,
        wasActiveBefore: true,
      })
    );

    expect(insights).toHaveLength(1);
    expect(insights[0].message).toMatch(/inactive/);
  });

  it("returns stability insight for minimal changes", () => {
    const insights = generateInsights(
      baseSignals({
        engagementChangePercent: 2,
        postCountChange: 0,
      })
    );

    expect(insights[0].message).toMatch(/stable/);
  });
});
