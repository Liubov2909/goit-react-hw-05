import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getMovieDetails } from "../../servise-api";
import css from "./MovieDetailsPage.module.css";
import { Suspense } from "react";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();
  const linkRef = useRef(
    location.state?.from ?? location.state?.prevLocation ?? "/"
  );

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await getMovieDetails(movieId);
        setMovieDetails(details);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchDetails();
  }, [movieId]);

  return (
    <div>
      <button type="button" className={css.backlink}>
        <Link to={linkRef.current}>Go Back</Link>
      </button>
      {movieDetails ? (
        <div className={css.detailsPage}>
          {movieDetails.poster_path && (
            <img
              width={"270px"}
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
              alt="Movie Poster"
            />
          )}
          <div>
            <h3>
              {movieDetails.title}
              <span>
                {" "}
                (
                {movieDetails.release_date
                  ? movieDetails.release_date.slice(0, 4)
                  : ""}
                )
              </span>
            </h3>
            <p>User Score: {Math.round(movieDetails.vote_average * 10)}%</p>
            <p className={css.detailsTitle}>Overview</p>
            <p>{movieDetails.overview}</p>
            <p className={css.detailsTitle}>Genres</p>
            <p>{movieDetails.genres.map((genre) => genre.name).join(", ")}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className={css.additionalInfo}>
        <p className={css.detailsTitle}>Additional Information</p>
        <div className={css.linkContainer}>
          <Link to={`/movies/${movieId}/cast`} className={css.link}>
            Cast
          </Link>
          <Link to={`/movies/${movieId}/reviews`} className={css.link}>
            Reviews
          </Link>
        </div>
      </div>
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
