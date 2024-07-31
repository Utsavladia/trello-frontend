// components/TaskModal.tsx
import React, { useState, useEffect } from "react";
import { BiCalendar } from "react-icons/bi";
import { BsSignTurnRight } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";
import { FiStar } from "react-icons/fi";
import { GoArrowBoth, GoPencil } from "react-icons/go";
import { PiSunDim } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { TbShare } from "react-icons/tb";
import { TfiArrowsCorner } from "react-icons/tfi";
import { VscArrowBoth } from "react-icons/vsc";
import { Task } from "@/types";

interface TaskModalProps {
  status: string;
  onClose: () => void;
  onSave: (
    title: string,
    description: string,
    priority: string,
    deadline: string
  ) => void;
  onDelete?: (id: string) => void; // Optional delete handler
  task?: Task;

}

const TaskModal: React.FC<TaskModalProps> = ({ status, onClose, onSave, task, onDelete }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState(task?.priority || "Low");
  const [deadline, setDeadline] = useState(task?.deadline ? task.deadline.toISOString().slice(0, 10) : "");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setPriority(task.priority || "Low");
      setDeadline(task.deadline ? task.deadline.toISOString().slice(0, 10) : "");
    }
  }, [task]);

  const handleSave = () => {
    onSave(title, description, priority, deadline);
    onClose();
  };

  const handleDelete = () => {
    if (task && onDelete) {
      onDelete(task?._id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="relative bg-white flex flex-col items-start p-6 w-full max-w-md min-h-[70vh]">
        <div className="flex justify-between w-full text-xl items-center">
          <div className="flex gap-4 items-center">
            <button onClick={onClose} className="hover:text-gray-800 ">
              <RxCross2 />
            </button>
            <GoArrowBoth className=" rotate-45" />
          </div>
          <div className="flex gap-4 items-center text-sm">
            <div className="bg-gray-100 rounded-md p-2 flex  gap-2 items-center">
              Share <TbShare className="text-xl" />
            </div>
            <div className="bg-gray-100 rounded-md p-2 flex  gap-2 items-center">
              Favorite <FiStar />
            </div>
          </div>
        </div>
        <div className="my-6 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-[100%]  text-3xl placeholder:font-semibold focus:outline-none "
            placeholder="Task title"
            required
          />
        </div>
        <div className="grid grid-cols-[auto_1fr] mb-4 gap-6 w-full text-sm">
          <div className="flex items-center gap-3 ">
            <PiSunDim className="text-xl" /> Status
          </div>
          <div className=" capitalize font-medium text-gray-600 ml-4">
            {status.replace("-", " ")}
          </div>
          <div className="flex items-center gap-3">
            <BsSignTurnRight className="text-xl" /> Priority
          </div>
          <div className=" capitalize font-medium text-gray-600">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-auto  ml-3 rounded-lg"
            >
              <option value="">Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <CiCalendar className="text-xl" /> Deadline
          </div>
          <div className=" capitalize font-medium text-gray-600">
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-auto ml-4   active:outline-none active:border-none"
            />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <GoPencil className="text-xl" /> Description
          </div>
          <div className=" capitalize ml-4 font-medium text-gray-600">
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="border-[1px] border-gray-500 border-opacity-20 mt-4 w-full"></div>
        {task && onDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-400 absolute bottom-6 left-6 text-white px-4 py-2 rounded-lg  hover:bg-red-600"
            >
              Delete
            </button>
          )}

        {title.length > 0 && (
          <button
            onClick={handleSave}
            className="absolute bottom-6 right-6 px-4 py-2  bg-violet-800 text-white rounded-lg"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskModal;
