import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token"); // cek token di localStorage
  return token ? children : <Navigate to="/" />; // redirect kalau tidak ada token
}
