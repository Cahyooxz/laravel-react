import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

// Shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // track loading
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); // mulai loading
    try {
      const res = await api.post("/api/login", { email, password });
      localStorage.setItem("token", res.data.access_token);
      
      // optional delay biar animasi terlihat
      setTimeout(() => {
        navigate("/posts");
      }, 500);
    } catch (err) {
      setLoading(false);
      alert("Login gagal: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap -mx-2 my-auto h-screen items-center justify-center">
        <div className="w-full px-2 hidden md:block md:w-1/2">
          <div className="flex items-center justify-center">
            <img src="../assets/dashboard.png" alt="" className="w-100 md:w-50 lg:w-70"/>
          </div>
        </div>
        <div className="w-full px-2 sm:w-full md:w-1/2">
          <div className="min-h-screen flex items-center justify-center"> 
            <Card className="w-full max-w-md p-6 shadow-lg relative">
              <h2 className="text-xl font-bold mb-6 text-center">Login</h2>
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="mb-2">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="mb-2">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full mt-2 bg-purple-950 text-white hover:bg-purple-900 hover:text-amber-50"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                      Loading...
                    </span>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
