import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

export default function PasswordVerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  // Extract email from location.state
  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!email) {
      toast({
        title: "Error",
        description: "Email is missing. Please retry the process.",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      navigate("/forgot-password"); // Redirect back to forgot-password if email is not present
    }
  }, [email, navigate, toast]);

  const handleVerify = async () => {
    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Send OTP verification request to the backend
      const response = await axios.post(
        "https://techbams-server.onrender.com/api/auth/verify-otp",
        { email, otp }
      );

      if (response.status === 200) {
        toast({
          title: "OTP Verified",
          description: "Your account has been verified.",
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
        navigate("/reset-password", { state: { email } }); // Pass email to reset password page
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to verify OTP.";
      setError(errorMessage);
      toast({
        title: "Verification Failed",
        description: errorMessage,
        status: "error",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
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
          <h2 className="text-2xl font-semibold text-[#0093DD] mb-4">
            Verify OTP
          </h2>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerify();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0093DD]"
              placeholder="Enter 6-digit OTP"
              maxLength={6}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0093DD] text-white py-2 rounded-md hover:bg-[#007bbd] transition"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
