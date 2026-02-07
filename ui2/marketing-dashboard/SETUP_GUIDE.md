# Marketing Dashboard - Complete Setup & Features Guide

## 📋 Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Installation](#installation)
4. [API Integration](#api-integration)
5. [Component Documentation](#component-documentation)
6. [Usage Guide](#usage-guide)
7. [Troubleshooting](#troubleshooting)

## 🎯 Overview

A comprehensive React TypeScript dashboard for managing digital marketing campaigns with:
- Real-time analytics and insights
- Campaign comparison tools
- Interactive data visualizations
- Post management
- Date range filtering
- Responsive design

## ✨ Features

### Dashboard Page (`/`)
- **Overview Statistics**
  - Total campaigns count
  - Total budget across all campaigns
  - Total posts count
  - Average budget per campaign

- **Campaign Cards Grid**
  - Campaign name and creation date
  - Budget and post count per campaign
  - Click to view detailed analytics
  - Responsive grid layout (1-3 columns)

- **Create Campaign**
  - Modal form with validation
  - Name and budget input
  - Real-time error feedback
  - Auto-refresh on success

### Campaign Details Page (`/campaign/:id`)
- **Analytics Overview**
  - Budget allocation
  - Total engagement (likes + comments + shares + saves)
  - Engagement rate (engagement/budget * 100)
  - Post count

- **Date Range Filtering**
  - Select custom date ranges
  - Clear filter option
  - Triggers insights generation

- **Best Post Highlight**
  - Identifies top performing post
  - Shows total engagement
  - Visual trophy indicator

- **Engagement Chart**
  - Bar/Line chart visualization
  - Interactive tooltips
  - Responsive design

- **AI Insights** (requires date range)
  - Compares current vs previous period
  - Generates actionable insights
  - Shows trends and recommendations

- **Add Post**
  - Platform selection (Instagram, Facebook, Twitter, etc.)
  - Content input
  - Engagement metrics (likes, comments, shares, saves)
  - Post date selection

### Compare Campaigns Page (`/compare`)
- **Campaign Selection**
  - Dropdown for Campaign A
  - Dropdown for Campaign B
  - Prevents selecting same campaign

- **Date Range Filtering**
  - Optional date range
  - Applied to both campaigns

- **Comparison Results**
  - Winner by total engagement
  - Winner by engagement rate
  - Percentage difference
  - Side-by-side metrics display

- **Edge Case Handling**
  - Notes for campaigns with no posts
  - Validation for identical campaigns
  - Clear error messages

## 🚀 Installation

### Prerequisites
```bash
Node.js >= 16.0.0
npm >= 8.0.0 or yarn >= 1.22.0
```

### Step 1: Install Dependencies
```bash
cd marketing-dashboard
npm install
```

### Step 2: Configure API Endpoint
Update `src/services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:4000/api'; // Your backend URL
```

Or create a `.env` file:
```env
VITE_API_BASE_URL=http://localhost:4000/api
```

Then update `src/services/api.ts`:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';
```

### Step 3: Start Development Server
```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Step 4: Build for Production
```bash
npm run build
npm run preview
```

## 🔌 API Integration

### Required Backend Endpoints

#### 1. Create Campaign
```
POST /campaign/create
Body: { name: string, budget: number }
Response: { message: string, campaign: Campaign }
```

#### 2. Get All Campaigns
```
GET /campaign/all
Response: Campaign[]
```

#### 3. Create Post
```
POST /campaign/:campaignId/post
Body: { platform: string, content: string, likes: number, comments: number, shares: number, saves: number, postedAt: string }
Response: Post
```

#### 4. Get Campaign Analytics
```
GET /campaign/:campaignId/analytics?from=YYYY-MM-DD&to=YYYY-MM-DD
Response: { range, campaignId, campaignName, budget, totalEngagement, engagementRate, postCount, bestPost }
```

#### 5. Compare Campaigns
```
GET /campaign/compare?campaignA=1&campaignB=2&from=YYYY-MM-DD&to=YYYY-MM-DD
Response: { range, campaignA, campaignB, comparison }
```

#### 6. Get Campaign Insights
```
GET /campaign/:campaignId/insight?from=YYYY-MM-DD&to=YYYY-MM-DD
Response: { range, analytics, insights: string[] }
```

### API Service Layer
Located in `src/services/api.ts`, this provides:
- Axios instance with base URL
- Type-safe API methods
- Error handling
- Response type checking

## 📦 Component Documentation

### Core Components

#### CampaignCard
- Props: `campaign`, `onClick`
- Displays campaign summary
- Hover effects and transitions
- Responsive design

#### CreateCampaignModal
- Props: `isOpen`, `onClose`, `onSuccess`
- Form validation
- Loading states
- Error handling

#### CreatePostModal
- Props: `isOpen`, `onClose`, `campaignId`, `campaignName`, `onSuccess`
- Platform selection
- Engagement metrics input
- Date picker

#### StatCard
- Props: `title`, `value`, `icon`, `iconColor`, `iconBgColor`, `trend`
- Displays single metric
- Optional trend indicator
- Customizable colors

#### EngagementChart
- Props: `data`, `type` (bar | line)
- Recharts integration
- Responsive container
- Interactive tooltips

#### LoadingSpinner
- Props: `size`, `text`
- Three sizes: sm, md, lg
- Optional loading text

#### ErrorMessage
- Props: `message`, `onRetry`
- Error display
- Optional retry button

#### EmptyState
- Props: `icon`, `title`, `description`, `action`
- Placeholder for empty data
- Optional action button

### Custom Hooks

#### useCampaigns
```typescript
const { campaigns, loading, error, refetch } = useCampaigns();
```
- Fetches all campaigns
- Auto-loads on mount
- Returns refetch function

#### useCampaignAnalytics
```typescript
const { analytics, loading, error, refetch } = useCampaignAnalytics(
  campaignId,
  from,
  to
);
```
- Fetches analytics for specific campaign
- Supports date filtering
- Auto-refetches when params change

#### useCampaignComparison
```typescript
const { comparison, loading, error, refetch } = useCampaignComparison(
  campaignAId,
  campaignBId,
  from,
  to
);
```
- Compares two campaigns
- Includes winner calculation
- Edge case handling

#### useCampaignInsights
```typescript
const { insights, loading, error, refetch } = useCampaignInsights(
  campaignId,
  from,
  to
);
```
- Generates AI insights
- Requires date range
- Returns insight messages

## 📖 Usage Guide

### Creating a Campaign
1. Click "Create Campaign" button on dashboard
2. Enter campaign name (required)
3. Enter budget amount (required, must be > 0)
4. Click "Create Campaign"
5. Campaign appears in dashboard grid

### Viewing Campaign Analytics
1. Click any campaign card on dashboard
2. View overview statistics
3. Optionally select date range for filtering
4. Add posts using "Add Post" button
5. View insights (requires date range)

### Adding Posts to Campaign
1. Navigate to campaign details page
2. Click "Add Post" button
3. Select platform
4. Enter content
5. Input engagement metrics
6. Select post date
7. Click "Add Post"

### Comparing Campaigns
1. Navigate to Compare page (top navigation)
2. Select Campaign A from dropdown
3. Select Campaign B from dropdown
4. Optionally select date range
5. View side-by-side comparison
6. Check winner indicators

### Using Date Filters
1. Click on date input fields
2. Select "from" date
3. Select "to" date
4. Data updates automatically
5. Click "Clear" to remove filters

## 🔧 Troubleshooting

### Common Issues

#### 1. API Connection Errors
**Problem**: "Failed to fetch campaigns" or network errors

**Solutions**:
- Verify backend is running
- Check `API_BASE_URL` in `src/services/api.ts`
- Ensure CORS is enabled on backend
- Check browser console for details

#### 2. No Data Displayed
**Problem**: Empty states show even with campaigns

**Solutions**:
- Check API response format matches TypeScript interfaces
- Verify backend returns correct data structure
- Check browser network tab for API responses
- Ensure date formats are ISO 8601

#### 3. Charts Not Rendering
**Problem**: Charts show blank or error

**Solutions**:
- Verify data array is not empty
- Check data structure matches expected format
- Ensure Recharts is installed: `npm install recharts`
- Check browser console for errors

#### 4. Modal Not Closing
**Problem**: Modal stays open after submission

**Solutions**:
- Check `onSuccess` callback is called
- Verify state updates in parent component
- Check for JavaScript errors in console

#### 5. Date Range Not Working
**Problem**: Insights or filtering not working with date range

**Solutions**:
- Ensure both from and to dates are selected
- Verify date format is YYYY-MM-DD
- Check that from date is before to date
- Ensure backend accepts date parameters

### Debug Mode
Enable detailed logging:
```typescript
// In src/services/api.ts
api.interceptors.request.use(request => {
  console.log('Starting Request', request);
  return request;
});

api.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
});
```

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom color palette
        500: '#your-color',
        600: '#your-color',
      },
    },
  },
}
```

### Adding New Metrics
1. Update TypeScript interfaces in `src/types/index.ts`
2. Add fields to API service methods
3. Update components to display new data
4. Add new StatCards or chart data points

### Custom Charts
Use Recharts components in `src/components/EngagementChart.tsx`:
```typescript
import { PieChart, Pie, AreaChart, Area } from 'recharts';
```

## 📊 Performance Tips

1. **Lazy Loading**: Pages are already code-split via React Router
2. **Memoization**: Use React.memo for expensive components
3. **Debouncing**: Add debounce to search/filter inputs
4. **Pagination**: Implement for large campaign lists
5. **Caching**: Consider React Query for API caching

## 🔒 Security Notes

- Never commit `.env` file with API keys
- Validate all user inputs
- Sanitize content before display
- Use HTTPS in production
- Implement proper authentication

## 📝 License

MIT License - feel free to use in your projects!
