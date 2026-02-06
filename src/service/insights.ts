export type InsightType = "positive" | "warning" | "neutral";

export interface Insight {
  type: InsightType;
  message: string;
}

export interface AnalyticsSnapshot {
  engagement: number;
  postCount: number;
  engagementRate: number;
}

export interface InsightSignals {
  engagementChangePercent: number;
  postCountChange: number;
  engagementPerPostChangePercent: number;
  engagementRateChange: number;

  current: AnalyticsSnapshot;
  previous: AnalyticsSnapshot;

  isActive: boolean;
  wasActiveBefore: boolean;
}

function percentChange(current: number, previous: number): number {
  if (previous === 0 && current === 0) return 0;
  if (previous === 0) return 100;
  return Number((((current - previous) / previous) * 100).toFixed(2));
}

function engagementPerPost(
  engagement: number,
  postCount: number
): number {
  return postCount === 0 ? 0 : engagement / postCount;
}

export function computeInsightSignals(
  current: AnalyticsSnapshot,
  previous: AnalyticsSnapshot
): InsightSignals {
  const currentEngagementPerPost = engagementPerPost(
    current.engagement,
    current.postCount
  );

  const previousEngagementPerPost = engagementPerPost(
    previous.engagement,
    previous.postCount
  );

  return {
    engagementChangePercent: percentChange(
      current.engagement,
      previous.engagement
    ),

    postCountChange: current.postCount - previous.postCount,

    engagementPerPostChangePercent: percentChange(
      currentEngagementPerPost,
      previousEngagementPerPost
    ),

    engagementRateChange:
      Number((current.engagementRate - previous.engagementRate).toFixed(2)),

    current,
    previous,

    isActive: current.postCount > 0,
    wasActiveBefore: previous.postCount > 0,
  };
}

export function generateInsights(
  signals: InsightSignals
): Insight[] {
  const insights: Insight[] = [];

  const {
    engagementChangePercent,
    postCountChange,
    engagementPerPostChangePercent,
    engagementRateChange,
    isActive,
    wasActiveBefore,
  } = signals;

  // Inactivity rules
  if (wasActiveBefore && !isActive) {
    insights.push({
      type: "warning",
      message:
        "Campaign became inactive during the selected period.",
    });
    return insights;
  }

  if (!wasActiveBefore && isActive) {
    insights.push({
      type: "positive",
      message:
        "Campaign activity resumed after a period of inactivity.",
    });
  }

  if (!wasActiveBefore && !isActive) {
    insights.push({
      type: "neutral",
      message:
        "No campaign activity detected in the current or previous period.",
    });
    return insights;
  }

  // Engagement trend
  if (engagementChangePercent <= -20) {
    insights.push({
      type: "warning",
      message:
        "Engagement dropped significantly compared to the previous period.",
    });
  } else if (engagementChangePercent >= 20) {
    insights.push({
      type: "positive",
      message:
        "Strong engagement growth observed in the selected period.",
    });
  }

  // Content effectiveness
  if (
    engagementChangePercent < 0 &&
    postCountChange === 0
  ) {
    insights.push({
      type: "warning",
      message:
        "Engagement declined despite consistent posting, indicating reduced content effectiveness.",
    });
  }

  if (
    postCountChange < 0 &&
    engagementPerPostChangePercent > 0
  ) {
    insights.push({
      type: "positive",
      message:
        "Fewer posts are generating higher engagement per post, suggesting improved content quality.",
    });
  }

  // Efficiency context
  if (
    engagementRateChange > 0 &&
    engagementChangePercent < 0
  ) {
    insights.push({
      type: "neutral",
      message:
        "Campaign efficiency improved, but overall engagement volume declined.",
    });
  }

  // Stability fallback
  if (
    Math.abs(engagementChangePercent) < 5 &&
    Math.abs(postCountChange) <= 1
  ) {
    insights.push({
      type: "neutral",
      message:
        "Campaign performance remained stable across periods.",
    });
  }

  return insights;
}
