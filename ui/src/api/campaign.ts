import api from "./axios";
import type { Campaign, Analytics } from "../types/campaign";

export async function getCampaigns(): Promise<Campaign[]> {
  const res = await api.get("/campaign/all");
  return res.data;
}

    export async function createCampaign(
    name: string,
    budget: number
    ): Promise<Campaign> {
    const res = await api.post("/campaign/create", {
        name,
        budget,
    });
    return res.data;
    }

export async function createPost(
  campaignId: number,
  data: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
  }
) {
  const res = await api.post(
    `/campaign/${campaignId}/post`,
    data
  );
  return res.data;
}

export async function getAnalytics(
  campaignId: number
): Promise<Analytics> {
  const res = await api.get(
    `/campaign/${campaignId}/analytics`
  );
  return res.data;
}
