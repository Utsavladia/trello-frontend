// components/Taskboard.tsx
import React, { useState, useEffect } from "react";
import { fetchTasksByStatus, createTask } from "../utils/api";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModel";
import { RiMenu3Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

const Taskboard: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);

  const statuses = ["todo", "in-progress", "under-review", "finished"];

  const [tasks, setTasks] = useState<{ [key: string]: any[] }>({
    todo: [],
    "in-progress": [],
    "under-review": [],
    finished: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      if (userId) {
        try {
          for (const status of statuses) {
            const tasksData = await fetchTasksByStatus(status, userId);
            setTasks((prevTasks) => ({
              ...prevTasks,
              [status]: tasksData,
            }));
          }
        } catch (error) {
          console.error("Failed to fetch tasks:", error);
        }
      }
    };

    loadTasks();
  }, [userId]);

  const handleCreateTask = async (
    title: string,
    description: string,
    priority: string,
    deadline: string
  ) => {
    if (!modalStatus) return;
    if (userId) {
      try {
        const newTask = await createTask({
          title,
          description,
          status: modalStatus,
          priority,
          deadline,
          userId,
        });
        setTasks((prevTasks) => ({
          ...prevTasks,
          [modalStatus]: [...prevTasks[modalStatus], newTask],
        }));
      } catch (error) {
        console.error("Failed to create task:", error);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-white ">
      {statuses.map((status) => (
        <div key={status} className="flex flex-col">
          <div className="flex text-gray-600 text-xl justify-between items-center mb-4">
            <h2 className="  capitalize ">{status.replace("-", " ")}</h2>
            <RiMenu3Fill />
          </div>
          <div className=" ">
            <div className="flex-grow p-1 space-y-4 max-h-[67vh] overflow-y-scroll">
              {tasks[status].map((task) => (
                <TaskCard key={task._id} task={task} />
              ))}
            </div>
            <button
              className="mt-4 add-new-btn w-full p-2  flex justify-between items-center px-2 text-gray-300 rounded-lg"
              onClick={() => {
                setIsModalOpen(true);
                setModalStatus(status);
              }}
            >
              <h1>Add new</h1>
              <FiPlus className="text-xl" />
            </button>
          </div>
        </div>
      ))}

      {isModalOpen && (
        <TaskModal
          status={modalStatus!}
          onClose={() => setIsModalOpen(false)}
          onSave={handleCreateTask}
        />
      )}
    </div>
  );
};

export default Taskboard;
