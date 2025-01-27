"use client"

interface StarRatingProps {
  value: number
  className?: string
}

export default function StarRating({ value, className }: StarRatingProps) {
  // If value is below x.5, floor it. If it's x.5 or above, show half star
  const shouldShowHalfStar = value % 1 >= 0.5
  const filledStars = Math.floor(value)

  return (
    <div className={className}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="inline-block">
          {star <= filledStars ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="black"
              stroke="black"
              strokeWidth="1"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ) : star === filledStars + 1 && shouldShowHalfStar ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="1"
            >
              <defs>
                <clipPath id="half">
                  <rect x="0" y="0" width="12" height="24" />
                </clipPath>
              </defs>
              <g>
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                  fill="none"
                />
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                  fill="black"
                  clipPath="url(#half)"
                />
              </g>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="1"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          )}
        </span>
      ))}
    </div>
  )
}
