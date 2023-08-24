import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllusers } from "../features/users/usersSlice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteModale from "../components/DeleteModal";
import { updatePost } from "../features/posts/postsSlice";

function PostPage() {
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState(useLocation().state.post);

  const users = useSelector(getAllusers);

  const dispatch = useDispatch();

  const handleOpenClose = () => {
    setOpen(!open);
  };

  const authorOptions = users.map((user) => (
    <MenuItem key={user.id} value={user.name}>
      {user.name}
    </MenuItem>
  ));

  const handleChange = (event) => {
    setPost((prevPost) => ({
      ...prevPost,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    if (edit) {
      const user = users.find((user) => user.name === post.author);
      const userId = user.id;
      dispatch(updatePost({ ...post, userId }));
    }
    setEdit(!edit);
  };

  if (!post) {
    return <>post not found</>;
  }

  return (
    <>
      <Container maxWidth={"sm"}>
        <Card sx={{ minWidth: 275, marginTop: "40px" }}>
          <CardContent>
            {edit ? (
              <Stack spacing={3}>
                <TextField
                  onChange={handleChange}
                  value={post?.title}
                  name="title"
                  label="Title"
                  variant="standard"
                  sx={{ fontSize: "16px" }}
                ></TextField>
                <TextField
                  onChange={handleChange}
                  label="Description"
                  multiline
                  rows={4}
                  variant="standard"
                  name="body"
                  value={post?.body}
                />
                <FormControl value={post?.author} fullWidth>
                  <InputLabel id="demo-simple-select-label">Author</InputLabel>
                  <Select
                    label="author"
                    name="author"
                    value={post?.author}
                    onChange={handleChange}
                  >
                    {authorOptions}
                  </Select>
                </FormControl>
              </Stack>
            ) : (
              <Stack spacing={2}>
                <Typography sx={{ fontSize: "16px" }} gutterBottom>
                  {post?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post?.body}
                </Typography>
                <Typography variant="body2">by {post?.author}</Typography>
              </Stack>
            )}
          </CardContent>
          <Stack
            direction="row"
            spacing={1}
            style={{ justifyContent: "end", padding: "10px" }}
          >
            <IconButton
              onClick={handleSubmit}
              size="small"
              aria-label="edit"
              title={edit ? "done" : "edit"}
              sx={{ color: edit ? "#00b0ff" : "#1de9b6" }}
            >
              {edit ? <CheckCircleIcon /> : <EditIcon />}
            </IconButton>
            <IconButton
              onClick={handleOpenClose}
              size="small"
              aria-label="delete"
              title="delete"
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Card>
      </Container>
      <DeleteModale
        postId={post.id}
        open={open}
        handleOpenClose={handleOpenClose}
      />
    </>
  );
}

export default PostPage;
