import { Button } from "@/components/ui/button";

export interface TodoEmptyStateProps {
  onCreateClick: () => void;
}

export function TodoEmptyState({ onCreateClick }: TodoEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[#CED4DA] bg-[#EBF5F6]/50 px-6 py-12 text-center">
      <p className="mb-2 text-lg font-medium text-[#333333]">
        No tienes tareas todavía
      </p>
      <p className="mb-6 text-sm text-[#606060]">
        Crea tu primera tarea para empezar a organizarte.
      </p>
      <Button type="button" onClick={onCreateClick}>
        Crear primera tarea
      </Button>
    </div>
  );
}
