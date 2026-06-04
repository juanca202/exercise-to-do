"use client";

import { Dialog } from "@base-ui/react/dialog";

export interface DeleteConfirmDialogProps {
  open: boolean;
  taskDescription: string;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteConfirmDialog({
  open,
  taskDescription,
  onOpenChange,
  onConfirm,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-[#1B5255]/50" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 w-[min(92vw,24rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-[0px_8px_16px_rgba(0,0,0,0.2)]">
          <Dialog.Title className="text-lg font-bold text-[#17191F]">
            Eliminar tarea
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-[#606060]">
            ¿Confirmas eliminar &quot;{taskDescription}&quot;? Esta acción no se
            puede deshacer.
          </Dialog.Description>

          <div className="mt-6 flex justify-end gap-3">
            <Dialog.Close
              className="rounded-full border border-[#CED4DA] px-4 py-2 text-sm text-[#606060]"
              type="button"
            >
              Cancelar
            </Dialog.Close>
            <button
              className="rounded-full bg-[#C62828] px-4 py-2 text-sm font-medium text-white hover:bg-[#B71C1C]"
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
              type="button"
            >
              Eliminar
            </button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
