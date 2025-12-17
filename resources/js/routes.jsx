import { Routes, Route } from "react-router-dom";

import PostIndex from "./views/posts/index.jsx";
import PostCreate from "./views/posts/create.jsx";
import PostEdit from "./views/posts/edit.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PostIndex />} />
      <Route path="/posts/create" element={<PostCreate />} />
      <Route path="/posts/edit/:id" element={<PostEdit />} />
    </Routes>
  );
}
