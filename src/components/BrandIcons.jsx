/**
 * BrandIcons.jsx
 * Single source of truth for brand SVG icons used across the app
 * (SourceBadge, IntegrationManager, etc.).
 *
 * Each icon accepts an optional `size` prop (default 18) so it can be
 * rendered at different scales.
 */

export function GoogleIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-label="Google">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function YelpIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#D32323" aria-label="Yelp">
      <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm.5 4.5c.3-.1.6.1.7.4l1.5 4.5c.1.3-.1.6-.4.7-.1 0-.2 0-.3-.1l-4-2.5c-.3-.2-.3-.5-.1-.8l2.6-2.2zm-4 5.5l4.5-1c.3-.1.6.1.7.4.1.3-.1.6-.4.7l-4.5 1c-.3.1-.6-.1-.7-.4-.1-.3.1-.6.4-.7zm.5 5c-.2-.2-.2-.6 0-.8l3-3c.2-.2.6-.2.8 0s.2.6 0 .8l-3 3c-.2.2-.6.2-.8 0zm6.5.5c0 .3-.2.5-.5.5h-3c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h3c.3 0 .5.2.5.5z" />
    </svg>
  );
}

export function FacebookIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#1877F2" aria-label="Facebook">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.696 4.533-4.696 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}
