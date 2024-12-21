import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaChevronRight, FaDownload } from "react-icons/fa";

const SectionDetails = () => {
  const { id, sectionIndex } = useParams();
  const [course, setCourse] = useState(null);
  const [section, setSection] = useState(null);
  const [isPassed, setIsPassed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // Track current video time
  const [loading, setLoading] = useState(true); // To show loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    // Fetch course details from the backend
    const fetchCourseData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://techbams-server.onrender.com/api/courses/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); // Your backend API endpoint
        if (!response.ok) {
          throw new Error("Course not found!");
        }
        const courseData = await response.json();
        setCourse(courseData);
        setSection(courseData.sections[sectionIndex]); // Get section by index
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id, sectionIndex]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!course || !section) {
    return <p className="text-center text-red-500">Section not found!</p>;
  }

  const { title, description, videoUrl, resources, timeline } = section;

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
        {/* Video Player */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Watch Section Video below</h2>
          {/* <p className="text-gray-600 mb-4">
            This video explains key concepts about the section.
          </p> */}
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
            {/* Current Time: {Math.floor(currentTime)}s */}
          </div>
        </div>

        {/* Downloadable Resources */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Resources</h2>
          <ul className="flex flex-wrap items-center gap-4">
            {resources?.length > 0 ? (
              resources.map((resource, index) => (
                <li key={index} className="flex items-center gap-2">
                  <a
                    href={resource.link}
                    download
                    className="text-blue-500 hover:underline"
                  >
                    {" "}
                    <FaDownload className="text-blue-500" />
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
            {timeline?.length > 0 ? (
              timeline.map((milestone, index) => (
                <li key={index} className="flex items-center gap-2">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => setCurrentTime(milestone.time)}
                  >
                    {milestone.time} - {milestone.note}
                  </button>
                </li>
              ))
            ) : (
              <p>No milestone for this course</p>
            )}
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
