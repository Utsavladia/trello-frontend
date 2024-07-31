import React from "react";
import { MdOutlineWatchLater } from "react-icons/md";

// Define the Task interface
interface Task {
  _id: string;
  title: string;
  description?: string;
  status: string;
  priority?: "Low" | "Medium" | "Urgent";
  deadline?: string;
  userId: string;
  customFields?: Record<string, any>;
  createdAt?: string; // Change to string to handle ISO date strings
}

// Define priority colors
const priorityColors: Record<string, string> = {
  Low: "bg-yellow-400",
  Medium: "bg-orange-400",
  Urgent: "bg-red-400",
};

// Format date function
const formatDate = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error("Invalid date provided");
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Function to format relative time
const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const timeDiff = now.getTime() - date.getTime(); // difference in milliseconds

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "1 hr ago" : `${hours} hr ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 min ago" : `${minutes} mins ago`;
  } else {
    return "0 min ago";
  }
};

// TaskCard component
const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  // Determine the priority class
  const priorityClass = task.priority ? priorityColors[task.priority] : "";

  // Format deadline if it's a valid date
  let formattedDeadline = "";
  if (task.deadline) {
    const date = new Date(task.deadline);
    formattedDeadline = formatDate(date);
  }

  // Format createdAt if it's a valid date
  let formattedCreatedAt = "";
  if (task.createdAt) {
    const date = new Date(task.createdAt);
    formattedCreatedAt = formatRelativeTime(date);
  }

  return (
    <div className="bg-gray-50 p-3 rounded-lg outline leading-tight outline-[1px] outline-gray-300 flex flex-col gap-2">
      <h3 className="text-lg font-semibold text-gray-600 leading-tight">
        {task.title}
      </h3>
      <p className="text-sm leading-tight">{task.description}</p>
      {task.priority && (
        <div
          className={`px-2 py-1 text-white max-w-fit rounded-lg text-xs ${priorityClass}`}
        >
          {task.priority}
        </div>
      )}
      {task.deadline && (
        <div className="flex text-xl gap-2 items-center">
          <MdOutlineWatchLater />
          <h1 className="text-sm font-semibold text-gray-600">
            {formattedDeadline}
          </h1>
        </div>
      )}
      {task.createdAt && (
        <h1 className="text-sm font-medium text-gray-500">
          {formattedCreatedAt}
        </h1>
      )}
    </div>
  );
};

export default TaskCard;
