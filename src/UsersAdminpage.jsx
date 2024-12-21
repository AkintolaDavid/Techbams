import React, { useEffect } from "react";
import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Indicator, useToast } from "@chakra-ui/react";
import axios from "axios";
import phone from "./assets/Phone.png";
import mail from "./assets/Mail.png";
import { FaTrashAlt } from "react-icons/fa";
export default function UsersAdminpage() {
  const [search, setSearch] = useState("");
  const [users, setusers] = useState([]);
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this User?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("admintoken");
      await axios.delete(
        `https://techbams-server.onrender.com/api/users/${id}`,
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
        description: "User deleted successfully.",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting User:", error);
      toast({
        title: "Error",
        description: "Failed to delete the User.",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    const fetchusers = async () => {
      try {
        const token = localStorage.getItem("admintoken");
        const response = await axios.get(
          "https://techbams-server.onrender.com/api/users",
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
    fetchusers();
  }, [toast]);
  const navigate = useNavigate();

  //   const handleUserClick = (userId) => {
  //     navigate(`/users/${userId}`);
  //   };
  const handleIconClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(modalContent);
    toast({
      title: "Copied!",
      description: `${modalContent} has been copied to clipboard.`,
      position: "top-right",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
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
        Users
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
                  Name
                </th>

                <th className="border-b px-4 py-6 text-left text-[#303972]">
                  Country
                </th>
                <th className="border-b px-4 py-6 text-left text-[#303972]">
                  Verified status
                </th>
                <th className="border-b px-4 py-6 text-left text-[#303972]">
                  Signup date
                </th>
                <th className="border-b px-4 py-6 text-left text-[#303972]">
                  Contact
                </th>
                <th className="border-b px-4 py-6 text-left text-[#303972]">
                  Delete{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr
                  key={index + 1}
                  className="cursor-pointer hover:bg-gray-100"
                  // onClick={() => handleUserClick(item.id)}
                >
                  <td className="border-b px-4 py-8 text-[#303972] font-bold text-base">
                    {index + 1}
                  </td>
                  <td className="border-b px-4 py-8 text-[#303972] font-bold text-base">
                    {item.fullName}
                  </td>
                  <td className="border-b px-4 py-8 text-blue-500 font-semibold">
                    {item.country}
                  </td>
                  <td className="border-b px-4 py-8 text-blue-500 font-semibold">
                    <p
                      className={`font-medium ${
                        item.isVerified ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {item.isVerified ? "Verified" : "Not Verified"}
                    </p>
                  </td>
                  <td className="border-b px-4 py-8 text-blue-500 font-semibold">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>{" "}
                  <td className="border-b px-4 py-8">
                    <div className="flex items-center gap-3">
                      <img
                        src={phone}
                        alt="Phone"
                        className="h-8 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleIconClick(item.phone);
                        }}
                      />
                      <img
                        src={mail}
                        alt="Mail"
                        className="h-8 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleIconClick(item.email);
                        }}
                      />
                    </div>
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
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-80 relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                onClick={closeModal}
              >
                ✕
              </button>
              <p className="text-lg font-semibold text-center mt-4 mb-4">
                {modalContent}
              </p>
              <button
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-[#003E47]"
                onClick={handleCopy}
              >
                Copy
              </button>
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
