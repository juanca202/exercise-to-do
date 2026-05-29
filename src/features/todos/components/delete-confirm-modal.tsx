"use client";

import { useId } from "react";

import { Button } from "@/components/ui/button";
import { AppDialog } from "@/components/ui/dialog";

import { useTodoStore } from "../store/todo-store";

export interface DeleteConfirmModalProps {
  open: boolean;
  todoId: string | null;
  onOpenChange: (open: boolean) => void;
}

export function DeleteConfirmModal({
  open,
  todoId,
  onOpenChange,
}: DeleteConfirmModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const todos = useTodoStore((s) => s.todos);
  const deleteTodo = useTodoStore((s) => s.deleteTodo);

  const todo = todoId ? todos.find((t) => t.id === todoId) : undefined;
  const preview = todo?.description
    ? todo.description.length > 60
      ? `${todo.description.slice(0, 60)}…`
      : todo.description
    : "";

  const handleDelete = () => {
    if (todoId) {
      deleteTodo(todoId);
    }
    onOpenChange(false);
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Eliminar tarea"
      description={
        preview
          ? `¿Seguro que deseas eliminar «${preview}»? Esta acción no se puede deshacer.`
          : "¿Seguro que deseas eliminar esta tarea? Esta acción no se puede deshacer."
      }
      titleId={titleId}
      descriptionId={descriptionId}
    >
      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => onOpenChange(false)}
        >
          Cancelar
        </Button>
        <Button type="button" variant="destructive" onClick={handleDelete}>
          Eliminar
        </Button>
      </div>
    </AppDialog>
  );
}
