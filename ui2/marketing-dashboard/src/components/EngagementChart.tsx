import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

interface EngagementChartProps {
  data: Array<{
    name: string;
    engagement: number;
    posts?: number;
  }>;
  type?: 'bar' | 'line';
}

const EngagementChart: React.FC<EngagementChartProps> = ({ data, type = 'bar' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center h-64 text-gray-400">
          <p>No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        {type === 'bar' ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey="engagement" fill="#0ea5e9" name="Engagement" radius={[8, 8, 0, 0]} />
            {data[0]?.posts !== undefined && (
              <Bar dataKey="posts" fill="#06b6d4" name="Posts" radius={[8, 8, 0, 0]} />
            )}
          </BarChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="engagement"
              stroke="#0ea5e9"
              strokeWidth={2}
              dot={{ fill: '#0ea5e9', r: 4 }}
              name="Engagement"
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default EngagementChart;
