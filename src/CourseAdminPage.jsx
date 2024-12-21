import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
export default function CourseAdminPage() {
  const [search, setSearch] = useState("");
  const [users, setusers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [modalType, setModalType] = useState(""); // 'email' or 'topic'
  const toast = useToast();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Course?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("admintoken");
      await axios.delete(
        `https://techbams-server.onrender.com/api/courses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setusers((prevDonations) =>
        prevDonations.filter((donation) => donation._id !== id)
      );
      toast({
        title: "Success",
        description: "Course deleted successfully.",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting Course:", error);
      toast({
        title: "Error",
        description: "Failed to delete the Course.",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("admintoken");
        const response = await axios.get(
          "https://techbams-server.onrender.com/api/courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setusers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast({
          title: "Error",
          description: "Failed to load users.",
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
    fetchUsers();
  }, [toast]);

  const handleViewSection = (userData) => {
    setModalContent(userData.sections);
    setModalType("section");
    setIsModalOpen(true);
  };

  const handleViewDescription = (userData) => {
    setModalContent(userData.description);
    setModalType("description");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent({});
    setModalType("");
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      String(value).toLowerCase().includes(search)
    )
  );
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const handlePagination = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentData = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      {" "}
      <span className="text-[#003E47] ml-10 font-semibold text-xl sm:text-2xl">
        Courses
      </span>{" "}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
          className="w-[600px] ml-10 px-4 mt-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003E47]"
        />
      </div>
      <div className="mx-10 my-5 px-4 bg-white rounded-xl ">
        {/* Scrollable Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border-b px-4 py-6 text-left text-[#303972]">
                  S/N
                </th>
                <th className="border-b px-4 py-6 text-left text-[#303972]">
                  Title
                </th>
                <th className="border-b px-4 py-6 text-left text-[#303972]">
                  Description
                </th>
                <th className="border-b px-4 py-6 text-left text-[#303972]">
                  Topics
                </th>
                <th className="border-b px-4 py-6 text-left text-[#303972]">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr
                  key={index + 1}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td className="border-b px-4 py-8 text-[#303972] font-bold text-base">
                    {index + 1}
                  </td>
                  <td className="border-b px-4 py-8 text-[#303972] font-bold text-base">
                    {item.title}
                  </td>
                  <td className="border-b px-4 py-8 text-[#303972] font-semibold text-base">
                    <button
                      onClick={() => handleViewDescription(item)}
                      className="text-white rounded-md bg-blue-800 py-2 px-4"
                    >
                      View Description
                    </button>
                  </td>

                  <td className="border-b px-4 py-8  font-semibold text-base">
                    <button
                      onClick={() => handleViewSection(item)}
                      className="text-white rounded-md bg-blue-800 py-2 px-4 mr-4"
                    >
                      View Topics
                    </button>
                  </td>
                  <td className="border-b px-4 py-8 text-center">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modals */}
        {isModalOpen && modalType === "section" && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">Sections</h2>
              <div>
                <ul>
                  {modalContent.map((section, index) => (
                    <li>
                      <div key={index} className="mb-4">
                        <h3 className="font-bold">
                          Section {index + 1} Title: {section.sectiontitle}
                        </h3>
                        <p>
                          Section {index + 1} Description:{" "}
                          {section.sectiondescription}
                        </p>
                      </div>
                    </li>
                  ))}{" "}
                </ul>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {isModalOpen && modalType === "description" && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">Tutors Email</h2>
              {modalContent}

              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-end items-center space-x-2 mr-10 py-6">
          <button
            onClick={() => handlePagination("prev")}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white "
            disabled={currentPage === 1}
          >
            <FaArrowAltCircleLeft className="text-[27px] text-[#4D44B5]" />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 rounded-full font-semibold ${
                currentPage === index + 1
                  ? "bg-[#4D44B5] text-white"
                  : "bg-gray-200 text-[#4D44B5]"
              } hover:bg-[#4D44B5] hover:text-white`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePagination("next")}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white "
            disabled={currentPage === totalPages}
          >
            <FaArrowAltCircleRight className="text-[27px] text-[#4D44B5]" />
          </button>
        </div>
      </div>
    </>
  );
}
