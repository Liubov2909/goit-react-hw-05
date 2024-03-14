import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTrendingMovies } from "../servise-api.js";
import MovieList from "../components/MovieList/MovieList.jsx";
import { getMovieDetails } from "../servise-api.js";

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const movies = await getTrendingMovies();
        setTrendingMovies(movies);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
        setError("Error fetching trending movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = async (movieId) => {
    try {
      const movieDetails = await getMovieDetails(movieId);
      return <Link to={`/movies/${movieId}`} state={{ movieDetails }} />;
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };
  return (
    <div>
      {loading && <b>Loading page...</b>}
      {error && <p>{error}</p>}
      {!loading && !error && trendingMovies.length > 0 && (
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
            Trending Today
          </h1>
          <MovieList movies={trendingMovies} onItemClick={handleMovieClick} />
        </div>
      )}
      {!loading && !error && trendingMovies.length === 0 && (
        <p>No trending movies found.</p>
      )}
    </div>
  );
};

export default HomePage;
