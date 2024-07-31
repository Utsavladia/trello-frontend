import React, { useState, useEffect } from "react";
import { fetchTasksByStatus, createTask, updateTaskStatus } from "../utils/api";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModel";
import { RiMenu3Fill } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Task } from "../types"; // Ensure correct import of Task type

const Taskboard: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);

  const statuses = ["todo", "in-progress", "under-review", "finished"];

  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({
    "todo": [],
    "in-progress": [],
    "under-review": [],
    "finished": [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      if (userId) {
        try {
          const tasksData = await Promise.all(
            statuses.map((status) => fetchTasksByStatus(status, userId))
          );
          setTasks(
            statuses.reduce(
              (acc, status, index) => ({ ...acc, [status]: tasksData[index] }),
              {}
            )
          );
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

  const handleDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const sourceStatus = source.droppableId;
    const destinationStatus = destination.droppableId;

    if (sourceStatus !== destinationStatus) {
      try {
        const task = tasks[sourceStatus].find(
          (task) => task._id === draggableId
        );

        if (task) {
          await updateTaskStatus(draggableId, destinationStatus);
          setTasks((prevTasks) => {
            const sourceTasks = prevTasks[sourceStatus].filter(
              (task) => task._id !== draggableId
            );
            const destinationTasks = [
              ...prevTasks[destinationStatus],
              { ...task, status: destinationStatus },
            ];

            return {
              ...prevTasks,
              [sourceStatus]: sourceTasks,
              [destinationStatus]: destinationTasks,
            };
          });
        }
      } catch (error) {
        console.error("Failed to update task status:", error);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-white">
        {statuses.map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                className="flex flex-col"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="flex text-gray-600 text-xl justify-between items-center mb-4">
                  <h2 className="capitalize">{status.replace("-", " ")}</h2>
                  <RiMenu3Fill />
                </div>
                <div className="flex-grow p-1 space-y-4 max-h-[67vh] overflow-y-scroll">
                  {tasks[status].map((task: Task, index: number) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
                <button
                  className="mt-4 add-new-btn w-full p-2 flex justify-between items-center px-2 text-gray-300 rounded-lg"
                  onClick={() => {
                    setIsModalOpen(true);
                    setModalStatus(status);
                  }}
                >
                  <h1>Add new</h1>
                  <FiPlus className="text-xl" />
                </button>
              </div>
            )}
          </Droppable>
        ))}
      </div>

      {isModalOpen && (
        <TaskModal
          status={modalStatus!}
          onClose={() => setIsModalOpen(false)}
          onSave={handleCreateTask}
        />
      )}
    </DragDropContext>
  );
};

export default Taskboard;
