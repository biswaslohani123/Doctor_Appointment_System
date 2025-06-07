import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 text-xl p-2 bg-white rounded-full shadow-md md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r transition-transform duration-300 ease-in-out z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 md:min-h-screen`}
      >
        {atoken && (
          <ul className="text-[#515151] mt-16 md:mt-5">
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive ? "bg-[#F2F3FF] border-r border-blue-400" : ""
                } `
              }
              to="/admin-dashboard"
            >
              <img src={assets.home_icon} alt="" /> <p>Dashboard</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive ? "bg-[#F2F3FF] border-r border-blue-400" : ""
                } `
              }
              to="/all-appointments"
            >
              <img src={assets.appointment_icon} alt="" />
              <p>All Appointments</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive ? "bg-[#F2F3FF] border-r border-blue-400" : ""
                } `
              }
              to="/add-doctor"
            >
              <img src={assets.add_icon} alt="" />
              <p>Add Doctor</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive ? "bg-[#F2F3FF] border-r border-blue-400" : ""
                } `
              }
              to="/doctor-list"
            >
              <img src={assets.people_icon} alt="" />
              <p>Doctor List</p>
            </NavLink>
          </ul>
        )}
      </div>
    </>
  );
};

export default Sidebar;
