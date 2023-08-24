import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updateReaction } from "../features/posts/postsSlice";

const reactionsObj = {
  wow: "😮",
  like: "👍🏻",
  love: "❤️",
};

function ReactionsBtns({ reactions, postId }) {
  const dispatch = useDispatch();

  const renderReactionsBtns = Object.entries(reactionsObj).map(
    ([key, value]) => {
      return (
        <button
          className="reactionButton"
          key={key}
          onClick={() =>
            dispatch(updateReaction({ id: postId, reaction: key }))
          }
        >
          {value}
          {reactions[key]}
        </button>
      );
    }
  );
  return (
    <div
      className="reactions"
      style={{
        borderTop: "1px solid rgb(189, 189, 189)",
        paddingTop: "10px",
        marginTop: "10px",
      }}
    >
      {renderReactionsBtns}
    </div>
  );
}

ReactionsBtns.propTypes = {
  reactions: PropTypes.object,
  postId: PropTypes.number,
};

export default ReactionsBtns;
