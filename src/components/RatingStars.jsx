import { useState } from 'react';

const RatingStars = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (starRating) => {
    onRatingChange(starRating);
  };

  const handleStarHover = (starRating) => {
    setHoverRating(starRating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            onMouseLeave={handleStarLeave}
            className="rating-star text-3xl focus:outline-none transition-all duration-200"
          >
            <span
              className={`${
                star <= (hoverRating || rating)
                  ? 'text-yellow-400 drop-shadow-lg'
                  : 'text-gray-300'
              }`}
            >
              ★
            </span>
          </button>
        ))}
      </div>
      <span className="text-sm text-gray-600 font-medium">
        {rating > 0 ? `${rating}/5` : 'No rating'}
      </span>
    </div>
  );
};

export default RatingStars;
