import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.moviesList}>
      {movies.map((movie) => (
        <li className={css.moviesListItem} key={movie.id}>
          <Link
            to={{
              ...location,
              pathname: `/movies/${movie.id}`,
              state: { movieDetails: movie },
            }}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
