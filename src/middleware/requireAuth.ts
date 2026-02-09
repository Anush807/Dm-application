import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";  

/**
 * Ensures:
 * - Request has valid Clerk session
 * - req.auth is populated
 * - Request is blocked if unauthenticated
 */
export const requireAuth = ClerkExpressRequireAuth({
  // Optional but recommended
  authorizedParties: ["http://localhost:3000"],
});
