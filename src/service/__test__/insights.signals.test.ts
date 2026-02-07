import { describe, it, expect } from "vitest";
import { computeInsightSignals } from "../insights";

describe("computeInsightSignals", () => {
  it("computes engagement and post deltas correctly", () => {
    const signals = computeInsightSignals(
      {
        engagement: 200,
        postCount: 4,
        engagementRate: 4,
      },
      {
        engagement: 100,
        postCount: 4,
        engagementRate: 2,
      }
    );

    expect(signals.engagementChangePercent).toBe(100);
    expect(signals.postCountChange).toBe(0);
    expect(signals.engagementRateChange).toBe(2);
    expect(signals.isActive).toBe(true);
    expect(signals.wasActiveBefore).toBe(true);
  });

  it("handles zero previous engagement safely", () => {
    const signals = computeInsightSignals(
      {
        engagement: 100,
        postCount: 2,
        engagementRate: 2,
      },
      {
        engagement: 0,
        postCount: 0,
        engagementRate: 0,
      }
    );

    expect(signals.engagementChangePercent).toBe(100);
    expect(signals.wasActiveBefore).toBe(false);
  });
});
