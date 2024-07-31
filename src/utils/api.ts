// utils/api.ts
import axios from "axios";


interface Task {
  title: string;
  description?: string;
  status: string;
  priority?: string;
  deadline?: string;
  userId: string;
  [key: string]: any; // Index signature for custom properties
}

// Fetch tasks by status
export const fetchTasksByStatus = async (status: string, userId: string) => {
  const response = await axios.get(`http://localhost:5000/api/tasks/user/${userId}/status/${status}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

// Create a new task
export const createTask = async (task: Task): Promise<any> => {
  try {
    const response = await axios.post(`http://localhost:5000/api/createtask/user/${task.userId}`, task, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create task:", error);
    throw error; // Re-throw the error after logging it
  }
};