"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
/**
 * Ensures:
 * - Request has valid Clerk session
 * - req.auth is populated
 * - Request is blocked if unauthenticated
 */
exports.requireAuth = (0, clerk_sdk_node_1.ClerkExpressRequireAuth)({
    // Optional but recommended
    authorizedParties: ["http://localhost:3000"],
});
