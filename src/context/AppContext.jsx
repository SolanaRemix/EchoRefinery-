import { createContext, useContext, useState, useCallback } from 'react';
import { MOCK_REVIEWS } from '../utils/mockReviews';
import { analyzeSentiment } from '../utils/geminiApi';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [integrations, setIntegrations] = useState({
    Google: true,
    Yelp: true,
    Facebook: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const toggleIntegration = useCallback((source) => {
    setIntegrations((prev) => ({ ...prev, [source]: !prev[source] }));
  }, []);

  /**
   * Add a new simulated review and run AI sentiment analysis.
   */
  const addSimulatedReview = useCallback(async (reviewData) => {
    setIsLoading(true);
    const sentiment = await analyzeSentiment(reviewData.text);
    const newReview = {
      id: `mock-${Date.now()}`,
      ...reviewData,
      sentiment,
      replyStatus: 'Pending',
      timestamp: { toDate: () => new Date() },
    };
    setReviews((prev) => [newReview, ...prev]);
    setIsLoading(false);
    return newReview;
  }, []);

  /**
   * Update reply status of a review in local state.
   */
  const updateReplyStatus = useCallback((id, replyStatus) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, replyStatus } : r))
    );
  }, []);

  return (
    <AppContext.Provider
      value={{
        reviews,
        integrations,
        isLoading,
        toggleIntegration,
        addSimulatedReview,
        updateReplyStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
