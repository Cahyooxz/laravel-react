import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";

export default function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    api.get(`/api/posts/${id}`).then((res) => {
      setTitle(res.data.title);
      setContent(res.data.content);
    });
  }, []);


  console.log(title, content

  );
  const submit = async (e) => {
    e.preventDefault();
    await api.put(`/api/posts/${id}`, { title, content });
    navigate("/posts");
  };

  return (
    <div className="container mt-4">
      <form onSubmit={submit}>
        <input className="form-control mb-2" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="form-control mb-2" value={content} onChange={(e) => setContent(e.target.value)} />
        <button className="btn btn-danger" onClick={() => navigate('/posts')}>Close</button>
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}
