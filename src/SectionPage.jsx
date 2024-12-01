import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import coursesData from "./mockCourses";
import { FaChevronRight, FaCheckCircle } from "react-icons/fa";

const SectionPage = () => {
  const { id } = useParams(); // Get course ID from URL
  const course = coursesData.find((course) => course.id === parseInt(id)); // Find the course

  if (!course) {
    return <p className="text-center text-red-500">Course not found!</p>;
  }

  const { title, sections } = course;

  // This is where we can track whether the section is passed.
  const [passedSections, setPassedSections] = useState(
    new Array(sections.length).fill(false)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Course Header */}
      <div className="bg-black text-white h-[30vh] flex flex-col justify-center px-5 sm:px-8 md:px-16">
        {/* Breadcrumb Navigation */}
        <nav className="text-sm mb-4 text-blue-500 flex items-center gap-1 sm:gap-2">
          <Link to="/home" className="hover:text-gray-400">
            Home
          </Link>
          <FaChevronRight />
          <Link to={`/course/${id}`} className="hover:text-gray-400">
            {title}
          </Link>
          <FaChevronRight />
          <span>Course Sections</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
        <p className="text-gray-300">Explore all sections below</p>
        <div className=" py-3 sm:py-6">
          <Link
            to={`/course/${id}`}
            className="bg-blue-500 w-60 sm:w-80 rounded-md h-10 sm:h-12 text-white text-center flex items-center justify-center font-medium"
          >
            Go Back to Course
          </Link>
        </div>
      </div>

      {/* Sections List */}
      <div className="p-4 sm:p-8 bg-gray-200">
        <h2 className="text-2xl font-bold mb-6">Course Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{section.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {section.description || "No description provided."}
                  </p>
                </div>
                <FaCheckCircle
                  className={`mt-2 text-2xl ${
                    passedSections[index] ? "text-green-500" : "text-gray-300"
                  }`}
                />
              </div>
              <video
                className="w-full h-auto rounded-lg shadow-md mb-4"
                controls
              >
                <source src={section.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="flex justify-center">
                <Link
                  to={`/course/${id}/sections/${index}/details/0`}
                  className="bg-blue-500 w-full rounded-md h-10 sm:h-12 text-white text-center flex items-center justify-center font-medium"
                >
                  Go to this section
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionPage;
