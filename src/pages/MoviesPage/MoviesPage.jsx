import { useState, useEffect } from "react";
import { getMoviesByKeyword } from "../../servise-api";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const urlKeyword = searchParams.get("keyword");

  useEffect(() => {
    if (urlKeyword) {
      setKeyword(urlKeyword);
      handleSearch(urlKeyword);
    }
  }, [urlKeyword]);

  const handleSearch = async (query) => {
    try {
      const results = await getMoviesByKeyword(query);
      if (results.length === 0) {
        setSearchError("No movies found.");
      } else {
        setSearchError("");
        setSearchResults(results);
      }
      setSearchParams({ keyword: query });
    } catch (error) {
      console.error("Error searching movies:", error);
      setSearchError("Error searching movies. Please try again later.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      setSearchError("Please enter a movie title.");
      return;
    }
    setSearchResults([]);
    handleSearch(keyword);
    setKeyword("");
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
      <MovieList movies={searchResults} />
    </div>
  );
};

export default MoviesPage;
