import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "rounded-full bg-[#008392] px-8 py-4 text-base font-medium text-white hover:bg-[#006B77] disabled:cursor-not-allowed disabled:bg-[#AACCCC]",
  secondary:
    "rounded-full border-2 border-[#008392] bg-white px-8 py-4 text-base font-medium text-[#424242] hover:bg-[#F0F8F9] disabled:cursor-not-allowed disabled:border-[#CED4DA] disabled:text-[#9F9F9F]",
  ghost:
    "bg-transparent px-0 py-0 text-sm font-normal text-[#008392] hover:text-[#006B77] disabled:cursor-not-allowed disabled:text-[#9F9F9F]",
  destructive:
    "rounded-full bg-red-600 px-8 py-4 text-base font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300",
};

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center transition-colors ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
