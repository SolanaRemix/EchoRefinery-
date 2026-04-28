/**
 * SourceBadge.jsx
 * Brand-specific icon/badge for Google, Yelp, Facebook.
 */
import { GoogleIcon, YelpIcon, FacebookIcon } from './BrandIcons';

const SOURCE_CONFIG = {
  Google: {
    icon: GoogleIcon,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    label: 'Google',
  },
  Yelp: {
    icon: YelpIcon,
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    label: 'Yelp',
  },
  Facebook: {
    icon: FacebookIcon,
    bg: 'bg-blue-50',
    border: 'border-indigo-200',
    text: 'text-indigo-700',
    label: 'Facebook',
  },
};

export default function SourceBadge({ source, size = 'sm' }) {
  const config = SOURCE_CONFIG[source] ?? SOURCE_CONFIG.Google;
  const Icon = config.icon;
  const iconSize = size === 'sm' ? 14 : 18;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${config.bg} ${config.border} ${config.text}`}
    >
      <Icon size={iconSize} />
      {config.label}
    </span>
  );
}
