"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { ReactNode } from "react";

export interface AppDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  /** id for aria-labelledby */
  titleId?: string;
  /** id for aria-describedby */
  descriptionId?: string;
}

export function AppDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  titleId = "dialog-title",
  descriptionId = "dialog-description",
}: AppDialogProps) {
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 z-40 bg-black/40" />
        <BaseDialog.Viewport className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <BaseDialog.Popup
            className="w-full max-w-md rounded-lg border border-[#CED4DA] bg-white p-6 shadow-lg outline-none"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
          >
            <BaseDialog.Title
              id={titleId}
              className="mb-4 text-xl font-bold text-[#212529]"
            >
              {title}
            </BaseDialog.Title>
            {description ? (
              <BaseDialog.Description
                id={descriptionId}
                className="mb-4 text-sm text-[#606060]"
              >
                {description}
              </BaseDialog.Description>
            ) : null}
            {children}
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
