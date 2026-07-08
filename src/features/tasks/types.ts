export type Priority = "alta" | "media" | "baja";

export interface Task {
  id: string;
  description: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
  createdAt: number;
}
