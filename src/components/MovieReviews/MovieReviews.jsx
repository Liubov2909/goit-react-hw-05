import { useState, useEffect } from "react";
import { getMovieReviews } from "../../servise-api";
import { useParams } from "react-router-dom";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const fetchedReviews = await getMovieReviews(movieId);
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching movie reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div>
      {loading && <b>Loading page...</b>}
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <p className={css.rewiewTitle}>Author: {review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <b>We do not have any reviews for this movie.</b>
      )}
    </div>
  );
};

export default MovieReviews;
