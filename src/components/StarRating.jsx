/**
 * StarRating.jsx — read-only star rating display.
 */
import { Star } from 'lucide-react';

export default function StarRating({ rating, max = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 fill-gray-300'}
        />
      ))}
    </div>
  );
}
