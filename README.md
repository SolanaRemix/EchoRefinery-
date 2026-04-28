# EchoRefinery Pro

> **The only platform that combines cross-platform review aggregation with AI-driven emotional intelligence.**

A production-ready PWA built with **React (Vite)** · **Tailwind CSS** · **Firebase Firestore** · **Google Gemini AI**.

---

## Features

| Feature | Description |
|---|---|
| 🌐 Multi-platform aggregation | Pull reviews from **Google**, **Yelp**, and **Facebook** into a single unified feed |
| 🧠 AI Sentiment Analysis | Every review is classified as **Positive / Neutral / Negative** via the Gemini API (with a local fallback) |
| 📊 Sentiment Distribution | Dashboard widget shows percentage breakdown of customer sentiment |
| 💬 Reply Management | Track reply status (Pending / Replied / Ignored) across all reviews |
| 🔌 Integration Hub | Toggle platform connections on/off from a dedicated Integrations page |
| 🚀 One-Click Deploy | Optimised for Vercel / Netlify deployment |

---

## Firestore Review Schema

Each document in the `reviews` collection has the following shape:

```ts
{
  text:        string,                                  // Review body
  author:      string,                                  // Reviewer name
  rating:      number,                                  // 1–5 stars
  source:      'Google' | 'Yelp' | 'Facebook',         // Origin platform
  timestamp:   Timestamp,                               // Firestore server timestamp
  sentiment:   'Positive' | 'Neutral' | 'Negative',    // AI classification
  replyStatus: 'Pending' | 'Replied' | 'Ignored',      // Response tracking
}
```

> **Required Firestore composite index**: filtering by `source` and ordering by `timestamp` requires a composite index. Create it in the [Firebase console](https://console.firebase.google.com) under **Firestore → Indexes → Add index**: collection `reviews`, fields `source ASC` + `timestamp DESC`. Firestore will also include a direct creation link in the browser console if the index is missing.

---

## Tech Stack

- **Frontend**: React 19 + Vite 8
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide-React
- **Routing**: React Router DOM 7
- **Database**: Firebase Firestore
- **AI**: Google Gemini 2.0 Flash API (with keyword-based offline fallback)

---

## Getting Started

### Prerequisites

- Node.js ≥ 20 (see `.nvmrc`)
- A Firebase project (Firestore enabled)
- A Google Gemini API key *(optional — local fallback is used if not set)*

### 1. Clone & Install

```bash
git clone https://github.com/SolanaRemix/EchoRefinery-.git
cd EchoRefinery-
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and fill in your credentials:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

VITE_GEMINI_API_KEY=...

# Set to "true" to run without real Firebase credentials (demo/development only)
VITE_DEMO_MODE=false
```

> ⚠️ **Security**: `VITE_*` variables are bundled into the client. For production, proxy Gemini API calls through a serverless function to keep the key server-side.

### 3. Run Locally

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

---

## One-Click Deployment (Vercel)

1. Push this repo to GitHub.
2. Connect the repo to [Vercel](https://vercel.com).
3. Add all `VITE_*` environment variables in the Vercel project settings.
4. Deploy — Vercel auto-detects Vite and builds in ~60 seconds.

---

## Project Structure

```
src/
├── App.jsx                     # Root component & routing
├── context/
│   └── AppContext.jsx          # Global state (reviews, integrations)
├── firebase/
│   ├── firebaseConfig.js       # Firebase initialisation
│   └── firebaseUtils.js        # Firestore CRUD helpers
├── components/
│   ├── BrandIcons.jsx          # Shared Google/Yelp/Facebook SVG icons
│   ├── Navbar.jsx
│   ├── ReviewCard.jsx
│   ├── SentimentBadge.jsx
│   ├── SentimentWidget.jsx
│   ├── SourceBadge.jsx
│   └── StarRating.jsx
├── pages/
│   ├── Dashboard.jsx           # Unified review feed + analytics
│   ├── IntegrationManager.jsx  # Connection hub
│   └── LandingPage.jsx         # Marketing landing page
└── utils/
    ├── geminiApi.js            # Gemini sentiment analysis + local fallback
    └── mockReviews.js          # Demo review data
```

---

## License

[MIT](LICENSE)

