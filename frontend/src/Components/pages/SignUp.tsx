import { useState } from "react";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";

interface ApiErrorResponse {
  message: string;
}
const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate=useNavigate()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/register", form);
      alert("Registration successful.");
      navigate("/login")
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
    <div className="flex items-center justify-center mt-20">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create your account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              name="name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg text-lg font-medium hover:opacity-90 transition"
          >
            CREATE ACCOUNT
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Have an Account?{" "}
         <Link to={"/login"}><span className="text-blue-500 cursor-pointer">LOGIN</span></Link> 
        </p>
      </div>
    </div>
  );
};

export default SignUp;
