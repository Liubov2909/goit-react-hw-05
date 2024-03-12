import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../servise-api";
import css from "./MovieCast.module.css";

const baseUrl = "https://image.tmdb.org/t/p/w500/";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCast = async () => {
      setLoading(true);
      try {
        const castData = await getMovieCredits(movieId);
        setCast(castData);
      } catch (error) {
        console.error("Error fetching movie cast:", error);
        setError("Error fetching movie cast. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      {loading && <b>Loading page...</b>}
      <ul className={css.castList}>
        {cast.map((actor) => (
          <li key={actor.id}>
            {actor.profile_path && (
              <img
                src={`${baseUrl}${actor.profile_path}`}
                alt={actor.name}
                style={{ width: "100px", height: "150px" }}
              />
            )}
            <p>{actor.name}</p>
          </li>
        ))}
      </ul>
      {error && <b>Error fetching movie cast!</b>}
    </div>
  );
};

export default MovieCast;
