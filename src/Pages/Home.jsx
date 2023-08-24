import { Container } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, fetchPosts } from "../features/posts/postsSlice";
import Post from "../components/Post";
import LazyPost from "../components/LazyPost";
import IconButton from "@mui/material/IconButton";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Home() {
  const { posts, status, error } = useSelector(getAllPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idel") {
      dispatch(fetchPosts());
    }
  });

  let content;
  if (status === "loading") {
    content = (
      <>
        <LazyPost />
        <LazyPost />
      </>
    );
  } else if (status === "succeeded") {
    const renderPosts = posts.map((post) => <Post key={post.id} {...post} />);
    content = <>{renderPosts}</>;
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <>
      <Container maxWidth={"sm"}>{content}</Container>
      <Link to="addPost">
        <IconButton
          aria-label="add"
          sx={{
            bgcolor: "#2196f3 !important",
            position: "fixed",
            right: "4%",
            bottom: "4%",
            color: "white",
            fontSize: "40px",
          }}
        >
          <Add fontSize="inherit" />
        </IconButton>
      </Link>
      ;
    </>
  );
}

export default Home;
