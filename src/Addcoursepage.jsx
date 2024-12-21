import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
const Addcoursepage = () => {
  const fileInputRef = useRef(null);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [course, setCourse] = useState({
    title: "",
    description: "",
    rating: 0,
    lecturer: "",
    img: "",
    category: "",
    sections: [],
  });

  const [section, setSection] = useState({
    sectiontitle: "",
    sectiondescription: "",
    videoUrl: "",
    timeline: [],
    resources: [],
  });

  const [timeline, setTimeline] = useState({ time: "", note: "" });
  const [resource, setResource] = useState({ name: "", file: null, link: "" });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; // Get the uploaded file

    if (!file) {
      toast({
        title: "Please upload a course image",
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Make sure this key is "file"
    formData.append("upload_preset", "techbams"); // Replace with your Cloudinary preset
    formData.append("cloud_name", "dvdisnwqt"); // Replace with your Cloudinary cloud name

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dvdisnwqt/image/upload", // Correct Cloudinary URL for image upload
        formData
      );
      setCourse((prev) => ({ ...prev, img: response.data.secure_url }));
    } catch (error) {
      toast({
        title: "Error uploading image",
        description: "Please try again later.",
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsLoading(false); // Hide loader
      toast({
        title: "Section Image Added",
        status: "success",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
  };
  const handleVideoUpload = async (e) => {
    const file = e.target.files[0]; // Get the uploaded video file

    if (!file) {
      toast({
        title: "Please upload a section video",
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Make sure this key is "file"
    formData.append("upload_preset", "techbams"); // Replace with your Cloudinary preset
    formData.append("cloud_name", "dvdisnwqt"); // Replace with your Cloudinary cloud name

    try {
      setIsLoading(true); // Show loader
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dvdisnwqt/video/upload", // Correct Cloudinary URL for video upload
        formData
      );

      // Update the section state with the video URL
      setSection((prev) => ({ ...prev, videoUrl: response.data.secure_url }));

      toast({
        title: "Section Video Added",
        status: "success",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error uploading video",
        description: "Please try again later.",
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  // Handle changes in course input fields
  const handleCourseChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  // Handle changes in section input fields
  const handleSectionChange = (e) => {
    setSection({ ...section, [e.target.name]: e.target.value });
  };

  // Handle changes in timeline input fields
  const handleTimelineChange = (e) => {
    setTimeline({ ...timeline, [e.target.name]: e.target.value });
  };

  const handleResourceFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload.",
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "techbams");
    formData.append("cloud_name", "dvdisnwqt");

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dvdisnwqt/raw/upload",
        formData
      );

      const resourceUrl = response.data.secure_url;
      setResource((prev) => ({ ...prev, file, link: resourceUrl }));
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Error uploading resource. Please try again.",
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsLoading(false); // Hide loader
      toast({
        title: "Upload Successful",
        description: "Resource uploaded successfully.",
        status: "success",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  // Add a timeline to the current section
  const addTimeline = () => {
    if (timeline.time && timeline.note) {
      setSection((prev) => ({
        ...prev,
        timeline: [...prev.timeline, timeline],
      }));
      setTimeline({ time: "", note: "" }); // Reset timeline input fields
    } else {
      toast({
        title: "Fill both forms in Timeline",
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  // Add a resource to the current section
  const addResource = () => {
    if (resource.name && resource.link) {
      setSection((prev) => ({
        ...prev,
        resources: [...prev.resources, resource],
      }));
      setResource({ name: "", file: null, link: "" }); // Reset resource state
    } else {
      toast({
        title: "Incomplete Resource",
        description: "Please provide both name and file.",
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  // Add a section to the current course
  const addSection = () => {
    if (
      section.sectiontitle &&
      section.sectiondescription &&
      section.videoUrl
    ) {
      setCourse((prevCourse) => ({
        ...prevCourse,
        sections: [...prevCourse.sections, section],
      }));
      toast({
        title: "Section Added",
        status: "success",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
      fileInputRef.current.value = "";
      // Reset section and its associated timelines and resources after adding
      setSection({
        sectiontitle: "",
        sectiondescription: "",
        videoUrl: "",
        timeline: [],
        resources: [],
      });
    } else {
      toast({
        title: "Fill all forms in Section",
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  // Submit the course data to the server

  const addCourse = async () => {
    if (
      course.title &&
      course.description &&
      course.rating &&
      course.lecturer &&
      course.category &&
      course.img
    ) {
      try {
        const token = localStorage.getItem("admintoken");

        const response = await axios.post(
          "https://techbams-server.onrender.com/api/courses/addCourse",
          course,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in headers
            },
          }
        );

        // Success toast
        toast({
          title: "Course Added",
          description: response.data.message,
          status: "success",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });

        setCourse({
          title: "",
          description: "",
          rating: 0,
          lecturer: "",
          img: "",
          category: "",
          sections: [],
        });
      } catch (error) {
        // Handle and display error messages
        const errorMessage =
          error.response?.data?.message || "An unexpected error occurred.";

        toast({
          title: "Error Adding Course",
          description: errorMessage,
          status: "error",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      }
    } else {
      // Validation error toast
      toast({
        title: "Missing Fields in Course",
        description: "Please fill in all required fields.",
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Uploading...</h2>
            <p>Please wait while your file is being uploaded.</p>
          </div>
        </div>
      )}
      {/* Course Form */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Add Course</h2>
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={course.title}
          onChange={handleCourseChange}
          className="block w-full p-2 border mb-2"
        />
        <textarea
          name="description"
          placeholder="Course Description"
          value={course.description}
          onChange={handleCourseChange}
          className="block w-full p-2 border mb-2"
        ></textarea>
        <label>Course rating(1-5)</label>
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={course.rating}
          onChange={handleCourseChange}
          className="block w-full p-2 border mb-2"
        />
        <input
          type="text"
          name="lecturer"
          placeholder="Lecturer Name"
          value={course.lecturer}
          onChange={handleCourseChange}
          className="block w-full p-2 border mb-2"
        />
        <label>Course image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full p-2 border mb-2"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={course.category}
          onChange={handleCourseChange}
          className="block w-full p-2 border mb-4"
        />
        {/* Add Section Form */}
        <h3 className="text-lg font-semibold mb-2">Add Section</h3>
        <input
          type="text"
          name="sectiontitle"
          placeholder="Section Title"
          value={section.sectiontitle}
          onChange={handleSectionChange}
          className="block w-full p-2 border mb-2"
        />
        <textarea
          name="sectiondescription"
          placeholder="Section Description"
          value={section.sectiondescription}
          onChange={handleSectionChange}
          className="block w-full p-2 border mb-2"
        ></textarea>
        <label>Section video</label>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          className="block w-full p-2 border mb-4"
        />

        {/* Timeline */}
        <h4 className="text-md font-semibold mb-2">Add Timeline</h4>
        <input
          type="text"
          name="time"
          placeholder="Time:(2:40)"
          value={timeline.time}
          onChange={handleTimelineChange}
          className="block w-full p-2 border mb-2"
        />
        <input
          type="text"
          name="note"
          placeholder="Note:(Course overview)"
          value={timeline.note}
          onChange={handleTimelineChange}
          className="block w-full p-2 border mb-4"
        />
        <button
          onClick={addTimeline}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Timeline
        </button>
        <h4 className="text-md font-semibold mb-2">Add Resources</h4>
        {/* Input for Resource Name */}
        <input
          type="text"
          placeholder="Enter resource name"
          value={resource.name}
          onChange={(e) => setResource({ ...resource, name: e.target.value })}
          className="block w-full p-2 border mb-4"
        />
        {/* Input for Resource File */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleResourceFileUpload}
          className="block w-full p-2 border mb-4"
        />
        {/* Display Resource Link */}
        <p>Resource Link: {resource.link}</p>
        {/* Add Resource Button */}
        <div className="flex flex-col">
          {" "}
          <button
            onClick={addResource}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          >
            Add Resource
          </button>
          <button
            onClick={addSection}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Add Section
          </button>
          <button
            onClick={addCourse}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addcoursepage;
