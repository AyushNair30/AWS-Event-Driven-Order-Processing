import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
}

export default function StarRating({ rating, size = 16 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const fill = Math.min(Math.max(rating - (n - 1), 0), 1);
        return (
          <div key={n} className="relative" style={{ width: size, height: size }}>
            <Star size={size} className="absolute text-gray-300" />
            <div
              className="absolute overflow-hidden"
              style={{ width: `${fill * 100}%`, height: size }}
            >
              <Star size={size} className="text-amber-400 fill-amber-400" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
