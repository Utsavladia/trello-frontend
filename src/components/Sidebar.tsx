import React from "react";
import { useRouter } from "next/router";
import { clearToken } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { LuBellDot } from "react-icons/lu";
import { BsBrightnessHigh } from "react-icons/bs";
import { MdAddCircle, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { RiHome2Line } from "react-icons/ri";
import { CiViewBoard } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { GoPeople } from "react-icons/go";
import { BsGraphUp } from "react-icons/bs";
import { FiCircle, FiPlusCircle } from "react-icons/fi";
import { TfiDownload } from "react-icons/tfi";

interface SidebarProps {
  userName: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ userName }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userAvatarUrl =
    "https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png";

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex flex-col justify-between h-screen bg-white py-6 px-4 shadow-lg w-64">
      <div className="flex flex-col ">
        {/* User Info */}
        <div className="flex items-center space-x-4 mb-1">
          <img
            src={userAvatarUrl}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <h4 className="font-semibold text-xl text-black">{userName}</h4>
        </div>
        <div className="flex justify-between items-center gap-2 text-gray-500 text-lg ">
          <div className="flex items-center gap-5 ">
            <LuBellDot className="hover:text-gray-800" />
            <BsBrightnessHigh className="hover:text-gray-800" />
            <MdKeyboardDoubleArrowRight className="hover:text-gray-800" />
          </div>
          <button
            onClick={handleLogout}
            className=" max-w-fit text-base  bg-gray-100 text-gray-500 p-1 rounded-md hover:bg-gray-200 hover:text-gray-600 hover:outline outline-[1px] hover:outline-gray-300"
          >
            Logout
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 my-4">
          <nav>
            <ul className="">
              <li>
                <a
                  href="/"
                  className="flex items-center p-1 text-gray-500 text-lg rounded-md  gap-3 bg-gray-100 outline-[1px] outline outline-gray-300"
                >
                  <RiHome2Line />
                  <span className="">Home</span>
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="flex items-center p-1 text-gray-500 text-lg rounded-md  gap-3 hover:bg-gray-100 hover:outline outline-[1px] hover:outline-gray-300"
                >
                  <CiViewBoard />
                  <span className="">Boards</span>
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="flex items-center p-1 text-gray-500 text-lg rounded-md  gap-3 hover:bg-gray-100 hover:outline outline-[1px] hover:outline-gray-300"
                >
                  <IoSettingsOutline />
                  <span className="">Settings</span>
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="flex items-center p-1 text-gray-500 text-lg rounded-md  gap-3 hover:bg-gray-100 hover:outline outline-[1px] hover:outline-gray-300"
                >
                  <GoPeople />
                  <span className="">Teams</span>
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="flex items-center p-1 text-gray-500 text-lg rounded-md  gap-3 hover:bg-gray-100 hover:outline outline-[1px] hover:outline-gray-300"
                >
                  <BsGraphUp />
                  <span className="">Analytics</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Create Task Button */}
        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 py-2 px-4  rounded-lg shadow-md text-lg font-medium text-white btn-gradient"
        >
          Create new task
          <MdAddCircle />
        </button>
      </div>

      {/* Download App */}
      <div className="mt-auto">
        <button className="w-full items-center bg-gray-100 text-gray-500 py-1 px-2 rounded-lg text-xl  flex gap-4 justify-center hover:bg-gray-200 hover:text-gray-600 hover:outline outline-[1px] hover:outline-gray-300">
          <TfiDownload />
          <div className="flex flex-col items-start ">
            <h1 className="text-base font-semibold ">Download the app</h1>
            <p className="text-xs ">Get the full experience</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
