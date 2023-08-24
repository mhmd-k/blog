import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getAllPosts } from "../features/posts/postsSlice";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

function DeleteModal({ postId, open, handleOpenClose }) {
  const dispatch = useDispatch();
  const { error } = useSelector(getAllPosts);
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deletePost({ id: postId }));
    navigate("..");
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this post?
            {error}
          </Typography>
          <Stack
            paddingTop={2}
            spacing={2}
            direction={"row"}
            justifyContent={"center"}
          >
            <Button variant="contained" on onClick={handleOpenClose}>
              cancle
            </Button>
            <Button onClick={handleDelete} variant="contained" color="error">
              delete
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

DeleteModal.propTypes = {
  postId: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  handleOpenClose: PropTypes.func.isRequired,
};

export default DeleteModal;
