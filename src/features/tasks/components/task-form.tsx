"use client";

import { Select } from "@base-ui/react/select";
import { useState, type FormEvent } from "react";

import type { Priority, Task, TaskInput } from "../types";
import { PRIORITY_LABELS, PRIORITY_ORDER } from "../types";
import {
  isValidTaskInput,
  toTaskInput,
  validateTaskInput,
  type TaskValidationErrors,
} from "../validation";

const fieldClassName =
  "w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-400 dark:focus:ring-zinc-700";

const labelClassName =
  "mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300";

const errorClassName = "mt-1 text-sm text-red-600 dark:text-red-400";

export interface TaskFormProps {
  /** When set, the form edits this task; otherwise creates a new one. */
  task?: Task;
  onSubmit: (input: TaskInput) => void;
  onCancel?: () => void;
  submitLabel: string;
}

/**
 * Shared create/edit form for task description, due date, and priority.
 */
export function TaskForm({
  task,
  onSubmit,
  onCancel,
  submitLabel,
}: TaskFormProps) {
  const [description, setDescription] = useState(task?.description ?? "");
  const [dueDate, setDueDate] = useState(task?.dueDate ?? "");
  const [priority, setPriority] = useState<Priority>(
    task?.priority ?? "medium",
  );
  const [errors, setErrors] = useState<TaskValidationErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateTaskInput({ description, dueDate, priority });
    setErrors(validation);
    if (!isValidTaskInput(validation) || !priority) {
      return;
    }
    onSubmit(toTaskInput({ description, dueDate, priority }));
    if (!task) {
      setDescription("");
      setDueDate("");
      setPriority("medium");
      setErrors({});
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      noValidate
      aria-label={task ? "Editar tarea" : "Crear tarea"}
    >
      <div>
        <label htmlFor="task-description" className={labelClassName}>
          Descripción
        </label>
        <input
          id="task-description"
          name="description"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className={fieldClassName}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={
            errors.description ? "task-description-error" : undefined
          }
        />
        {errors.description ? (
          <p
            id="task-description-error"
            className={errorClassName}
            role="alert"
          >
            {errors.description}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="task-due-date" className={labelClassName}>
          Fecha de vencimiento
        </label>
        <input
          id="task-due-date"
          name="dueDate"
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          className={fieldClassName}
          aria-invalid={Boolean(errors.dueDate)}
          aria-describedby={errors.dueDate ? "task-due-date-error" : undefined}
        />
        {errors.dueDate ? (
          <p id="task-due-date-error" className={errorClassName} role="alert">
            {errors.dueDate}
          </p>
        ) : null}
      </div>

      <div>
        <span id="task-priority-label" className={labelClassName}>
          Prioridad
        </span>
        <Select.Root
          value={priority}
          onValueChange={(value) => {
            if (value) {
              setPriority(value as Priority);
            }
          }}
        >
          <Select.Trigger
            className={`${fieldClassName} flex items-center justify-between`}
            aria-labelledby="task-priority-label"
            data-testid="priority-trigger"
          >
            <Select.Value>
              {(value: Priority | null) =>
                value ? PRIORITY_LABELS[value] : "Seleccionar"
              }
            </Select.Value>
            <Select.Icon className="ml-2 text-zinc-500">▾</Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner className="z-[70] outline-none" sideOffset={4}>
              <Select.Popup className="min-w-[var(--anchor-width)] rounded-md border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                <Select.List>
                  {PRIORITY_ORDER.map((option) => (
                    <Select.Item
                      key={option}
                      value={option}
                      label={PRIORITY_LABELS[option]}
                      className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-zinc-900 outline-none data-highlighted:bg-zinc-100 dark:text-zinc-100 dark:data-highlighted:bg-zinc-800"
                      data-testid={`priority-option-${option}`}
                    >
                      <Select.ItemText>
                        {PRIORITY_LABELS[option]}
                      </Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.List>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
        {errors.priority ? (
          <p className={errorClassName} role="alert">
            {errors.priority}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {submitLabel}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Cancelar
          </button>
        ) : null}
      </div>
    </form>
  );
}
