import { Link, useLocation } from "react-router-dom";

const MoviesList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul>
      {movies.map((item) => (
        <li key={item.id}>
          <Link to={"/movies/" + item.id} state={{ from: location }}></Link>
        </li>
      ))}
    </ul>
  );
};
export default MoviesList;
