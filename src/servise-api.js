import axios from "axios";


const baseUrl = 'https://image.tmdb.org/t/p/w500/';

export const getMovies = async () => {
  const options = {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTcyNzExMmRjMTBjYWEyMmFiNjY5MWE1NThkZTAwNCIsInN1YiI6IjY1ZTZmNmM5NjMzMmY3MDE3YzkxYTQ0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J5lYpWygdy19FoumUtmuiDFtb7Jp_vkTrSUL8s60MJU'
    }
  };
  try {
    const response = await axios.get(options);
    const moviesWithFullPosterPaths = response.data.results.map(movie => ({
      ...movie,
      poster_path: baseUrl + movie.poster_path
    }));
    return moviesWithFullPosterPaths;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};


export const getTrendingMovies = async () => {
  const url = 'https://api.themoviedb.org/3/trending/movie/day';
  const options = {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTcyNzExMmRjMTBjYWEyMmFiNjY5MWE1NThkZTAwNCIsInN1YiI6IjY1ZTZmNmM5NjMzMmY3MDE3YzkxYTQ0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J5lYpWygdy19FoumUtmuiDFtb7Jp_vkTrSUL8s60MJU'
    }
  };

  try {
    const response = await axios.get(url, options);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

export const getMoviesByKeyword = async (keyword) => {
  const url = `https://api.themoviedb.org/3/search/movie`;
  const params = {
      query: keyword,
      api_key: "aa727112dc10caa22ab6691a558de004"
  };

  try {
    const response = await axios.get(url, { params });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies by keyword:", error);
    return [];
  }
};

export const getMovieReviews = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
  const options = {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTcyNzExMmRjMTBjYWEyMmFiNjY5MWE1NThkZTAwNCIsInN1YiI6IjY1ZTZmNmM5NjMzMmY3MDE3YzkxYTQ0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J5lYpWygdy19FoumUtmuiDFtb7Jp_vkTrSUL8s60MJU"
    }
  };

  try {
    const response = await axios.get(url, options);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    return [];
  }
};

export const getMovieDetails = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}`;
  const options = {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTcyNzExMmRjMTBjYWEyMmFiNjY5MWE1NThkZTAwNCIsInN1YiI6IjY1ZTZmNmM5NjMzMmY3MDE3YzkxYTQ0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J5lYpWygdy19FoumUtmuiDFtb7Jp_vkTrSUL8s60MJU"
    }
  };

  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

export const getMovieCredits = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  const options = {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTcyNzExMmRjMTBjYWEyMmFiNjY5MWE1NThkZTAwNCIsInN1YiI6IjY1ZTZmNmM5NjMzMmY3MDE3YzkxYTQ0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J5lYpWygdy19FoumUtmuiDFtb7Jp_vkTrSUL8s60MJU"
    }
    }

  try {
    const response = await axios.get(url, options);
    return response.data.cast;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    return [];
  }
};


