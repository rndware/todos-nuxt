import { ref } from "vue";
import type { TodoId } from "@/enums";

/**
 * Custom composable function for managing selected todos.
 * Provides reactive state and methods to toggle selection of todos by their ID.
 *
 */
export default function useSelectTodos() {
  const selectedTodos = ref<TodoId[]>([]);

  const handleSelected = (selectedId: TodoId) => {
    const item = selectedTodos.value.find((id) => id === selectedId);

    if (!item) {
      selectedTodos.value.push(selectedId);
    } else {
      selectedTodos.value.splice(selectedTodos.value.indexOf(selectedId), 1);
    }
  };

  const clearSelected = () => {
    selectedTodos.value = [];
  };

  return {
    selectedTodos,
    handleSelected,
    clearSelected,
  };
}
