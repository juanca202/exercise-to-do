export type Priority = "alta" | "media" | "baja";

export type TaskStatus = "pendiente" | "completada";

export interface Task {
  id: string;
  description: string;
  dueDate: string | null;
  priority: Priority;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TaskInput {
  description: string;
  dueDate: string | null;
  priority: Priority;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof TaskInput, string>>;
}
