import { getTrendingMovies } from "../serviseApi/";
import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";

export const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoader(true);
      try {
        const response = await getTrendingMovies();
        setMovies(response);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {loader && <b>Loading page...</b>}
      {movies.length !== 0 && <MovieList movies={movies} />}
      {error && <b>HTML error!</b>}
    </div>
  );
};

export default HomePage;
