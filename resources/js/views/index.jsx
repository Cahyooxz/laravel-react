import { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

export default function postIndex(){
  const[posts, setPosts] = useState([]); // useState untuk menyimpan data yang berubah-ubah di component.
  const[search, setSearch] = useState([]);

const fetchPosts = async () => {
  const res = await api.get(`/api/posts?search=${search}`);
  setPosts(res.data.data);
};


  
  const deletePost = async (id) => {
    if (!confirm("Delete this post?")) return;
    await api.delete(`/api/posts/${id}`);
    fetchPosts();
  };

// useEffect untuk melakukan sesuatu saat component mount, update, atau unmount. menjalankan efek samping 
// Contoh: fetch data dari API, subscribe event, set timer, manipulasi DOM.

  useEffect(() => { 
    fetchPosts();
  }, [search]); // <- panggil ulang saat search berubah


  return (
    <div className="container mt-4">
       <input
        className="form-control mb-2"
        placeholder="Search title..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <p>{search}</p>
      <Link to="/posts/create" className="btn btn-success mb-3">
      APP POST
      </Link>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Action</th>
          </tr>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <Link to={`/posts/edit/${post.id}`}>Edit</Link>
                  <Link onClick={() => deletePost(post.id)} className="btn btn-sm btn-danger">delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </thead>
      </table>
    </div>
  )
}