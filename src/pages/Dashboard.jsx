/**
 * Dashboard.jsx — Unified review feed with AI sentiment analytics.
 * Aggregates reviews from Google, Yelp, and Facebook.
 */
import { useState, useMemo } from 'react';
import { LayoutDashboard, RefreshCw, PlusCircle, Filter, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ReviewCard from '../components/ReviewCard';
import SentimentWidget from '../components/SentimentWidget';

const SOURCES = ['All', 'Google', 'Yelp', 'Facebook'];
const SENTIMENTS = ['All', 'Positive', 'Neutral', 'Negative'];

const SAMPLE_REVIEWS_BY_SOURCE = {
  Google: [
    { text: 'Great food and excellent service! Will definitely come back again.', author: 'Alex B.', rating: 5 },
    { text: 'Waited way too long and the staff seemed uninterested.', author: 'Mia S.', rating: 2 },
  ],
  Yelp: [
    { text: 'Amazing ambiance and the pasta was absolutely delicious!', author: 'Tom R.', rating: 5 },
    { text: 'Decent place, nothing spectacular. Service was okay.', author: 'Nina L.', rating: 3 },
  ],
  Facebook: [
    { text: 'Love this place! Best coffee in the neighborhood.', author: 'Olivia D.', rating: 5 },
    { text: 'Had a horrible experience. The food was cold and wrong order.', author: 'Ryan K.', rating: 1 },
  ],
};

export default function Dashboard() {
  const { reviews, integrations, isLoading, addSimulatedReview } = useApp();
  const [sourceFilter, setSourceFilter] = useState('All');
  const [sentimentFilter, setSentimentFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Filtered reviews based on active integrations + user filters
  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      const integrated = integrations[r.source];
      const matchSource = sourceFilter === 'All' || r.source === sourceFilter;
      const matchSentiment = sentimentFilter === 'All' || r.sentiment === sentimentFilter;
      const matchSearch =
        search === '' ||
        r.text.toLowerCase().includes(search.toLowerCase()) ||
        r.author.toLowerCase().includes(search.toLowerCase());
      return integrated && matchSource && matchSentiment && matchSearch;
    });
  }, [reviews, integrations, sourceFilter, sentimentFilter, search]);

  // Quick stats for header
  const stats = useMemo(() => {
    const visible = reviews.filter((r) => integrations[r.source]);
    const total = visible.length;
    const pos = visible.filter((r) => r.sentiment === 'Positive').length;
    const neg = visible.filter((r) => r.sentiment === 'Negative').length;
    const pending = visible.filter((r) => r.replyStatus === 'Pending').length;
    return { total, pos, neg, pending };
  }, [reviews, integrations]);

  const handleSimulate = async () => {
    const activeSources = Object.entries(integrations)
      .filter(([, v]) => v)
      .map(([k]) => k);
    if (activeSources.length === 0) return;

    setIsAdding(true);
    const source = activeSources[Math.floor(Math.random() * activeSources.length)];
    const pool = SAMPLE_REVIEWS_BY_SOURCE[source];
    const sample = pool[Math.floor(Math.random() * pool.length)];
    await addSimulatedReview({ ...sample, source });
    setIsAdding(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
            <LayoutDashboard size={20} className="text-indigo-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Review Dashboard</h1>
            <p className="text-xs text-gray-500">Unified feed · AI-powered sentiment</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSimulate}
            disabled={isAdding || isLoading}
            className="flex items-center gap-1.5 text-sm bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow"
          >
            {isAdding ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : (
              <PlusCircle size={14} />
            )}
            Simulate Review
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Reviews', value: stats.total, color: 'text-indigo-600 bg-indigo-50' },
          { label: 'Positive', value: stats.pos, color: 'text-green-600 bg-green-50' },
          { label: 'Negative', value: stats.neg, color: 'text-red-600 bg-red-50' },
          { label: 'Awaiting Reply', value: stats.pending, color: 'text-amber-600 bg-amber-50' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card text-center">
            <div className={`text-2xl font-extrabold ${color.split(' ')[0]}`}>{value}</div>
            <div className="text-xs text-gray-500 mt-0.5 font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Two-column layout: feed + sidebar */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Feed column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters */}
          <div className="card">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reviews or authors…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>

              {/* Source filter */}
              <div className="flex items-center gap-1">
                <Filter size={13} className="text-gray-400" />
                <div className="flex gap-1 flex-wrap">
                  {SOURCES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSourceFilter(s)}
                      className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                        sourceFilter === s
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sentiment filter */}
            <div className="flex gap-1 flex-wrap mt-3">
              {SENTIMENTS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSentimentFilter(s)}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                    sentimentFilter === s
                      ? s === 'Positive'
                        ? 'bg-green-600 text-white'
                        : s === 'Negative'
                        ? 'bg-red-600 text-white'
                        : s === 'Neutral'
                        ? 'bg-gray-500 text-white'
                        : 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Review list */}
          {filteredReviews.length === 0 ? (
            <div className="card text-center py-12 text-gray-400">
              <p className="font-medium">No reviews match your filters.</p>
              <p className="text-sm mt-1">Try adjusting the source or sentiment filter.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <SentimentWidget />

          {/* Active integrations summary */}
          <div className="card">
            <h3 className="font-bold text-gray-900 text-sm mb-3">Active Sources</h3>
            <div className="space-y-2">
              {Object.entries(integrations).map(([source, active]) => (
                <div key={source} className="flex items-center justify-between text-sm">
                  <span className={active ? 'text-gray-800' : 'text-gray-400'}>{source}</span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {active ? 'Live' : 'Off'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
