export type TodoPriority = "alta" | "media" | "baja";

export type TodoStatus = "pendiente" | "completada";

export interface Todo {
  id: string;
  description: string;
  dueDate: string;
  priority: TodoPriority;
  status: TodoStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateTodoInput {
  description: string;
  dueDate: string;
  priority: TodoPriority;
}

export interface UpdateTodoInput {
  id: string;
  description: string;
  dueDate: string;
  priority: TodoPriority;
}

export type ValidationField = "description" | "dueDate" | "priority";

export interface ValidationResult {
  success: boolean;
  errors: Partial<Record<ValidationField, string>>;
}
