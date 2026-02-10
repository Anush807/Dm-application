import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const authorizedParties = process.env.CLERK_AUTHORIZED_PARTIES
  ?.split(",")
  .map((p) => p.trim());

export const requireAuth = ClerkExpressRequireAuth({
  authorizedParties,
});
