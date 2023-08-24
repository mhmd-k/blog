import { useState } from "react";
import { addNewPost } from "../features/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllusers } from "../features/users/usersSlice";
import { Container, Stack, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { MenuItem, Button, Select } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Typography from "@mui/material/Typography";

function AddPost() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
  });

  const users = useSelector(getAllusers);

  const dispatch = useDispatch();

  function handleChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit() {
    const user = users.find((e) => e.name === formData.author);
    const userId = user.id;
    dispatch(
      addNewPost({ title: formData.title, body: formData.content, userId })
    );
    setFormData({
      title: "",
      author: "",
      content: "",
    });
  }

  const authorOptions = users.map((user) => (
    <MenuItem key={user.id} value={user.name}>
      {user.name}
    </MenuItem>
  ));

  const disabled = ![formData.author, formData.title, formData.content].every(
    (value) => value
  );

  return (
    <Container style={{ marginTop: 40 }} maxWidth={"md"}>
      <Typography variant="h4" align="center" component="h2">
        Create a new Post
      </Typography>
      <Stack spacing={2}>
        <TextField
          name="title"
          id="filled-basic"
          label="Title"
          variant="standard"
          value={formData.title}
          onChange={handleChange}
        />
        <FormControl value={formData.author} fullWidth>
          <InputLabel id="demo-simple-select-label">Author</InputLabel>
          <Select
            value={formData.author}
            onChange={handleChange}
            label="author"
            name="author"
          >
            {authorOptions}
          </Select>
        </FormControl>
        <TextField
          label="Description"
          multiline
          rows={4}
          variant="standard"
          name="content"
          onChange={handleChange}
          value={formData.content}
        />
        <Button
          disabled={disabled}
          onClick={handleSubmit}
          variant="contained"
          color="success"
          endIcon={<AddCircleOutlineIcon />}
        >
          Add Post
        </Button>
      </Stack>
    </Container>
  );
}

export default AddPost;
