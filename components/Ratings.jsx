const Ratings = ({ size, rating, onRatingChange }) => {
  return (
    <div className="flex py-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={size || "10"}
          height={size || "10"}
          viewBox="0 0 24 24"
          fill={star <= rating ? "#FFD700" : "#e4e5e9"}
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer transition duration-200 transform hover:scale-110"
        >
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.883 1.512 8.224L12 18.901l-7.448 4.512 1.512-8.224L.587 9.306l8.332-1.151L12 .587z" />
        </svg>
      ))}
    </div>
  );
};

export default Ratings;
