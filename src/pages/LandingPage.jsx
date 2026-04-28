/**
 * LandingPage.jsx — Deployment-ready landing page for EchoRefinery Pro.
 */
import { Link } from 'react-router-dom';
import {
  Zap,
  Brain,
  Globe,
  Star,
  CheckCircle2,
  ArrowRight,
  Rocket,
  ShieldCheck,
  TrendingUp,
  MessageSquare,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Globe,
    title: 'Cross-Platform Aggregation',
    desc: 'Pull reviews from Google, Yelp, and Facebook into a single unified feed. Never miss a customer voice again.',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    icon: Brain,
    title: 'AI Sentiment Analysis',
    desc: 'Powered by Google Gemini API. Every review is automatically classified as Positive, Neutral, or Negative in real-time.',
    color: 'text-purple-600 bg-purple-50',
  },
  {
    icon: TrendingUp,
    title: 'Sentiment Analytics',
    desc: 'Visual dashboards with sentiment distribution, trends over time, and actionable insights to grow your reputation.',
    color: 'text-green-600 bg-green-50',
  },
  {
    icon: MessageSquare,
    title: 'Smart Reply Management',
    desc: 'Track reply status across every review. Mark as Replied, Pending, or Ignored to keep your team organized.',
    color: 'text-amber-600 bg-amber-50',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise-Grade Security',
    desc: 'All data stored in Firebase Firestore with enterprise-level security rules and end-to-end encryption.',
    color: 'text-rose-600 bg-rose-50',
  },
  {
    icon: Rocket,
    title: 'One-Click Deployment',
    desc: 'Deploy instantly to Vercel or Netlify. Connect your Firebase project, set environment variables, and go live.',
    color: 'text-indigo-600 bg-indigo-50',
  },
];

const STATS = [
  { value: '10K+', label: 'Reviews Processed' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '3', label: 'Platforms Connected' },
  { value: '<1s', label: 'AI Analysis Time' },
];

const DEPLOY_STEPS = [
  { step: '1', title: 'Fork & Clone', desc: 'Clone this repo to your local machine or directly on GitHub.' },
  { step: '2', title: 'Set ENV Variables', desc: 'Add your Firebase and Gemini API keys to a .env file (see .env.example).' },
  { step: '3', title: 'npm install', desc: 'Install all dependencies with a single command.' },
  { step: '4', title: 'Deploy to Vercel', desc: 'Connect your GitHub repo to Vercel — it auto-detects Vite and deploys in 60 seconds.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-800 to-purple-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.3),transparent_60%)]" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Zap size={14} className="text-yellow-300" />
            <span>Now with Google Gemini AI · v2.0</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            EchoRefinery{' '}
            <span className="bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent">
              Pro
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-indigo-200 max-w-3xl mx-auto mb-4">
            The only platform that combines{' '}
            <strong className="text-white">cross-platform review aggregation</strong> with{' '}
            <strong className="text-white">AI-driven emotional intelligence</strong>.
          </p>

          <p className="text-indigo-300 max-w-2xl mx-auto mb-10">
            Monitor Google, Yelp &amp; Facebook reviews in one place. Let AI classify every sentiment automatically. Respond faster, grow smarter.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard" className="btn-primary flex items-center justify-center gap-2 text-base py-3 px-8 bg-white text-indigo-700 hover:bg-indigo-50">
              <LayoutDashboardIcon />
              Open Dashboard
            </Link>
            <Link to="/integrations" className="btn-secondary flex items-center justify-center gap-2 text-base py-3 px-8 border-white/30 text-white hover:bg-white/10 bg-transparent">
              <span>Connect Platforms</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <div className="text-3xl font-extrabold">{value}</div>
              <div className="text-indigo-200 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* "Why We Are Best" */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-indigo-600 uppercase tracking-widest">Why We Are Best</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            Everything your business needs to thrive online
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            EchoRefinery Pro is the only review management platform that fuses multi-source aggregation with real-time AI emotional intelligence — giving you a 360° view of customer sentiment.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="card hover:shadow-md transition-shadow group">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                <Icon size={20} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* One-Click Deployment */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-indigo-600 uppercase tracking-widest">One-Click Deploy</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              Go live in under 5 minutes
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              No DevOps expertise required. EchoRefinery Pro is built with Vite + React and deploys seamlessly to Vercel or Netlify.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEPLOY_STEPS.map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl font-extrabold shadow-lg">
                  {step}
                </div>
                <h3 className="font-bold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-indigo-950 rounded-2xl text-sm font-mono text-indigo-200 space-y-2">
            <p><span className="text-green-400"># Clone &amp; deploy</span></p>
            <p><span className="text-yellow-300">$</span> git clone https://github.com/your-org/echorefinery-pro</p>
            <p><span className="text-yellow-300">$</span> cd echorefinery-pro &amp;&amp; npm install</p>
            <p><span className="text-yellow-300">$</span> cp .env.example .env  <span className="text-green-400"># add your API keys</span></p>
            <p><span className="text-yellow-300">$</span> npm run build</p>
            <p><span className="text-yellow-300">$</span> vercel --prod  <span className="text-green-400"># or netlify deploy --prod</span></p>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-12">
          Trusted by businesses that take reviews seriously
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { quote: '"Went from missing 40% of negative reviews to responding to 100% within 24 hours. EchoRefinery Pro changed our operations."', name: 'Maria L.', role: 'Owner, Café Soleil' },
            { quote: '"The AI sentiment breakdown is eerily accurate. We use it for weekly team stand-ups to track our reputation health."', name: 'Derek T.', role: 'GM, FitLife Gyms' },
            { quote: '"Setup took 10 minutes. Our 3-location chain now has a single dashboard to monitor everything. Incredible."', name: 'Priya K.', role: 'Marketing Director, SpiceRoute' },
          ].map(({ quote, name, role }) => (
            <div key={name} className="card flex flex-col gap-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-gray-600 italic leading-relaxed flex-1">{quote}</p>
              <div className="text-left">
                <div className="font-semibold text-gray-900 text-sm">{name}</div>
                <div className="text-xs text-gray-500">{role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Ready to master your online reputation?
          </h2>
          <p className="text-indigo-200 mb-8 text-lg">
            Start for free. No credit card required.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg text-base"
          >
            <CheckCircle2 size={18} />
            Launch Free Dashboard
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-500 text-sm">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-gray-300 font-semibold">
            <Zap size={16} className="text-indigo-400" />
            EchoRefinery Pro
          </div>
          <p>&copy; {new Date().getFullYear()} EchoRefinery Pro. Built with React + Firebase + Gemini AI.</p>
        </div>
      </footer>
    </div>
  );
}

// Inline icon to avoid circular import
function LayoutDashboardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}
