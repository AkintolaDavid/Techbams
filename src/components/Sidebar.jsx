import React from "react";
import { CiShop } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo2.png";
import { FaPlus } from "react-icons/fa";
import { FaUsers, FaChalkboardTeacher, FaBook } from "react-icons/fa";
import { BiSolidDonateHeart } from "react-icons/bi";
import { MdOutlineContactSupport } from "react-icons/md";
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    { name: "Add course", path: "addcoursepage", icon: <FaPlus /> },
    { name: "Users", path: "usersadminpage", icon: <FaUsers /> },
    { name: "Courses", path: "coursesadminpage", icon: <FaBook /> },

    {
      name: "Contact",
      path: "contactadminpage",
      icon: <MdOutlineContactSupport />,
    },
  ];

  return (
    <aside className="fixed top-0 left-0 w-[20%] bg-blue-500 h-full overflow-y-auto">
      <div className="flex flex-col items-center py-6">
        <img
          src={logo}
          alt="logo"
          className="h-[40px] md:h-[70px] hidden md:flex"
        />
        <div className="space-y-8 mt-10 w-full pl-14">
          {categories.map(({ name, path, icon }, index) => (
            <button
              key={index}
              onClick={() => navigate(`/admin/${path}`)}
              className={`flex items-center w-full text-center px-4 py-4 rounded-l-full text-base font-semibold rounded-r-none transition ${
                location.pathname === `/admin/${path}`
                  ? "bg-[#F3F4FF] text-blue-500" // Selected color
                  : "text-[#ffffff] hover:bg-[#F3F4FF] hover:text-blue-500" // Hover and default color
              }`}
            >
              <span className="text-2xl mr-4">{icon}</span>
              {name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
