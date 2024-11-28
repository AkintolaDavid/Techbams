import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

export default function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    const { email, password } = formData;
    try {
      const response = await axios.post(
        "https://techbams-server.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        // Save token and redirect
        localStorage.setItem("token", response.data.token);
        toast({
          title: "Login successful",
          description: "You are now logged in.",
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
        navigate("/home"); // Redirect to dashboard
      }
    } catch (error) {
      // Handle error cases
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast({
        title: "Login Failed",
        description: errorMessage,
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] relative">
      <FaArrowLeftLong
        className="w-6 h-6 sm:w-8 sm:h-8 text-black absolute top-10 left-10 cursor-pointer"
        onClick={() => navigate(-1)}
      />
      <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Logo" className="w-24 mb-6" />
          <h2 className="text-2xl font-semibold text-[#0093DD] mb-4">Login</h2>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0093DD]"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0093DD]"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-[#0093DD] text-white py-2 rounded-md hover:bg-[#007bbd] transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-sm text-center">
          New to the platform?{" "}
          <span
            className="text-[#0093DD] font-semibold cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </div>
        <div className="mt-4 text-sm text-center">
          <span
            className="text-[#0093DD] font-semibold cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </span>
        </div>
      </div>
    </div>
  );
}
