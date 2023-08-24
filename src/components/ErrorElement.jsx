import { useSelector } from "react-redux";
import { getAllPosts } from "../features/posts/postsSlice";

function ErrorElement() {
  const { error } = useSelector(getAllPosts);

  return (
    <div>
      <h2>{error.message}</h2>
      <p>code: {error.code}</p>
    </div>
  );
}

export default ErrorElement;
