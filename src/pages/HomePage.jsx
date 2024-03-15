import { useState, useEffect } from "react";
import { getTrendingMovies } from "../servise-api.js";
import MovieList from "../components/MovieList/MovieList.jsx";

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
      window.location.href = `/movies/${movieId}`;
    } catch (error) {
      console.error("Error handling movie click:", error);
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
        <b>No trending movies found.</b>
      )}
    </div>
  );
};

export default HomePage;
