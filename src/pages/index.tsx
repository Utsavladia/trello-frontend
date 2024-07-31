import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Sidebar from "../components/Sidebar";
import Image from "next/image";
import Homefeatures from "@/components/Homefeatures";
import { CiFilter, CiShare1, CiShare2 } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { BsStars } from "react-icons/bs";
import { FiShare2 } from "react-icons/fi";
import { MdAddCircle } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import Taskboard from "@/components/Taskboard";

export default function Home() {
  const storedName = useSelector((state: RootState) => state.auth.name);
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();

  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
    console.log(token, "Token stored in redux by local storage initially");
  }, [token, router]);

  useEffect(() => {
    // Set name only on the client side
    setName(storedName);
  }, [storedName]);

  return (
    <div className="flex bg-gray-100">
      <div className="w-64">
        <Sidebar userName={name} />
      </div>
      <div className="flex-grow p-6 flex-col  space-y-4 text-gray-500 max-h-screen overflow-y-scroll ">
        <h1 className="text-4xl items-center font-semibold text-black">
          Good morning {name}!
          <span className="text-sm float-right text-gray-500">
            Help & feedback ?
          </span>
        </h1>
        <Homefeatures />
        <div className="flex items-center justify-between">
          <div className="flex justify-between items-center bg-white rounded-md p-1 ">
            <input
              placeholder="Search"
              type="text"
              className="text-sm placeholder:text-gray-500 w-36  focus:outline-none"
            />
            <IoSearch className="text-lg" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              Calendar view <CiCalendar className="text-2xl" />
            </div>
            <div className="flex items-center gap-2">
              Automation <BsStars className="text-xl" />
            </div>
            <div className="flex items-center gap-2">
              Filter <CiFilter className="text-2xl" />
            </div>
            <div className="flex items-center gap-2">
              Share <FiShare2 className="text-xl" />
            </div>
            <button
              type="button"
              className=" w-auto flex ml-2 justify-center items-center gap-2 py-1 px-2 rounded-lg shadow-sm text-dm text-white btn-gradient"
            >
              Create new
              <MdAddCircle />
            </button>
          </div>
        </div>
        <Taskboard />
      </div>
    </div>
  );
}
