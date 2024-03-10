import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div>
      <b>Ooops! Not found page!</b>
      <Link to="/">Back to Home page!</Link>
    </div>
  );
};

export default NotFoundPage;
