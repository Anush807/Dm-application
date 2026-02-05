import { useState } from "react";
import { createPost } from "../api/campaign";

interface PostFormProps {
  campaignId: number;
  onCreated: () => void;
}

export default function PostForm({
  campaignId,
  onCreated,
}: PostFormProps) {
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");
  const [shares, setShares] = useState("");
  const [saves, setSaves] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (
      !likes ||
      !comments ||
      !shares ||
      !saves
    ) {
      setError("All fields are required");
      return;
    }

    try {
      await createPost(campaignId, {
        likes: Number(likes),
        comments: Number(comments),
        shares: Number(shares),
        saves: Number(saves),
      });

      setLikes("");
      setComments("");
      setShares("");
      setSaves("");
      onCreated();
    } catch {
      setError("Failed to add post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
      <h2 className="text-lg font-semibold mb-4">
        Add Post Metrics
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Likes
            </label>
            <input
              type="number"
              min="0"
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Comments
            </label>
            <input
              type="number"
              min="0"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Shares
            </label>
            <input
              type="number"
              min="0"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Saves
            </label>
            <input
              type="number"
              min="0"
              value={saves}
              onChange={(e) => setSaves(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Post"}
        </button>
      </form>
    </div>
  );
}
