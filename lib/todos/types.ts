export const TODO_PRIORITIES = ["high", "medium", "low"] as const;
export type TodoPriority = (typeof TODO_PRIORITIES)[number];

export const TODO_STATUSES = ["pending", "completed"] as const;
export type TodoStatus = (typeof TODO_STATUSES)[number];

export type Todo = {
  id: string;
  description: string;
  status: TodoStatus;
  due_at: string | null;
  priority: TodoPriority;
  created_at: string;
};

export type CreateTodoInput = {
  description: string;
  priority?: TodoPriority;
  due_at?: string | null;
  status?: TodoStatus;
};

export type UpdateTodoInput = {
  description?: string;
  priority?: TodoPriority;
  due_at?: string | null;
  status?: TodoStatus;
};
