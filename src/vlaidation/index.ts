import { z } from "zod";

export const createCampaignSchema = z.object({
  name: z.string().min(1, "Campaign name is required"),
  budget: z.number().positive("Budget must be greater than 0"),
});

export const createPostSchema = z.object({
  likes: z.number().nonnegative("Likes must be 0 or greater"),
  comments: z.number().nonnegative("Comments must be 0 or greater"),
  shares: z.number().nonnegative("Shares must be 0 or greater"),
  saves: z.number().nonnegative("Saves must be 0 or greater"),

  // NEW FIELDS
  platform: z
    .string()
    .min(1, "Platform is required"),

  content: z
    .string()
    .min(1, "Content is required"),
});
