import React, { useEffect, useState } from "react";
import logo from "./assets/logo2.png";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  const [title, settitle] = useState([]);
  const toast = useToast();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://techbams-server.onrender.com/api/courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); // API endpoint
        // setCourses(response.data);
        const titles = response.data.map((course) => course.title); // Extract titles
        settitle(titles); // Set state with titles
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast({
          title: "Error",
          description: "Failed to load courses.",
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchCourses();
  }, [toast]);
  return (
    <aside className="fixed top-0 left-0 w-[20%] bg-blue-500 shadow-lg h-full overflow-y-auto">
      <div className="flex flex-col items-center py-6">
        <img
          src={logo}
          alt="logo"
          className="h-[40px] md:h-[70px] hidden md:flex"
        />
        <h2 className="text-xl font-semibold text-white">All Our Courses</h2>
        <div className="space-y-4 mt-4 w-full px-6">
          {title.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left px-4 py-2 rounded-lg transition text-white ${
                selectedCategory === category
                  ? "bg-blue-400 text-white"
                  : "hover:bg-blue-400 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
