// import type { Analytics as AnalyticsType } from "../types/campaign";

// interface AnalyticsProps {
//   analytics: AnalyticsType | null;
// }

// export default function Analytics({ analytics }: AnalyticsProps) {
//   if (!analytics) {
//     return (
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <p className="text-sm text-gray-500">
//           Select a campaign to view analytics.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
//       <h2 className="text-lg font-semibold">
//         Campaign Analytics
//       </h2>

//       {/* Summary */}
//       <div className="grid grid-cols-2 gap-4">
//         <Metric label="Total Engagement" value={analytics.totalEngagement} />
//         <Metric
//           label="Engagement Rate"
//           value={`${analytics.engagementRate}%`}
//         />
//         <Metric label="Posts" value={analytics.postCount} />
//         <Metric label="Budget" value={`₹${analytics.budget}`} />
//       </div>

//       {/* Best Post */}
//       <div className="border-t pt-4">
//         <h3 className="text-sm font-medium text-gray-700 mb-2">
//           Best Performing Post
//         </h3>

//         {analytics.bestPost ? (
//           <p className="text-sm text-gray-800">
//             Post #{analytics.bestPost.postId} with{" "}
//             <span className="font-semibold">
//               {analytics.bestPost.engagement}
//             </span>{" "}
//             engagements
//           </p>
//         ) : (
//           <p className="text-sm text-gray-500">
//             No posts added yet.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// interface MetricProps {
//   label: string;
//   value: string | number;
// }

// function Metric({ label, value }: MetricProps) {
//   return (
//     <div className="rounded-lg border p-4">
//       <p className="text-xs text-gray-500">{label}</p>
//       <p className="text-lg font-semibold text-gray-900">
//         {value}
//       </p>
//     </div>
//   );
// }
