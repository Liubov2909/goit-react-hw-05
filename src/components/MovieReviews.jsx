import { useEffect, useState } from "react";
import { getReviews } from "../serviseApi";
import { useSearchParams } from "react-router-dom";

export const MovieReviews = () => {
  const { id } = useSearchParams();
  const [reviews, setReviews] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoader(true);
      try {
        const response = await getReviews(id);
        setReviews(response);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    getData();
  }, [id]);

  return (
    <div>
      <h1>Reviews</h1>
      {loader && <b>Loading page...</b>}
      {reviews.lentgh !== 0 ? (
        <ul>
          {reviews.map((i) => (
            <li key={i.id}>
              <h2>Autor: {i.autor}</h2>
              <p> {i.content} </p>
            </li>
          ))}
        </ul>
      ) : (
        <b>We don't have any reviews for this movie</b>
      )}
      {error && <b>HTML error!</b>}
    </div>
  );
};

export default MovieReviews;
