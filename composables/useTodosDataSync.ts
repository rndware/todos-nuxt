import { useTodosStore } from "@/stores/todos";
import { toast } from "vue-sonner";
import type { TodoItemData } from "@/types";

/**
 * Composable for syncing todos between the client store and the server.
 * Performs two-way sync: updates the client if the server has newer data,
 * or pushes local changes to the server if the client is more recent.
 * 
 */
export function useTodosDataSync() {
  const todosStore = useTodosStore();

  const getMostRecentUpdate = (todos: TodoItemData[]): Date => {
    if (todos.length === 0) {
      // Return epoch if empty so comparison works
      return new Date(0);
    }

    const timestamps = todos.map((todo) => new Date(todo.updatedAt).getTime());
    return new Date(Math.max(...timestamps));
  }

  async function syncTodosWithServer(seed?: TodoItemData[]) {
    try {
      const apiData = await $fetch<TodoItemData[]>("/api/todos");

      const serverMostRecent = getMostRecentUpdate(apiData);
      const clientMostRecent = getMostRecentUpdate(todosStore.todos);

      if (serverMostRecent >= clientMostRecent) {
        todosStore.$patch({ todos: apiData });
      } else {
        await $fetch("/api/todos/bulk", {
          method: "POST",
          body: todosStore.todos,
        });
      }
    } catch (error) {
      const message = "Failed to fetch todos from API, using localStorage";
      setTimeout(() => toast(message), 0);
      console.error(message, error);

      // if there are no todos set showcase defaults
      if (seed && todosStore.todos.length === 0) {
        todosStore.$patch({ todos: seed });
      }
    }
  }

  return { syncTodosWithServer };
}
