"use client";

import { Dialog } from "@base-ui/react/dialog";
import { useState } from "react";

import { validateTaskInput } from "../lib/validateTask";
import { DEFAULT_PRIORITY } from "../store/todoStore";
import type { Priority, Task, TaskInput } from "../types/task";

export interface TaskFormModalProps {
  mode: "create" | "edit";
  open: boolean;
  task?: Task;
  onOpenChange: (open: boolean) => void;
  onSave: (input: TaskInput) => boolean;
}

const PRIORITY_OPTIONS: Priority[] = ["alta", "media", "baja"];

interface TaskFormFieldsProps {
  mode: "create" | "edit";
  task?: Task;
  onCancel: () => void;
  onSave: (input: TaskInput) => boolean;
}

function TaskFormFields({ mode, task, onCancel, onSave }: TaskFormFieldsProps) {
  const [description, setDescription] = useState(() =>
    mode === "edit" && task ? task.description : "",
  );
  const [priority, setPriority] = useState<Priority>(() =>
    mode === "edit" && task ? task.priority : DEFAULT_PRIORITY,
  );
  const [dueDate, setDueDate] = useState(() =>
    mode === "edit" && task ? (task.dueDate ?? "") : "",
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof TaskInput, string>>
  >({});

  const handleSave = () => {
    const input: TaskInput = {
      description,
      priority,
      dueDate: dueDate.trim() === "" ? null : dueDate,
    };

    const validation = validateTaskInput(input);

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    onSave(input);
  };

  return (
    <>
      <div className="space-y-4">
        <label className="block space-y-1" htmlFor="task-description">
          <span className="text-sm font-medium text-[#424242]">
            Descripción *
          </span>
          <textarea
            aria-invalid={Boolean(errors.description)}
            className="min-h-24 w-full rounded-lg border border-[#CED4DA] px-3 py-2 text-sm"
            id="task-description"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />
          {errors.description ? (
            <span className="text-xs text-[#C62828]" role="alert">
              {errors.description}
            </span>
          ) : null}
        </label>

        <label className="block space-y-1" htmlFor="task-priority">
          <span className="text-sm font-medium text-[#424242]">Prioridad</span>
          <select
            className="w-full rounded-lg border border-[#CED4DA] px-3 py-2 text-sm"
            id="task-priority"
            onChange={(event) => setPriority(event.target.value as Priority)}
            value={priority}
          >
            {PRIORITY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-1" htmlFor="task-due-date">
          <span className="text-sm font-medium text-[#424242]">
            Fecha de vencimiento
          </span>
          <input
            className="w-full rounded-lg border border-[#CED4DA] px-3 py-2 text-sm"
            id="task-due-date"
            onChange={(event) => setDueDate(event.target.value)}
            type="date"
            value={dueDate}
          />
          {errors.dueDate ? (
            <span className="text-xs text-[#C62828]" role="alert">
              {errors.dueDate}
            </span>
          ) : null}
        </label>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          className="rounded-full border border-[#CED4DA] px-4 py-2 text-sm text-[#606060]"
          onClick={onCancel}
          type="button"
        >
          Cancelar
        </button>
        <button
          className="rounded-full bg-[#008392] px-4 py-2 text-sm font-medium text-white hover:bg-[#006B77]"
          onClick={handleSave}
          type="button"
        >
          Guardar
        </button>
      </div>
    </>
  );
}

export function TaskFormModal({
  mode,
  open,
  task,
  onOpenChange,
  onSave,
}: TaskFormModalProps) {
  const title = mode === "create" ? "Nueva tarea" : "Editar tarea";
  const formKey = `${mode}-${task?.id ?? "create"}`;

  const handleSave = (input: TaskInput): boolean => {
    const saved = onSave(input);

    if (saved) {
      onOpenChange(false);
    }

    return saved;
  };

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-[#1B5255]/50" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 w-[min(92vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-[0px_8px_16px_rgba(0,0,0,0.2)]">
          <Dialog.Title className="mb-4 text-xl font-bold text-[#17191F]">
            {title}
          </Dialog.Title>

          {open ? (
            <TaskFormFields
              key={formKey}
              mode={mode}
              onCancel={() => onOpenChange(false)}
              onSave={handleSave}
              task={task}
            />
          ) : null}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
