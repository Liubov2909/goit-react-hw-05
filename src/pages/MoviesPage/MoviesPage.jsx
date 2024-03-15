import { useState, useEffect } from "react";
import { getMoviesByKeyword } from "../../servise-api";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams, useLocation } from "react-router-dom";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlKeyword = searchParams.get("keyword");

  useEffect(() => {
    const handleSearch = async (query) => {
      try {
        const results = await getMoviesByKeyword(query);
        if (results.length === 0) {
          setSearchError("No movies found.");
        } else {
          setSearchError("");
          setSearchResults(results);
          setSearchParams({ keyword: query });
        }
      } catch (error) {
        console.error("Error searching movies:", error);
        setSearchError("Error searching movies. Please try again later.");
      }
    };

    if (urlKeyword) {
      setKeyword(urlKeyword);
      handleSearch(urlKeyword);
    }
  }, [urlKeyword, setSearchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      setSearchError("Please enter a movie title.");
      return;
    }

    try {
      const results = await getMoviesByKeyword(keyword);
      if (results.length === 0) {
        setSearchError("No movies found.");
      } else {
        setSearchError("");
        setSearchResults(results);
        setSearchParams({ keyword });
        setKeyword("");
      }
    } catch (error) {
      console.error("Error searching movies:", error);
      setSearchError("Error searching movies. Please try again later.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.input}
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter a movie title"
        />
        <button type="submit" className={css.btn}>
          Search
        </button>
      </form>
      {searchError && <p className={css.error}>{searchError}</p>}
      <MovieList
        movies={searchResults}
        from={location}
        prevLocation="/movies"
      />
    </div>
  );
};

export default MoviesPage;
