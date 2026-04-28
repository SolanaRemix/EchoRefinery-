/**
 * SentimentWidget.jsx
 * Dashboard widget showing AI sentiment distribution across all reviews.
 */
import { useApp } from '../context/AppContext';

function ProgressBar({ value, color }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
      <div
        className={`h-2.5 rounded-full transition-all duration-700 ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function SentimentWidget() {
  const { reviews, integrations } = useApp();

  const visible = reviews.filter((r) => integrations[r.source]);
  const total = visible.length;

  const counts = visible.reduce(
    (acc, r) => {
      acc[r.sentiment] = (acc[r.sentiment] ?? 0) + 1;
      return acc;
    },
    { Positive: 0, Neutral: 0, Negative: 0 }
  );

  const pct = (v) => (total === 0 ? 0 : Math.round((v / total) * 100));

  const rows = [
    { label: 'Positive', count: counts.Positive, color: 'bg-green-500', textColor: 'text-green-700' },
    { label: 'Neutral', count: counts.Neutral, color: 'bg-gray-400', textColor: 'text-gray-600' },
    { label: 'Negative', count: counts.Negative, color: 'bg-red-500', textColor: 'text-red-700' },
  ];

  const dominantRow = rows.reduce((a, b) => (a.count >= b.count ? a : b));

  return (
    <div className="card flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-base">Sentiment Distribution</h3>
          <p className="text-xs text-gray-500 mt-0.5">AI-powered analysis across all sources</p>
        </div>
        {total > 0 && (
          <span className={`text-2xl font-bold ${dominantRow.textColor}`}>
            {pct(dominantRow.count)}%
            <span className="text-xs font-normal text-gray-500 ml-1">{dominantRow.label}</span>
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {rows.map(({ label, count, color, textColor }) => (
          <div key={label} className="flex flex-col gap-1">
            <div className="flex justify-between text-xs font-medium">
              <span className={textColor}>{label}</span>
              <span className="text-gray-500">
                {count} review{count !== 1 ? 's' : ''} · {pct(count)}%
              </span>
            </div>
            <ProgressBar value={pct(count)} color={color} />
          </div>
        ))}
      </div>

      {total === 0 && (
        <p className="text-sm text-gray-400 text-center py-4">
          No reviews yet. Enable integrations to see sentiment data.
        </p>
      )}
    </div>
  );
}
