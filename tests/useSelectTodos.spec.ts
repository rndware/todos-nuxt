import { describe, it, expect } from "vitest";
import useSelectTodos from "@/composables/useSelectTodos";

describe("useSelectTodos", () => {
  it("should initialize with an empty selectedTodos array", () => {
    const { selectedTodos } = useSelectTodos();
    expect(selectedTodos.value).toEqual([]);
  });

  it("should add a todo to selectedTodos when handleSelected is called with a new ID", () => {
    const { selectedTodos, handleSelected } = useSelectTodos();
    handleSelected("todo1");
    expect(selectedTodos.value).toEqual(["todo1"]);
  });

  it("should remove a todo from selectedTodos when handleSelected is called with an existing ID", () => {
    const { selectedTodos, handleSelected } = useSelectTodos();
    handleSelected("todo1");
    handleSelected("todo2");
    expect(selectedTodos.value).toEqual(["todo1", "todo2"]);

    handleSelected("todo1");
    expect(selectedTodos.value).toEqual(["todo2"]);
  });

  it("should toggle correctly when handleSelected is called multiple times with the same ID", () => {
    const { selectedTodos, handleSelected } = useSelectTodos();
    handleSelected("todo1");
    handleSelected("todo2");
    handleSelected("todo1");
    expect(selectedTodos.value).toEqual(["todo2"]);

    handleSelected("todo2");
    expect(selectedTodos.value).toEqual([]);
  });
});
