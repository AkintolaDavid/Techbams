import React, { useState, useEffect } from "react";
// import logo from "../assets/logo2.png";
import logo2 from "../assets/logo2.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, useToast } from "@chakra-ui/react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { FaUsers, FaChalkboardTeacher, FaBook } from "react-icons/fa";
import { BiSolidDonateHeart } from "react-icons/bi";
import { MdOutlineContactSupport } from "react-icons/md";
const Header = ({ title }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const handleLogout = () => {
    localStorage.removeItem("admintoken");
    toast({
      title: "Admin Logout Successful",
      description: "You have been logged out.",
      status: "success",
      position: "top-right",
      duration: 5000,
      isClosable: true,
    });
    navigate("/signinadmin");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowDropdown(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const menuLinks = [
    { label: "Add course", path: "addcoursepage", icon: <FaPlus /> },
    { label: "Users", path: "usersadminpage", icon: <FaUsers /> },
    { label: "Courses", path: "coursesadminpage", icon: <FaBook /> },

    {
      label: "Contact",
      path: "contactadminpage",
      icon: <MdOutlineContactSupport />,
    },
    ,
  ];

  return (
    <header className="py-6 lg:py-4 px-6 lg:px-10 flex justify-between items-center bg-blue-500 lg:bg-[#F3F4FF] mb-8 lg:mb-2 shadow-md">
      {/* Logo and Title */}
      <div className="flex items-center gap-4">
        <img src={logo2} alt="logo" className="flex lg:hidden h-12" />
        <h1 className="hidden lg:flex text-lg md:text-2xl font-bold text-white lg:text-gray-700">
          {title}
        </h1>
      </div>

      {/* User Avatar and Dropdown */}
      <div className="flex items-center space-x-3 md:space-x-6">
        <div
          className="relative flex items-center gap-1 lg:gap-2"
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(!showDropdown);
          }}
        >
          <Avatar size="sm" name="Akintola Dave" bg="#4D44B5" color="white" />
          <div className="flex flex-col">
            <span className="text-[16px] text-white lg:text-[#4D44B5] font-semibold">
              Techbams Admin
            </span>
          </div>
          <RiArrowDropDownLine className="text-[30px] text-white lg:text-[#4D44B5] font-semibold" />
          {showDropdown && (
            <div
              onClick={handleLogout}
              className="absolute z-10 rounded-[10px] text-xl text-red-600 font-medium items-center justify-center bg-white h-[50px] lg:h-[60px] w-[150px] lg:w-[200px] top-[50px] right-0 border border-gray-400 flex"
            >
              Logout
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setIsMenuOpen(true)}
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-20 bg-gray-800 bg-opacity-75">
          <div className="fixed top-0 right-0 w-4/5 h-full bg-blue-500 text-[#ffffff] shadow-lg flex flex-col">
            {/* Close Button */}
            <button
              className="self-end m-4 text-2xl text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaTimes className="text-[#ffffff]" />
            </button>

            {/* Menu Links */}
            <nav className="flex flex-col gap-10 mt-10 text-lg font-medium items-center">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <img src={logo2} alt="logo" className="h-20" />
              </Link>
              {menuLinks.map(({ path, label, icon }) => (
                <Link
                  key={path}
                  to={`/admin/${path}`}
                  className="  flex items-center h-12 w-40"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-2xl mr-4">{icon}</span>
                  <span>{label}</span>
                </Link>
              ))}
              <button
                className="px-4 py-2 bg-[#ffffff] text-blue-500 font-medium rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
