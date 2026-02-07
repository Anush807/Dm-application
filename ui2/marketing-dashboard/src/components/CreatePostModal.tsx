import React, { useState } from 'react';
import { X } from 'lucide-react';
import { campaignService } from '../services/api';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignId: number;
  campaignName: string;
  onSuccess: () => void;
}

const PLATFORMS = ['Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'TikTok', 'YouTube'];

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  campaignId,
  campaignName,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    platform: 'Instagram',
    content: '',
    likes: 0,
    comments: 0,
    shares: 0,
    saves: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.content.trim()) {
      setError('Post content is required');
      return;
    }

    try {
      setLoading(true);
      // Backend will handle postedAt with default timestamp
      await campaignService.createPost(campaignId, formData);
      
      // Reset form
      setFormData({
        platform: 'Instagram',
        content: '',
        likes: 0,
        comments: 0,
        shares: 0,
        saves: 0,
      });
      
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const handleNumberChange = (field: string, value: string) => {
    const num = parseInt(value) || 0;
    setFormData({ ...formData, [field]: Math.max(0, num) });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Add Post</h2>
            <p className="text-sm text-gray-600 mt-1">for {campaignName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-2">
              Platform
            </label>
            <select
              id="platform"
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              disabled={loading}
            >
              {PLATFORMS.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Post Content
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[100px]"
              placeholder="Enter post content or description..."
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Post will be timestamped automatically with the current date and time.
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Engagement Metrics
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="likes" className="block text-xs text-gray-600 mb-1">
                  Likes
                </label>
                <input
                  type="number"
                  id="likes"
                  value={formData.likes}
                  onChange={(e) => handleNumberChange('likes', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  min="0"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="comments" className="block text-xs text-gray-600 mb-1">
                  Comments
                </label>
                <input
                  type="number"
                  id="comments"
                  value={formData.comments}
                  onChange={(e) => handleNumberChange('comments', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  min="0"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="shares" className="block text-xs text-gray-600 mb-1">
                  Shares
                </label>
                <input
                  type="number"
                  id="shares"
                  value={formData.shares}
                  onChange={(e) => handleNumberChange('shares', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  min="0"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="saves" className="block text-xs text-gray-600 mb-1">
                  Saves
                </label>
                <input
                  type="number"
                  id="saves"
                  value={formData.saves}
                  onChange={(e) => handleNumberChange('saves', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  min="0"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
