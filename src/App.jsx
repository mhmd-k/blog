import { Provider } from "react-redux";
import { store } from "./app/store";
import { fetchUsers } from "./features/users/usersSlice.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import AddPost from "./Pages/AddPost.jsx";
import Layout from "./components/Layout";
import PostPage from "./Pages/PostPage";
import ErrorElement from "./components/ErrorElement";

store.dispatch(fetchUsers());

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorElement />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        element: <AddPost />,
        path: "addPost",
      },
      { element: <PostPage />, path: ":id" },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
