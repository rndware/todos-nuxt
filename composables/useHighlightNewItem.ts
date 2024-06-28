/**
 * Custom composable function to highlight the index of a newly added item in an array.
 *
 * This function returns a reactive reference (`highlightedIndex`) that tracks the index of the
 * most recently added item in the provided `array`. When the array changes (e.g., a new item is added),
 * the `highlightedIndex` is updated to reflect the index of the new item.
 *
 * Note: this does not happen when the array is first created or an item is removed
 *
 * @param {Reactive<any>[]} array - The array to watch for changes.
 * @returns {object} - An object containing the `isHighlighted` function to check if an index is highlighted.
 *
 */

import { ref, watch, type Ref } from "vue";

export default function useHighlightNewItem(array: Ref<any[]>) {
  const highlightedIndex = ref<number | null>(null);

  debugger;
  watch(array, (nextValue, prevValue) => {
    debugger;
    if (nextValue.length > prevValue.length) {
      if (highlightedIndex.value !== null) {
        highlightedIndex.value = array.value.length - 1;
      } else {
        highlightedIndex.value = -1;
      }
    }
  });

  function isHighlighted(index: number): boolean {
    return index === highlightedIndex.value;
  }

  return {
    isHighlighted,
  };
}
