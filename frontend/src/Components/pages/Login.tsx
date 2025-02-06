import { useState } from "react";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
interface ApiErrorResponse {
  message: string;
}

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
   const { fetchUsers } = useAuth();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res=await axios.post("http://localhost:8080/api/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Login successful.");
      fetchUsers()
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        const errorMessage =
          axiosError.response?.data?.message || "Something went wrong!";
        alert(errorMessage);
      } else {
        alert("Something went wrong!");
      }
    }
  };
  return (
    <div className="flex items-center justify-center mt-20 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-2">Login</h2>
        <p className="text-gray-600 text-center mb-6">
          Welcome back to ECOMMERCE
          <br /> The next-gen business marketplace
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-9 text-sm text-blue-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button type="submit" className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800">
            LOGIN
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don’t have an Account?{" "}
          <Link to={"/register"}><span className="text-blue-500 cursor-pointer">SIGN UP</span></Link>
          
        </p>
      </div>
    </div>
  );
};

export default Login;
