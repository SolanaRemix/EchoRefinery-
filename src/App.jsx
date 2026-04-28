/**
 * App.jsx — Root component with routing and global state provider.
 * Routes:
 *   /             → LandingPage
 *   /dashboard    → Dashboard
 *   /integrations → IntegrationManager
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import IntegrationManager from './pages/IntegrationManager';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {/* Landing page — no navbar chrome */}
          <Route path="/" element={<LandingPage />} />

          {/* App pages — with navbar */}
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/integrations"
            element={
              <Layout>
                <IntegrationManager />
              </Layout>
            }
          />

          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <Layout>
                <div className="flex flex-col items-center justify-center py-32 text-gray-400">
                  <p className="text-5xl font-extrabold text-gray-200 mb-4">404</p>
                  <p className="text-lg">Page not found</p>
                </div>
              </Layout>
            }
          />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
