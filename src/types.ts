export interface Task {
  _id: string;
  title: string;
  description?: string; // Optional field
  status: string;
  priority?: "Low" | "Medium" | "Urgent"; // Optional field
  deadline?: Date; // Optional field
  userId: string;
  customFields?: Record<string, any>; // Optional field for custom properties
  createdAt?: Date; // Optional, based on timestamps in schema
}
