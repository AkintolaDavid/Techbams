import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaChevronRight, FaDownload } from "react-icons/fa";
import coursesData from "./mockCourses";

const SectionDetails = () => {
  const { id, sectionIndex } = useParams();
  const course = coursesData.find((course) => course.id === parseInt(id));
  const [isPassed, setIsPassed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // Track current video time

  if (!course) {
    return <p className="text-center text-red-500">Course not found!</p>;
  }

  const section = course.sections[sectionIndex];
  if (!section) {
    return <p className="text-center text-red-500">Section not found!</p>;
  }

  const { title, description, videoUrl, resources } = section;

  // Define the video milestones
  const milestones = [
    { time: 60, description: "How to use React" },
    { time: 120, description: "Using Components" },
    { time: 180, description: "State Management in React" },
    // Add more milestones as needed
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-black text-blue-500 px-3 sm:px-5 py-6 flex items-center">
        <nav className="text-[13px] flex items-center gap-[6px] sm:gap-2">
          <Link to="/home" className="hover:text-gray-400">
            Home
          </Link>
          <FaChevronRight />
          <Link to={`/course/${id}`} className="hover:text-gray-400">
            {course.title}
          </Link>
          <FaChevronRight />
          <Link
            to={`/course/${id}/sections/${sectionIndex}`}
            className="hover:text-gray-400"
          >
            Course Sections
          </Link>
          <FaChevronRight />
          <span>{title}</span>
        </nav>
      </div>

      {/* Section Content */}
      <div className="p-6 sm:p-12 bg-white">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-gray-600 mb-6">
          {description || "No description available."}
        </p>

        {/* Video Player */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Watch the Video</h2>
          <p className="text-gray-600 mb-4">
            This video explains key concepts about the section.
          </p>
          <video
            className="w-full h-auto rounded-lg shadow-lg"
            controls
            onTimeUpdate={(e) => {
              setCurrentTime(e.target.currentTime); // Update the current time
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Current Time Milestone */}
          <div className="mt-4 text-lg font-semibold text-gray-700">
            Current Time: {Math.floor(currentTime)}s
          </div>
        </div>
        {/* Downloadable Resources */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Resources</h2>
          <ul className="flex flex-wrap items-center gap-4">
            {resources?.length > 0 ? (
              resources.map((resource, index) => (
                <li key={index} className="flex items-center gap-2">
                  <FaDownload className="text-blue-500" />
                  <a
                    href={resource.link}
                    download
                    className="text-blue-500 hover:underline"
                  >
                    {resource.name}
                  </a>
                </li>
              ))
            ) : (
              <p>No resources available for this section.</p>
            )}
          </ul>
        </div>
        {/* Milestones List */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-2">Important Milestones</h2>
          <ul className="space-y-2">
            {milestones.map((milestone, index) => (
              <li key={index} className="flex items-center gap-2">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => setCurrentTime(milestone.time)}
                >
                  {new Date(milestone.time * 1000).toISOString().substr(14, 5)}{" "}
                  - {milestone.description}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Quiz Section */}
        <div className="mb-2 mt-8">
          <h2 className="text-2xl font-bold mb-2">Quiz</h2>
          <p className="text-gray-600 mb-2">
            Mock questions can be added here later. For now, you can pass the
            user manually.
          </p>
          <button
            className={`px-4 py-2 text-white rounded-md ${
              isPassed ? "bg-green-500" : "bg-blue-500"
            }`}
            onClick={() => setIsPassed(true)}
          >
            {isPassed ? "Passed" : "Pass Assessment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionDetails;
