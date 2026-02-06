// import { useState } from "react";
// import { createCampaign } from "../api/campaign";

// interface CampaignFormProps {
//   onCreated: () => void;
// }

// export default function CampaignForm({ onCreated }: CampaignFormProps) {
//   const [name, setName] = useState("");
//   const [budget, setBudget] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     if (!name || !budget) {
//       setError("All fields are required");
//       return;
//     }

//     try {
//       setLoading(true);
//       await createCampaign(name, Number(budget));
//       setName("");
//       setBudget("");
//       onCreated();
//     } catch {
//       setError("Failed to create campaign");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
//       <h2 className="text-lg font-semibold mb-4">
//         Create Campaign
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Campaign Name
//           </label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Diwali Sale"
//             className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Budget
//           </label>
//           <input
//             type="number"
//             value={budget}
//             onChange={(e) => setBudget(e.target.value)}
//             placeholder="5000"
//             className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {error && (
//           <p className="text-sm text-red-600">{error}</p>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
//         >
//           {loading ? "Creating..." : "Create Campaign"}
//         </button>
//       </form>
//     </div>
//   );
// }
