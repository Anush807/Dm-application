"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostSchema = exports.createCampaignSchema = void 0;
const zod_1 = require("zod");
exports.createCampaignSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Campaign name is required"),
    budget: zod_1.z.number().positive("Budget must be greater than 0"),
});
exports.createPostSchema = zod_1.z.object({
    likes: zod_1.z.number().nonnegative("Likes must be 0 or greater"),
    comments: zod_1.z.number().nonnegative("Comments must be 0 or greater"),
    shares: zod_1.z.number().nonnegative("Shares must be 0 or greater"),
    saves: zod_1.z.number().nonnegative("Saves must be 0 or greater"),
    // NEW FIELDS
    platform: zod_1.z
        .string()
        .min(1, "Platform is required"),
    content: zod_1.z
        .string()
        .min(1, "Content is required"),
});
