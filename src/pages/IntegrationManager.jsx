/**
 * IntegrationManager.jsx — Connection Hub for Google, Yelp, and Facebook.
 * Users toggle switches to connect/disconnect review sources.
 */
import { useState, useEffect, useRef } from 'react';
import { Plug2, CheckCircle2, AlertCircle, ExternalLink, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GoogleIcon, YelpIcon, FacebookIcon } from '../components/BrandIcons';

const INTEGRATION_CONFIG = [
  {
    key: 'Google',
    icon: GoogleIcon,
    name: 'Google Business Profile',
    description: 'Import reviews from your Google Business Profile. Reach 80% of customers who search online.',
    docsUrl: 'https://developers.google.com/my-business',
    features: ['Real-time review sync', 'Star rating aggregation', 'AI sentiment analysis', 'Reply tracking'],
    accentColor: 'border-l-blue-500',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    key: 'Yelp',
    icon: YelpIcon,
    name: 'Yelp for Business',
    description: 'Aggregate Yelp reviews and ratings. Ideal for restaurants, salons, and local service businesses.',
    docsUrl: 'https://www.yelp.com/developers',
    features: ['Review monitoring', 'Rating trends', 'Sentiment classification', 'Response management'],
    accentColor: 'border-l-red-500',
    badgeColor: 'bg-red-100 text-red-700',
  },
  {
    key: 'Facebook',
    icon: FacebookIcon,
    name: 'Facebook Reviews',
    description: 'Monitor Facebook Page reviews and recommendations. Connect with 3B+ active users.',
    docsUrl: 'https://developers.facebook.com/docs/graph-api',
    features: ['Page review sync', 'Recommendation tracking', 'AI-powered insights', 'Reply management'],
    accentColor: 'border-l-indigo-500',
    badgeColor: 'bg-indigo-100 text-indigo-700',
  },
];

function ToggleSwitch({ checked, onChange, label }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${
        checked ? 'bg-indigo-600' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export default function IntegrationManager() {
  const { integrations, toggleIntegration } = useApp();
  const [expandedKey, setExpandedKey] = useState(null);
  const [notifications, setNotifications] = useState({});
  // Track per-key timeout IDs so they can be cleared on repeated toggles or unmount
  const timeoutRefs = useRef({});

  // Clear all pending notification timers on unmount
  useEffect(() => {
    const refs = timeoutRefs.current;
    return () => {
      Object.values(refs).forEach((id) => clearTimeout(id));
    };
  }, []);

  const handleToggle = (key) => {
    const wasActive = integrations[key];
    toggleIntegration(key);
    setNotifications((prev) => ({
      ...prev,
      [key]: wasActive ? 'disconnected' : 'connected',
    }));
    // Clear any existing timer for this key before setting a new one
    if (timeoutRefs.current[key]) {
      clearTimeout(timeoutRefs.current[key]);
    }
    timeoutRefs.current[key] = setTimeout(() => {
      setNotifications((prev) => ({ ...prev, [key]: null }));
      delete timeoutRefs.current[key];
    }, 3000);
  };

  const connectedCount = Object.values(integrations).filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Plug2 size={22} className="text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-500 mt-1">
            Connect your review platforms to start aggregating feedback in your unified dashboard.
          </p>
        </div>
      </div>

      {/* Status bar */}
      <div className="card flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${connectedCount > 0 ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
          <span className="text-sm font-medium text-gray-700">
            {connectedCount === 0
              ? 'No platforms connected'
              : `${connectedCount} platform${connectedCount > 1 ? 's' : ''} connected`}
          </span>
        </div>
        <span className="text-xs text-gray-400 font-medium">
          {connectedCount}/3 Active
        </span>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
        <Info size={16} className="flex-shrink-0 mt-0.5" />
        <p>
          <strong>Demo Mode:</strong> In production, each toggle initiates an OAuth flow with the platform's API. For this demo, toggling shows/hides reviews from that source in the dashboard.
        </p>
      </div>

      {/* Integration cards */}
      <div className="space-y-4">
        {INTEGRATION_CONFIG.map(({ key, icon: Icon, name, description, docsUrl, features, accentColor, badgeColor }) => {
          const isActive = integrations[key];
          const notif = notifications[key];
          const isExpanded = expandedKey === key;

          return (
            <div
              key={key}
              className={`card border-l-4 transition-all duration-200 ${accentColor} ${
                isActive ? 'shadow-md' : 'opacity-80'
              }`}
            >
              {/* Main row */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* Platform icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center shadow-sm">
                    <Icon size={24} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-bold text-gray-900 text-base">{name}</h2>
                      {isActive && (
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeColor}`}>
                          Connected
                        </span>
                      )}
                      {notif && (
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                            notif === 'connected'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {notif === 'connected' ? (
                            <CheckCircle2 size={10} />
                          ) : (
                            <AlertCircle size={10} />
                          )}
                          {notif === 'connected' ? 'Connected!' : 'Disconnected'}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{description}</p>

                    {/* Expand/collapse features */}
                    <button
                      onClick={() => setExpandedKey(isExpanded ? null : key)}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-medium mt-2 transition-colors"
                    >
                      {isExpanded ? '▲ Less details' : '▼ More details'}
                    </button>
                  </div>
                </div>

                {/* Toggle + docs */}
                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  <ToggleSwitch
                    checked={isActive}
                    onChange={() => handleToggle(key)}
                    label={`Toggle ${key} integration`}
                  />
                  <a
                    href={docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <ExternalLink size={11} />
                    API docs
                  </a>
                </div>
              </div>

              {/* Expanded features */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Features</p>
                  <ul className="grid grid-cols-2 gap-1.5">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-sm text-gray-700">
                        <CheckCircle2 size={13} className="text-green-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Next steps */}
      <div className="card bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
        <h3 className="font-bold text-gray-900 mb-3">Next Steps for Production</h3>
        <ol className="space-y-2">
          {[
            'Register your app in each platform\'s developer console (Google Cloud, Yelp Fusion, Facebook Developers).',
            'Add OAuth client IDs and API keys to your .env file as VITE_* variables.',
            'Replace the mock toggle logic in IntegrationManager.jsx with real OAuth redirect flows.',
            'Implement Firestore webhook listeners or cron jobs to pull new reviews periodically.',
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
