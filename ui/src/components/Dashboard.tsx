// interface DashboardProps {
//   totalCampaigns: number;
//   postCount: number | null;
//   onCreateCampaign: () => void;
// }

// export default function Dashboard({
//   totalCampaigns,
//   postCount,
//   onCreateCampaign,
// }: DashboardProps) {
//   return (
//     <div className="bg-[#f8f9fb] p-8 rounded-xl border border-[#e5e7eb]">
//       <h2 className="text-xl font-semibold text-[#0f172a] mb-6">
//         Campaign Dashboard
//       </h2>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
//         <StatCard
//           label="Ongoing Campaigns"
//           value={totalCampaigns}
//         />

//         <StatCard
//           label="Posts in Selected Campaign"
//           value={postCount !== null ? postCount : "—"}
//         />
//       </div>

//       {/* Action */}
//       <button
//         onClick={onCreateCampaign}
//         className="inline-flex items-center justify-center rounded-md bg-[#1e293b] px-6 py-3 text-sm font-medium text-white hover:bg-[#0f172a] transition"
//       >
//         Create Campaign
//       </button>
//     </div>
//   );
// }

// interface StatCardProps {
//   label: string;
//   value: number | string;
// }

// function StatCard({ label, value }: StatCardProps) {
//   return (
//     <div className="rounded-lg border border-[#e5e7eb] bg-white p-6">
//       <p className="text-sm text-[#475569] mb-1">
//         {label}
//       </p>
//       <p className="text-2xl font-semibold text-[#0f172a]">
//         {value}
//       </p>
//     </div>
//   );
// }
