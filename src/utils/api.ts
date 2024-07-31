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
  const response = await axios.get(`https://trello-backend-1tg0.onrender.com/api/tasks/user/${userId}/status/${status}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

// Create a new task
export const createTask = async (task: Task): Promise<any> => {
  try {
    const response = await axios.post(`https://trello-backend-1tg0.onrender.com/api/createtask/user/${task.userId}`, task, {
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


export const updateTaskStatus = async (taskId: string, newStatus: string) => {
  try {
    const response = await axios.patch(`https://trello-backend-1tg0.onrender.com/api/tasks/${taskId}`, { status: newStatus }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
    
  } catch (error) {
    console.error("Failed to update task:", error);
    throw error; 
  }  
};


export const updateTask = async (
  id: string,
  updates: { title: string; description: string; priority: string; deadline: string }
) => {
  try {
    const response = await axios.put(`https://trello-backend-1tg0.onrender.com/api/tasks/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (id: string) => {
  try {
    await axios.delete(`https://trello-backend-1tg0.onrender.com/api/tasks/${id}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};


