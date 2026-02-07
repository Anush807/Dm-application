# Backend Integration Notes

## Important Implementation Details

### Post Creation Endpoint

**Current Frontend Implementation:**
The `CreatePostModal` component sends the following payload to `/campaign/:campaignId/post`:

```typescript
{
  platform: string,
  content: string,
  likes: number,
  comments: number,
  shares: number,
  saves: number
  // postedAt is NOT included - backend should handle with @default(now())
}
```

**Expected Backend Behavior:**
The backend should use Prisma's default timestamp for `postedAt`:
```prisma
model Post {
  // ...
  postedAt  DateTime @default(now())
}
```

**Backend Route Issues to Fix:**

1. **Missing Response:** The route doesn't return the created post:
```typescript
// Current (line 65-70)
const post = await prisma.post.create({
  data: {
    ...data,
    campaignId: parseInt(campaignId)
  }
})
// Missing: res.json({ post }) or res.json({ message: "Post created", post })

// Recommended Fix:
const post = await prisma.post.create({
  data: {
    ...data,
    campaignId: parseInt(campaignId)
  }
});
res.status(201).json({ message: "Post created successfully", post });
```

2. **Error Message:** Line 72 says "Failed to fetch campaign" but should say "Failed to create post"

### Validation Schema

Make sure your `createPostSchema` includes these fields and makes `postedAt` optional:

```typescript
// In your validation file
export const createPostSchema = z.object({
  platform: z.string().min(1),
  content: z.string().min(1),
  likes: z.number().int().min(0),
  comments: z.number().int().min(0),
  shares: z.number().int().min(0),
  saves: z.number().int().min(0),
  postedAt: z.string().datetime().optional() // Make it optional
});
```

### Alternative: Support Custom Post Dates

If you want users to be able to specify when a post was published (for adding historical data), you can:

1. Make the date field optional in the frontend
2. Add a checkbox "Custom date" that shows a date picker
3. Send `postedAt` only when custom date is selected

**Implementation example:**

```typescript
// In CreatePostModal.tsx
const [useCustomDate, setUseCustomDate] = useState(false);
const [customDate, setCustomDate] = useState('');

// In the form
{useCustomDate && (
  <input 
    type="date" 
    value={customDate}
    onChange={(e) => setCustomDate(e.target.value)}
  />
)}

// In handleSubmit
const payload = {
  ...formData,
  ...(useCustomDate && customDate ? { postedAt: new Date(customDate).toISOString() } : {})
};
```

## Current API Integration Status

### ✅ Working Endpoints:
- `POST /campaign/create` - Creates campaign
- `GET /campaign/all` - Lists campaigns
- `GET /campaign/:id/analytics` - Gets analytics with date filtering
- `GET /campaign/compare` - Compares two campaigns
- `GET /campaign/:id/insight` - Gets AI insights

### ⚠️ Needs Backend Fix:
- `POST /campaign/:campaignId/post` - Should return created post and fix error message

## Testing Checklist

After updating the backend:

1. ✅ Create a campaign
2. ✅ Add a post to the campaign (verify timestamp is automatic)
3. ✅ Check that post appears in analytics
4. ✅ Verify engagement calculations include the new post
5. ✅ Test date range filtering with the new post
6. ✅ Compare campaigns with different numbers of posts

## Database Schema Assumptions

The frontend assumes your Prisma schema looks something like:

```prisma
model Campaign {
  id        Int      @id @default(autoincrement())
  name      String
  budget    Float
  createdAt DateTime @default(now())
  posts     Post[]
}

model Post {
  id         Int      @id @default(autoincrement())
  campaignId Int
  campaign   Campaign @relation(fields: [campaignId], references: [id])
  platform   String
  content    String
  likes      Int      @default(0)
  comments   Int      @default(0)
  shares     Int      @default(0)
  saves      Int      @default(0)
  postedAt   DateTime @default(now())  // ⭐ This should have @default(now())
}
```

If your schema is different, you may need to adjust the TypeScript interfaces in `src/types/index.ts`.
