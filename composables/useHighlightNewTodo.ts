import { ref, watch } from "vue";

/**
 * Custom Vue composition function for highlighting newly added todos in a list.
 * It watches changes in the length of `props.todoData` and highlights the last added item.
 *
 * @param props - Object containing `todoData`, an array of todos.
 * @returns An object with a function `isHighlighted(index)` to check if a todo at `index` is highlighted.
 */
export default function useHighlightNewTodo<T>(props: { todoData: T[] }) {
  const highlightedIndex = ref<number>(-1);

  watch(
    () => props.todoData.length,
    (nextLength, prevLength) => {
      // only highlight for single added items
      if (nextLength > prevLength && nextLength - prevLength === 1) {
        highlightedIndex.value = props.todoData.length - 1;
      }
    }
  );

  function isHighlighted(index: number): boolean {
    return index === highlightedIndex.value;
  }

  return {
    isHighlighted,
  };
}
