import { TodosApp } from "@/components/todos-app";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-12 sm:px-10">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Mis tareas
          </h1>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            Crea, edita y elimina tus pendientes. Se guardan en este navegador.
          </p>
        </header>
        <TodosApp />
      </main>
    </div>
  );
}
