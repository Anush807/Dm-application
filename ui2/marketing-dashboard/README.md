# Marketing Dashboard

A professional React TypeScript application for managing and analyzing digital marketing campaigns.

## Features

### 🎯 Dashboard
- Overview of all campaigns with key metrics
- Total campaigns, budget, posts, and average budget statistics
- Clean and engaging UI with campaign cards
- Quick navigation to campaign details

### 📊 Campaign Analytics
- Detailed analytics for individual campaigns
- Engagement metrics and rates
- Date range filtering
- Best performing post highlighting
- Interactive charts and visualizations
- AI-powered insights (when date range is selected)

### 🔄 Campaign Comparison
- Side-by-side comparison of two campaigns
- Winner identification by engagement and engagement rate
- Percentage difference calculations
- Date range filtering
- Edge case handling (no posts, same campaign, etc.)

### 🎨 UI/UX Features
- Responsive design (mobile, tablet, desktop)
- Clean Tailwind CSS styling
- Loading states and error handling
- Empty states with helpful messages
- Interactive charts using Recharts
- Smooth transitions and animations

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Axios** - API calls
- **Lucide React** - Icons
- **date-fns** - Date formatting

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository or extract the files

2. Install dependencies:
```bash
npm install
```

3. Update the API base URL in `src/services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:4000/api'; // Update to your backend URL
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## API Integration

The application integrates with the following backend endpoints:

### Campaign Routes
- `POST /campaign/create` - Create a new campaign
- `GET /campaign/all` - Get all campaigns
- `POST /campaign/:campaignId/post` - Create a post for a campaign
- `GET /campaign/:campaignId/analytics` - Get campaign analytics
- `GET /campaign/compare` - Compare two campaigns
- `GET /campaign/:campaignId/insight` - Get AI insights for a campaign

### Required API Response Formats

See `src/types/index.ts` for detailed TypeScript interfaces.

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── CampaignCard.tsx
│   ├── CreateCampaignModal.tsx
│   ├── EngagementChart.tsx
│   ├── StatCard.tsx
│   ├── LoadingSpinner.tsx
│   ├── ErrorMessage.tsx
│   └── EmptyState.tsx
├── pages/             # Page components
│   ├── Dashboard.tsx
│   ├── CampaignDetails.tsx
│   └── CompareCampaigns.tsx
├── services/          # API service layer
│   └── api.ts
├── hooks/             # Custom React hooks
│   └── useCampaigns.ts
├── types/             # TypeScript type definitions
│   └── index.ts
├── utils/             # Utility functions
│   └── formatters.ts
├── App.tsx            # Main app component
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## Features Breakdown

### Dashboard Page
- Displays all campaigns in a grid layout
- Shows key statistics at the top
- Create campaign modal
- Responsive card design
- Empty state when no campaigns exist

### Campaign Details Page
- Full analytics for a single campaign
- Date range filtering
- Engagement metrics and charts
- Best post highlighting
- AI insights (requires date range)
- Navigation back to dashboard

### Compare Campaigns Page
- Select two campaigns to compare
- Side-by-side metrics display
- Winner identification
- Engagement difference percentage
- Notes for edge cases
- Date range filtering

## Edge Cases Handled

1. **No campaigns** - Shows empty state with CTA
2. **No posts in campaign** - Displays warning message
3. **Loading states** - Spinners during API calls
4. **Error states** - Error messages with retry option
5. **Invalid date ranges** - Validation and clear options
6. **Comparing same campaign** - Warning message
7. **No data in date range** - Appropriate notes displayed
8. **API failures** - Graceful error handling

## Customization

### Colors
Update the Tailwind config in `tailwind.config.js` to change the primary color scheme.

### API URL
Update `API_BASE_URL` in `src/services/api.ts`.

### Date Formats
Modify formatters in `src/utils/formatters.ts`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
