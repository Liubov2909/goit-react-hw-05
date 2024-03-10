import axios from "axios";

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export const getTrendingMovies = async() => {
  const response = await axios.get("trending/movie/day",
  {
    headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDk3YWNmY2JiMDUzYjBlODcwMmZhZDY1Mzc0OTM4ZiIsInN1YiI6IjY1ZDBhZjZjMWQzMTQzMDE4NGJhMWIxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-BvX4OF2A1Bvvo_nFUQyFPBFoWdgy3JZZJ61-IhEeLc",
        },
  })
  return response.data;
}

export const getReviews = async (id) => {
  const response = await axios.get(`/movies/${id}/reviews?language=en-US&page=1`,
  {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDk3YWNmY2JiMDUzYjBlODcwMmZhZDY1Mzc0OTM4ZiIsInN1YiI6IjY1ZDBhZjZjMWQzMTQzMDE4NGJhMWIxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-BvX4OF2A1Bvvo_nFUQyFPBFoWdgy3JZZJ61-IhEeLc",
        },
      });
  return response.data;
}
