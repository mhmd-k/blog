import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchUsers } from "../users/usersSlice";

const initialState = {
  posts: [],
  status: "idel", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchUsers", async () => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      resolve(response.data);
    }, 2000); // Delay of 2 seconds (2000 milliseconds)
  });
});

export const addNewPost = createAsyncThunk("posts/addNewPost", async (post) => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    post
  );
  return response.data;
});

export const updatePost = createAsyncThunk("posts/updatePost", async (post) => {
  try {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${post.id}`,
      post
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return post;
  }
});

export const deletePost = createAsyncThunk("posts/deletePost", async (post) => {
  try {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${post.id}`
    );
    if (response.status === 200) return post;
    return `${response.status}: ${response.statusText}`;
  } catch (err) {
    return err;
  }
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updateReaction: (state, action) => {
      const post = state.posts.find((post) => post.id === action.payload.id);
      post.reactions[action.payload.reaction]++;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.posts = action.payload.map((post) => ({
        ...post,
        date: new Date().toISOString(),
        reactions: {
          wow: 0,
          like: 0,
          love: 0,
        },
      }));
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      state.posts = [
        {
          ...action.payload,
          id: state.posts.length + 1,
          date: new Date().toISOString(),
          reactions: {
            wow: 0,
            like: 0,
            love: 0,
          },
        },
        ...state.posts,
      ];
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      if (!action.payload?.id) {
        console.log("error");
        return;
      }
      const { id } = action.payload;
      state.posts = state.posts.filter((post) => post.id !== id);
      state.posts = [action.payload, ...state.posts];
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      console.log(action.payload);
      if (!action.payload?.id) {
        state.error = "error deleting the post";
        return;
      }
      const { id } = action.payload;
      state.posts = state.posts.filter((post) => post.id !== id);
    });
  },
});

export const getAllPosts = (state) => state.posts;

export const { updateReaction } = postsSlice.actions;

export default postsSlice.reducer;
