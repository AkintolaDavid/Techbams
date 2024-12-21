import React, { useState } from "react";
import axios from "axios"; // Import axios
import { useToast } from "@chakra-ui/react";
import { FaArrowLeftLong } from "react-icons/fa6";
import logo from "./assets/logo2.png";
import { useNavigate } from "react-router-dom";

const ContactUsElite = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      console.log(token);
      console.log(formData);
      const response = await axios.post(
        "https://techbams-server.onrender.com/api/contact",
        formData
      );

      if (response.status === 200) {
        toast({
          title: "Message Sent!",
          description: "We will get back to you shortly.",
          status: "success",
          position: "top-right",
          duration: 3000,
          isClosable: true,
        });
        setFormData({ name: "", email: "", number: "", message: "" }); // Clear the form
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Message sending failed. Please try again.",
        status: "error",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <FaArrowLeftLong
        className="w-6 h-6 sm:w-8 sm:h-8 text-black absolute top-10 left-10 cursor-pointer"
        onClick={() => navigate(-1)}
      />
      <div className="w-[90%] sm:w-[500px] md:w-[550px] lg:w-[700px] bg-blue-500 rounded-lg shadow-2xl p-8 md:p-12">
        <div className="w-full flex justify-center items-center">
          <img src={logo} className="h-[70px] md:h-[100px] " alt="Logo" />
        </div>
        <h2 className="text-4xl font-extrabold text-center mb-6 text-white">
          Get in Touch
        </h2>
        <p className="text-center text-white mb-8">
          Reach out to us with any questions, and we'll get back to you shortly.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 border-[2px] border-blue-500 focus:outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 border-[2px] border-blue-500 focus:outline-none"
              required
            />
            <input
              type="tel"
              name="number"
              placeholder="Phone Number"
              value={formData.number}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 border-[2px] border-blue-500 focus:outline-none"
              required
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 border-[2px] border-blue-500 focus:outline-none md:col-span-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white hover:bg-blue-300 hover:text-white text-blue-500 font-bold py-3 rounded-lg transition transform hover:scale-105 duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsElite;
