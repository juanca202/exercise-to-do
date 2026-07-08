"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";

export interface DeleteConfirmDialogProps {
  open: boolean;
  taskDescription: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/** Diálogo de confirmación previo a eliminar una tarea de forma definitiva. */
export function DeleteConfirmDialog({
  open,
  taskDescription,
  onConfirm,
  onCancel,
}: DeleteConfirmDialogProps) {
  return (
    // `open` es controlado por el padre; onOpenChange solo se dispara para pedir
    // el cierre (Escape, click afuera), nunca para abrir, así que basta con onCancel.
    <AlertDialog.Root open={open} onOpenChange={() => onCancel()}>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm" />
        <AlertDialog.Popup className="fixed top-1/2 left-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-surface-container-lowest p-6 shadow-lg">
          <AlertDialog.Title className="text-base font-semibold text-on-surface">
            Eliminar tarea
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-sm text-on-surface-variant">
            ¿Eliminar &ldquo;{taskDescription}&rdquo;? Esta acción no se puede
            deshacer.
          </AlertDialog.Description>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="rounded px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="rounded bg-error px-4 py-2 text-sm font-medium text-on-error hover:opacity-90"
            >
              Eliminar
            </button>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
