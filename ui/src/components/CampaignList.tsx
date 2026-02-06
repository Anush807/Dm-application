// import type { Campaign } from "../types/campaign";

// interface CampaignListProps {
//   campaigns: Campaign[];
//   selectedCampaignId: number | null;
//   onSelect: (id: number) => void;
// }

// export default function CampaignList({
//   campaigns,
//   selectedCampaignId,
//   onSelect,
// }: CampaignListProps) {
//   if (campaigns.length === 0) {
//     return (
//       <p className="text-sm text-gray-500">
//         No campaigns created yet.
//       </p>
//     );
//   }

//   return (
//     <div className="space-y-3">
//       <h2 className="text-lg font-semibold">Campaigns</h2>

//       <ul className="space-y-2">
//         {campaigns.map((campaign) => {
//           const isSelected =
//             campaign.id === selectedCampaignId;

//           return (
//             <li
//               key={campaign.id}
//               onClick={() => onSelect(campaign.id)}
//               className={`cursor-pointer rounded-lg border p-4 transition
//                 ${
//                   isSelected
//                     ? "border-blue-500 bg-blue-50"
//                     : "border-gray-200 hover:bg-gray-50"
//                 }
//               `}
//             >
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="font-medium text-gray-900">
//                     {campaign.name}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     Budget: ₹{campaign.budget}
//                   </p>
//                 </div>

//                 <span className="text-sm text-gray-600">
//                   {campaign.postCount} posts
//                 </span>
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }
