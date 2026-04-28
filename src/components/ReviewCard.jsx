/**
 * ReviewCard.jsx
 * Displays a single review with source icon, sentiment badge, rating, and reply action.
 */
import { useState } from 'react';
import { MessageSquareReply, CheckCircle2, XCircle, Clock } from 'lucide-react';
import SourceBadge from './SourceBadge';
import SentimentBadge from './SentimentBadge';
import StarRating from './StarRating';
import { useApp } from '../context/AppContext';

const REPLY_STATUS_CONFIG = {
  Pending: { icon: Clock, color: 'text-amber-500', label: 'Pending' },
  Replied: { icon: CheckCircle2, color: 'text-green-600', label: 'Replied' },
  Ignored: { icon: XCircle, color: 'text-gray-400', label: 'Ignored' },
};

function formatDate(timestamp) {
  if (!timestamp) return '';
  try {
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

export default function ReviewCard({ review }) {
  const { updateReplyStatus } = useApp();
  const [showActions, setShowActions] = useState(false);

  const statusConf = REPLY_STATUS_CONFIG[review.replyStatus] ?? REPLY_STATUS_CONFIG.Pending;
  const StatusIcon = statusConf.icon;

  return (
    <article className="card hover:shadow-md transition-shadow duration-200 flex flex-col gap-3">
      {/* Header row */}
      <div className="flex items-start justify-between gap-2 flex-wrap">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-gray-900 text-sm">{review.author}</span>
          <div className="flex items-center gap-2 flex-wrap">
            <StarRating rating={review.rating} />
            <SourceBadge source={review.source} />
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <SentimentBadge sentiment={review.sentiment} />
          <span className="text-xs text-gray-400">{formatDate(review.timestamp)}</span>
        </div>
      </div>

      {/* Review text — line-clamp is built-in from Tailwind 3.3+ */}
      <p className="text-sm text-gray-700 leading-relaxed overflow-hidden line-clamp-4">{review.text}</p>

      {/* Footer row */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-100">
        <div className={`flex items-center gap-1 text-xs font-medium ${statusConf.color}`}>
          <StatusIcon size={13} />
          <span>{statusConf.label}</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowActions((v) => !v)}
            className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
            aria-label="Manage reply"
          >
            <MessageSquareReply size={14} />
            <span>Reply</span>
          </button>

          {showActions && (
            <div className="absolute right-0 bottom-7 bg-white border border-gray-200 rounded-xl shadow-lg z-10 py-1 min-w-32">
              {['Replied', 'Pending', 'Ignored'].map((status) => (
                <button
                  key={status}
                  className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-50 transition-colors ${
                    review.replyStatus === status
                      ? 'font-semibold text-indigo-600'
                      : 'text-gray-700'
                  }`}
                  onClick={() => {
                    updateReplyStatus(review.id, status);
                    setShowActions(false);
                  }}
                >
                  Mark as {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
