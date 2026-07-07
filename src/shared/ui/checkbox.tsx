"use client";

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";

export interface CheckboxProps {
  /** Etiqueta visible asociada al checkbox. */
  label: string;
  id?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onCheckedChange?: BaseCheckbox.Root.Props["onCheckedChange"];
}

/** Checkbox estilizado con Tailwind CSS sobre el primitivo headless de Base UI. */
export function Checkbox({
  label,
  id,
  checked,
  defaultChecked,
  disabled,
  onCheckedChange,
}: CheckboxProps) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-black dark:text-zinc-50">
      <BaseCheckbox.Root
        id={id}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        className="flex h-5 w-5 items-center justify-center rounded border border-black/20 bg-white outline-offset-2 data-[checked]:border-foreground data-[checked]:bg-foreground data-[disabled]:opacity-50 dark:border-white/20 dark:bg-black"
      >
        <BaseCheckbox.Indicator className="flex text-background">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
            aria-hidden="true"
          >
            <path d="M3 8.5L6.5 12L13 4.5" />
          </svg>
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      {label}
    </label>
  );
}
