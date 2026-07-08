"use client";

import { useId, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Field } from "@base-ui/react/field";
import { Select } from "@base-ui/react/select";
import type { Priority } from "../types";
import type { TaskInput, TaskValidationErrors } from "../lib/validate-task";

const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
  { value: "alta", label: "Alta" },
  { value: "media", label: "Media" },
  { value: "baja", label: "Baja" },
];

export interface TaskFormDialogProps {
  open: boolean;
  mode: "create" | "edit";
  initialValues?: TaskInput;
  onSubmit: (input: TaskInput) => {
    success: boolean;
    errors?: TaskValidationErrors;
  };
  onClose: () => void;
}

/** Formulario modal para crear o editar una tarea (descripción, fecha de vencimiento y prioridad). */
export function TaskFormDialog({
  open,
  mode,
  initialValues,
  onSubmit,
  onClose,
}: TaskFormDialogProps) {
  return (
    // `open` es controlado por el padre; onOpenChange solo se dispara para pedir
    // el cierre (Escape, click afuera), nunca para abrir, así que basta con onClose.
    <Dialog.Root open={open} onOpenChange={() => onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-surface-container-lowest p-6 shadow-lg">
          <Dialog.Title className="text-base font-semibold text-on-surface">
            {mode === "create" ? "Nueva tarea" : "Editar tarea"}
          </Dialog.Title>
          {open && (
            <TaskFormFields
              mode={mode}
              initialValues={initialValues}
              onSubmit={onSubmit}
              onClose={onClose}
            />
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

interface TaskFormFieldsProps {
  mode: "create" | "edit";
  initialValues?: TaskInput;
  onSubmit: (input: TaskInput) => {
    success: boolean;
    errors?: TaskValidationErrors;
  };
  onClose: () => void;
}

// Componente separado, montado solo mientras el diálogo está abierto: cada apertura
// remonta este árbol, lo que reinicia el estado del formulario sin necesidad de un
// efecto que llame a setState (evita renders en cascada).
function TaskFormFields({
  mode,
  initialValues,
  onSubmit,
  onClose,
}: TaskFormFieldsProps) {
  const descriptionId = useId();
  const dueDateId = useId();
  const [description, setDescription] = useState(
    initialValues?.description ?? "",
  );
  const [dueDate, setDueDate] = useState(initialValues?.dueDate ?? "");
  const [priority, setPriority] = useState<Priority>(
    initialValues?.priority ?? "media",
  );
  const [errors, setErrors] = useState<TaskValidationErrors>({});

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const result = onSubmit({ description, dueDate, priority });
    if (!result.success) {
      setErrors(result.errors ?? {});
      return;
    }
    onClose();
  }

  return (
    <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
      <Field.Root className="flex flex-col gap-1">
        <Field.Label
          htmlFor={descriptionId}
          className="text-sm font-medium text-on-surface-variant"
        >
          Descripción
        </Field.Label>
        <input
          id={descriptionId}
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="rounded border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface"
        />
        {errors.description && (
          <p className="text-sm text-error">{errors.description}</p>
        )}
      </Field.Root>

      <Field.Root className="flex flex-col gap-1">
        <Field.Label
          htmlFor={dueDateId}
          className="text-sm font-medium text-on-surface-variant"
        >
          Fecha de vencimiento
        </Field.Label>
        <input
          id={dueDateId}
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          className="rounded border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface"
        />
        {errors.dueDate && (
          <p className="text-sm text-error">{errors.dueDate}</p>
        )}
      </Field.Root>

      <Field.Root className="flex flex-col gap-1">
        <Field.Label className="text-sm font-medium text-on-surface-variant">
          Prioridad
        </Field.Label>
        <Select.Root
          value={priority}
          onValueChange={(value) => setPriority(value as Priority)}
        >
          <Select.Trigger className="flex items-center justify-between rounded border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface">
            <Select.Value>
              {(value: Priority) =>
                PRIORITY_OPTIONS.find((option) => option.value === value)?.label
              }
            </Select.Value>
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.Popup className="rounded border border-outline-variant bg-surface-container-lowest py-1 shadow-lg">
                <Select.List>
                  {PRIORITY_OPTIONS.map((option) => (
                    <Select.Item
                      key={option.value}
                      value={option.value}
                      className="cursor-pointer px-3 py-1.5 text-sm text-on-surface data-[highlighted]:bg-surface-container"
                    >
                      <Select.ItemText>{option.label}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.List>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
        {errors.priority && (
          <p className="text-sm text-error">{errors.priority}</p>
        )}
      </Field.Root>

      <div className="mt-2 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded bg-primary px-4 py-2 text-sm font-medium text-on-primary hover:opacity-90"
        >
          {mode === "create" ? "Crear" : "Guardar"}
        </button>
      </div>
    </form>
  );
}
