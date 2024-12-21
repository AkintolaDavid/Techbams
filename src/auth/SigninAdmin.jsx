import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import logo from "../assets/logo.png";
export default function SigninAdmin() {
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Enter email, 2: Enter OTP

  const handleEmailSubmit = async () => {
    try {
      const response = await axios.post(
        "https://techbams-server.onrender.com/api/admin/send-otp",
        { email }
      );
      if (response.status === 200) {
        toast({
          title: "OTP Sent",
          description: "Check your email for the OTP.",
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
        setStep(2);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to send OTP. Try again.",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post(
        "https://techbams-server.onrender.com/api/admin/verify-otp",
        { email, otp }
      );
      if (response.status === 200) {
        localStorage.setItem("admintoken", response.data.token);
        localStorage.setItem("adminrole", response.data.admin.role);
        toast({
          title: "Access Granted",
          description: "Welcome to the admin panel.",
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
        navigate("/admin/addcoursepage");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Invalid OTP. Try again.",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">
        {step === 1 ? (
          <>
            <img src={logo} alt="Logo" className="w-24 mb-6 ml-[36%]" />
            <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleEmailSubmit}
              className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <img src={logo} alt="Logo" className="w-24 mb-6 ml-[36%]" />
            <h2 className="text-2xl font-bold text-center mb-4">Verify OTP</h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleOtpSubmit}
              className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}
