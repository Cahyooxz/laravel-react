import { Routes, Route } from "react-router-dom";

import PostIndex from "./views/posts/index.jsx";
import PostCreate from "./views/posts/create.jsx";
import PostEdit from "./views/posts/edit.jsx";
import Login from "./views/login.jsx";
import PrivateRoute from "./PrivateRouteJwt.jsx"; // sudah diimport

export default function AppRoutes() {
  return (
    <Routes>
      {/* route login tetap terbuka */}
      <Route path="/" element={<Login />} />

      {/* route yang diproteksi */}
      <Route
        path="/posts"
        element={
          <PrivateRoute>
            <PostIndex />
          </PrivateRoute>
        }
      />
      <Route
        path="/posts/create"
        element={
          <PrivateRoute>
            <PostCreate />
          </PrivateRoute>
        }
      />
      <Route
        path="/posts/edit/:id"
        element={
          <PrivateRoute>
            <PostEdit />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
