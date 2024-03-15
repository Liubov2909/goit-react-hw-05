import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies, from, prevLocation }) => {
  return (
    <ul className={css.moviesList}>
      {movies.map((movie) => (
        <li className={css.moviesListItem} key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={{ from, prevLocation }}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
