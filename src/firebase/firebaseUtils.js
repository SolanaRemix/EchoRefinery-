/**
 * firebaseUtils.js
 * Firestore CRUD logic for EchoRefinery Pro reviews.
 *
 * Review document schema:
 * {
 *   text: string,
 *   author: string,
 *   rating: number (1–5),
 *   source: 'Google' | 'Yelp' | 'Facebook',
 *   timestamp: Timestamp,
 *   sentiment: 'Positive' | 'Neutral' | 'Negative',
 *   replyStatus: 'Pending' | 'Replied' | 'Ignored',
 * }
 *
 * Required Firestore composite indexes:
 *   Collection : reviews
 *   Index 1    : source (ASC)  + timestamp (DESC)  — needed by fetchReviews(source)
 *   Create at: https://console.firebase.google.com → Firestore → Indexes → Add index
 */

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebaseConfig';

const REVIEWS_COLLECTION = 'reviews';

// Firestore batches are capped at 500 operations per commit.
const FIRESTORE_BATCH_LIMIT = 500;

/**
 * Fetch all reviews, optionally filtered by source.
 * @param {string|null} source - 'Google' | 'Yelp' | 'Facebook' | null (all)
 * @returns {Promise<Array>}
 *
 * NOTE: When `source` is provided this query uses a composite index on
 * (source ASC, timestamp DESC).  If the index does not exist yet Firestore
 * will throw an error containing a direct link to create it — follow that
 * link in the Firebase console to resolve the issue.
 */
export async function fetchReviews(source = null) {
  try {
    let q = collection(db, REVIEWS_COLLECTION);
    if (source) {
      q = query(q, where('source', '==', source), orderBy('timestamp', 'desc'));
    } else {
      q = query(q, orderBy('timestamp', 'desc'));
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    // Firestore surfaces missing-index errors with a console-friendly URL.
    // Re-surface it so developers can act on it immediately.
    if (err?.code === 'failed-precondition' || err?.message?.includes('index')) {
      console.error(
        '[EchoRefinery] Firestore composite index missing for the reviews collection. ' +
          'Create the index (source ASC + timestamp DESC) at the URL in the error below, ' +
          'then reload the app.',
        err,
      );
    } else {
      console.error('fetchReviews error:', err);
    }
    return [];
  }
}

/**
 * Add a new review document to Firestore.
 * @param {object} reviewData
 * @returns {Promise<string>} document ID
 */
export async function addReview(reviewData) {
  const doc_ = await addDoc(collection(db, REVIEWS_COLLECTION), {
    text: reviewData.text ?? '',
    author: reviewData.author ?? 'Anonymous',
    rating: reviewData.rating ?? 5,
    source: reviewData.source ?? 'Google',
    timestamp: serverTimestamp(),
    sentiment: reviewData.sentiment ?? 'Neutral',
    replyStatus: reviewData.replyStatus ?? 'Pending',
  });
  return doc_.id;
}

/**
 * Update the sentiment field of an existing review.
 * @param {string} id - Firestore document ID
 * @param {'Positive'|'Neutral'|'Negative'} sentiment
 */
export async function updateReviewSentiment(id, sentiment) {
  const ref = doc(db, REVIEWS_COLLECTION, id);
  await updateDoc(ref, { sentiment });
}

/**
 * Update the replyStatus field of an existing review.
 * @param {string} id - Firestore document ID
 * @param {'Pending'|'Replied'|'Ignored'} replyStatus
 */
export async function updateReplyStatus(id, replyStatus) {
  const ref = doc(db, REVIEWS_COLLECTION, id);
  await updateDoc(ref, { replyStatus });
}

/**
 * Delete a review document.
 * @param {string} id - Firestore document ID
 */
export async function deleteReview(id) {
  const ref = doc(db, REVIEWS_COLLECTION, id);
  await deleteDoc(ref);
}

/**
 * Bulk-seed simulated reviews (used in demo mode when Firebase is not configured).
 * Automatically chunks into batches of up to FIRESTORE_BATCH_LIMIT (500) to
 * stay within Firestore's per-batch operation limit.
 * @param {Array} reviews
 */
export async function seedReviews(reviews) {
  // Split the input into chunks that fit within Firestore's 500-op batch limit.
  for (let i = 0; i < reviews.length; i += FIRESTORE_BATCH_LIMIT) {
    const chunk = reviews.slice(i, i + FIRESTORE_BATCH_LIMIT);
    const batch = writeBatch(db);
    chunk.forEach((r) => {
      const ref = doc(collection(db, REVIEWS_COLLECTION));
      batch.set(ref, {
        text: r.text,
        author: r.author,
        rating: r.rating,
        source: r.source,
        timestamp: serverTimestamp(),
        sentiment: r.sentiment ?? 'Neutral',
        replyStatus: r.replyStatus ?? 'Pending',
      });
    });
    await batch.commit();
  }
}
