import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation(); // Retrieve email and phone from signup.
  const toast = useToast();
  const handleVerify = async () => {
    try {
      const response = await axios.post(
        "https://techbams-server.onrender.com/api/auth/verifyOtp",
        {
          email: state.email,
          otp,
        }
      );

      if (response.status) {
        toast({
          title: "Verification Successful",
          description: "Your account has been verified.",
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
        navigate("/signin"); // Redirect to home or another page.
      } else {
        toast({
          title: "Invalid OTP",
          description: "Please try again with the correct OTP.",
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      // Show error toast
      toast({
        title: "Error",
        description:
          "An error occurred while verifying your OTP. Please try again.",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
      <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-[#0093DD] mb-4 text-center">
          Verify OTP
        </h2>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0093DD]"
          placeholder="Enter OTP"
        />
        <button
          onClick={handleVerify}
          className="w-full bg-[#0093DD] text-white py-2 rounded-md mt-4 hover:bg-[#007bbd] transition"
        >
          Verify
        </button>
      </div>
    </div>
  );
}
