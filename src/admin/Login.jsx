import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/adminAuthService";
import useAuth from "../hooks/useAuth";

const Login = () => {

  const { login } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try{
      const data = await adminLogin(email, password);

      await login(data);
      navigate("/admin/dashboard")
    }catch(err){
      alert(err.message);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 bg-zinc-900 text-white flex flex-col justify-center items-center px-16">
        <h1 className="text-6xl font-playwrite mb-6">
          aria
        </h1>

        <h2 className="text-3xl font-semibold mb-4">
          Admin Panel
        </h2>

        <p className="text-gray-400 text-center max-w-md">
          Manage products, categories, orders, customers, and inventory
          from one secure dashboard.
        </p>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-500 mb-8">
            Sign in to your admin account
          </p>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="admin@aria.com"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              className="w-full bg-zinc-900 text-white py-3 rounded-lg hover:bg-zinc-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;