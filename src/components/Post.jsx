import PropTypes from "prop-types";
import { parseISO, formatDistance } from "date-fns";
import ReactionsBtns from "./ReactionsBtns";
import { useSelector } from "react-redux";
import { getAllusers } from "../features/users/usersSlice";
import { memo } from "react";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

let Post = ({ id, title, body, date, reactions, userId }) => {
  const users = useSelector(getAllusers);
  const author = users.find((e) => e.id === userId);

  return (
    <article>
      <Typography variant="h6" component="h3">
        {title}
      </Typography>
      <p>{body}</p>
      <Stack direction="row" justifyContent="space-between">
        <span>by {author?.name || "unknown author"}</span>
        <Link
          style={{
            color: "#2196f3",
            fontWeight: "bold",
            fontStyle: "italic",
          }}
          to={`./${id}`}
          state={{
            post: {
              id,
              title,
              body,
              date,
              reactions,
              userId,
              author: author?.name || "unknonw",
            },
          }}
        >
          view post
        </Link>
        <span className="post-date">
          {formatDistance(parseISO(date), new Date())} ago
        </span>
      </Stack>
      <ReactionsBtns reactions={reactions} postId={id} />
    </article>
  );
};

Post.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  date: PropTypes.string,
  reactions: PropTypes.object,
  id: PropTypes.number,
  userId: PropTypes.number,
};

Post = memo(Post);

export default Post;
