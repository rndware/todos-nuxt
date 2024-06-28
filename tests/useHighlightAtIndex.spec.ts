import { nextTick, reactive} from "vue";
import { describe, it, expect, beforeEach } from "vitest";
import useHighlightNewItem from "../composables/useHighlightNewItem";

describe("useHighlightNewItem", () => {
  let array: string[];
  let items = ["item1", "item2", "item3"];

  beforeEach(() => {
    array = reactive<string[]>([]);
  });

  it("should not highlight the last item when array is first added", async () => {
    const { isHighlighted } = useHighlightNewItem(array);

    // add array first time
    array.splice(0, items.length, ...items);

    await nextTick();
    expect(isHighlighted(array.length - 1)).toBe(false);
  });
  it("should highlight the last item when a new item is added after", async () => {
    const { isHighlighted } = useHighlightNewItem(array);
 
    array.splice(0, items.length, ...items);

    array.push("item4");
    await nextTick();
    expect(isHighlighted(array.length - 1)).toBe(false);

    array.push("item5");
    await nextTick();
    expect(isHighlighted(array.length - 1)).toBe(true);
  });

  it("should not highlight the last item when an item is removed", async () => {
    const { isHighlighted } = useHighlightNewItem(array);
 
    array.splice(0, items.length, ...items);

    array.push("item4");
    await nextTick();
    expect(isHighlighted(array.length - 1)).toBe(false);

    // remove item from array
    array.pop();
    await nextTick();
    expect(isHighlighted(array.length - 1)).toBe(false);
  });
});
