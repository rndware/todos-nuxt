import { ref } from "vue";

/**
 * Custom composable function for managing selected todos.
 * Provides reactive state and methods to toggle selection of todos by their ID.
 *
 */
export default function useSelectTodos() {
  const selectedTodos = ref<string[]>([]);

  const handleSelected = (id: string) => {
    const item = selectedTodos.value.find((itemId) => itemId === id);

    if (!item) {
      selectedTodos.value.push(id);
    } else {
      selectedTodos.value.splice(selectedTodos.value.indexOf(id), 1);
    }
  };

  return {
    selectedTodos,
    handleSelected,
  };
}
