export const StarRating = (props: {
  rating: number;
  ratingCount?: number;
  starWidth?: number;
  ratingCountStyle: string
}) => {
  const { rating, ratingCount, starWidth, ratingCountStyle } = props;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const starIcons = [];
  for (let i = 0; i < fullStars; i++) {
    starIcons.push(
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="#ffea00"
        width={starWidth}
        height={starWidth}
      >
        <path d="M10 1L12.2457 6.39592L18.0003 7.13948L13.9222 11.3169L14.5696 17.0002L10 13.4584L5.43042 17.0002L6.0778 11.3169L2 7.13948L7.75433 6.39592L10 1Z" />
      </svg>
    );
  }

  if (hasHalfStar) {
    starIcons.push(
      <svg
        key={fullStars}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="#ffea00"
        width={starWidth}
        height={starWidth}
      >
        <defs>
          <linearGradient id="halfStarGradient">
            <stop offset="50%" stopColor="#ffea00" />
            <stop offset="50%" stopColor="#d1d5db" />
          </linearGradient>
        </defs>
        <path
          d="M10 1L12.2457 6.39592L18.0003 7.13948L13.9222 11.3169L14.5696 17.0002L10 13.4584L5.43042 17.0002L6.0778 11.3169L2 7.13948L7.75433 6.39592L10 1Z"
          fill="url(#halfStarGradient)"
        />
      </svg>
    );
  }

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    starIcons.push(
      <svg
        key={fullStars + i + 1}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="#d1d5db"
        width={starWidth}
        height={starWidth}
      >
        <path d="M10 1L12.2457 6.39592L18.0003 7.13948L13.9222 11.3169L14.5696 17.0002L10 13.4584L5.43042 17.0002L6.0778 11.3169L2 7.13948L7.75433 6.39592L10 1Z" />
      </svg>
    );
  }

  return (
    <div className="flex items-center mx-2">
      {starIcons}
      {/* <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-sm font-semibold">
        {rating}
      </span> */}
      <div className={`px-1 py-0.5 ${ratingCountStyle} font-normal`}>({ratingCount})</div>
    </div>
  );
};
