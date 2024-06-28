import { reactive, nextTick } from "vue";
import { describe, it, expect } from "vitest";
import useHighlightNewTodo from "../composables/useHighlightNewTodo";

describe("useHighlightNewTodo", () => {
  it("should highlight the last added todo", async () => {
    const todoData = reactive<string[]>([]);
    const { isHighlighted } = useHighlightNewTodo({ todoData });

    expect(isHighlighted(0)).toBe(false);

    todoData.push("New Todo");
    await nextTick();

    expect(isHighlighted(0)).toBe(true);
  });

  it("should not highlight if multiple todos are added", async () => {
    const todoData = reactive<string[]>([]);
    const { isHighlighted } = useHighlightNewTodo({ todoData });

    expect(isHighlighted(0)).toBe(false);

    todoData.push("New Todo 1", "New Todo 2");
    await nextTick();

    expect(isHighlighted(0)).toBe(false);
    expect(isHighlighted(1)).toBe(false);
  });

  it("should not highlight if a todo is removed", async () => {
    const todoData = reactive<string[]>([]);
    const { isHighlighted } = useHighlightNewTodo({ todoData });

    expect(isHighlighted(0)).toBe(false);

    todoData.pop();
    await nextTick();

    expect(isHighlighted(0)).toBe(false);
  });
});
