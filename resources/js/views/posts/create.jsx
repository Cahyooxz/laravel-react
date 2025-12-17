import { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function PostCreate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/api/posts", { title, content });
    navigate("/posts");
  };

  return (
    <div className="container mt-4">
      <h2>Create Post</h2>

      <form onSubmit={submit}>
        <input className="form-control mb-2"
          placeholder="Title"  required
          onChange={e => setTitle(e.target.value)}
        />
        <textarea className="form-control mb-2"
          placeholder="Content" required
          onChange={e => setContent(e.target.value)}
        ></textarea>
        <button className="btn btn-success" onClick={() => navigate('/')}>close</button>
        <button className="btn btn-success">Save</button>
      </form>
    </div>
  );
}
