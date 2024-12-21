import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaChevronRight,
} from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import axios from "axios"; // Import axios

const whatYouWillLearn = [
  "Introduction to React",
  "State and Props",
  "Component Lifecycle",
  "React Hooks",
  "Routing in React",
  "Advanced Topics",
  "Building a React Project",
  "React Hooks",
  "Routing in React",
  "Advanced Topics",
  "Building a React Project",
];

const CoursePage = () => {
  const { id } = useParams(); // Get course ID from URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch course data from the backend
    const fetchCourseData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://techbams-server.onrender.com/api/courses/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); // Replace with your backend endpoint
        setCourse(response.data); // Set course data
        setLoading(false); // Set loading to false
      } catch (err) {
        setError("Failed to load course data"); // Set error message
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  if (loading) {
    return <p className="text-center text-blue-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!course) {
    return <p className="text-center text-red-500">Course not found!</p>;
  }

  const { title, rating, lecturer, description, img, category } = course;

  // Render stars function
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-500" />
        ))}
        {halfStar && <FaStarHalfAlt key="half" className="text-yellow-500" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-gray-300" />
        ))}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-black text-white h-[40vh] flex flex-col justify-center px-5 sm:px-8 md:px-16">
        {/* Breadcrumb Navigation */}
        <nav className="text-sm mb-4 text-blue-500 flex items-center gap-2">
          <Link to="/home" className="hover:text-gray-400">
            Home
          </Link>
          <FaChevronRight />
          <span>{title}</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{title}</h1>
        <p className="text-base md:text-lg">{description}</p>
        <div className="flex items-center mb-4">
          <div className="flex items-center gap-1 text-sm md:text-base">
            {renderStars()}
          </div>
          <span className="text-yellow-500 ml-2 text-sm md:text-base">
            {rating.toFixed(1)}
          </span>
          <span className="text-gray-400 ml-2 text-sm md:text-base">
            (20 ratings)
          </span>
          <span className="mx-2 hidden md:flex">|</span>
          <span className="text-gray-400 text-sm md:text-base hidden md:flex">
            32 students enrolled
          </span>
        </div>
        <p className="text-gray-400 text-sm md:text-base">
          Created by <span className="text-blue-500">{lecturer}</span>
        </p>
        <p className="text-gray-400 text-sm md:text-base">
          Last updated: 11-01-2023
        </p>
        <p className="text-gray-400 text-sm md:text-base">Language: English</p>
        <Link to={`/course/${id}/sections/${id}`}>
          <button className="bg-blue-500 w-60 sm:w-80 rounded-md h-10 sm:h-12 font-medium mt-5">
            Proceed to course sections
          </button>{" "}
        </Link>
      </div>

      {/* Course Content */}
      <div className="bg-white w-full px-8 py-12 flex flex-col sm:flex-row">
        {/* Left Section */}
        <div className="w-full sm:w-3/5 border-2 border-gray-200 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">What You Will Learn</h2>
          <div className="h-[30vh] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
            {whatYouWillLearn.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <FaCheck className="text-green-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full sm:w-2/5 sm:ml-6 mt-8 sm:mt-0">
          {/* Video Preview */}
          <div className="mb-6">
            <video className="w-full h-auto rounded-lg shadow-lg" controls>
              <source
                src={course.videoUrl || "https://via.placeholder.com/640x360"}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Course Includes */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              What this course includes:
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>✔️ 12 hours of study time</li>
              <li>✔️ Full-time access</li>
              <li>✔️ 13 downloadable resources</li>
              <li>✔️ Accessible on both laptop and phone</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
