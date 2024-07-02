// useTodosStore.test.ts
import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach } from "vitest";

import { useTodosStore } from "@/stores/todos";
import { TodoAction } from "@/enums";

describe("useTodosStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("initializes with an empty todos list and loading as false", () => {
    const store = useTodosStore();
    expect(store.todos).toEqual([]);
    expect(store.loading).toBe(false);
  });

  it("creates a new todo", () => {
    const store = useTodosStore();
    store.createTodo("New Todo");

    expect(store.todos.length).toBe(1);
    expect(store.todos[0]).toEqual({
      id: expect.any(String),
      text: "New Todo",
      starred: false,
      archived: false,
    });
  });

  it("deletes all todos", () => {
    const store = useTodosStore();
    store.createTodo("New Todo");
    store.deleteAll();

    expect(store.todos.length).toBe(0);
  });

  it("deletes selected todos", () => {
    const store = useTodosStore();
    store.createTodo("Todo 1");
    store.createTodo("Todo 2");
    store.createTodo("Todo 3");
 
    const leftOverId = store.todos[1].id;

    const idsToDelete = [store.todos[0].id, store.todos[2].id];
    store.deleteSelected(idsToDelete);

    // Check if the correct todos were deleted
    expect(store.todos.length).toBe(1);
    expect(store.todos.map((todo) => todo.id)).toEqual([leftOverId]);

    // Check that deleted todos are not in the array anymore
    idsToDelete.forEach((id) => {
      expect(store.todos.some((todo) => todo.id === id)).toBe(false);
    });
  });

  it("handles edit action", () => {
    const store = useTodosStore();
    store.createTodo("New Todo");
    const id = store.todos[0].id;
    store.handleAction(TodoAction.Edit, id, "Updated Todo");

    expect(store.todos[0].text).toBe("Updated Todo");
  });

  it("handles star action", () => {
    const store = useTodosStore();
    store.createTodo("New Todo");
    const id = store.todos[0].id;
    store.handleAction(TodoAction.Star, id);

    expect(store.todos[0].starred).toBe(true);

    store.handleAction(TodoAction.Star, id);

    expect(store.todos[0].starred).toBe(false);
  });

  it("handles delete action", () => {
    const store = useTodosStore();
    store.createTodo("New Todo");
    const id = store.todos[0].id;
    store.handleAction(TodoAction.Delete, id);

    expect(store.todos.length).toBe(0);
  });

  it("handles archive action", () => {
    const store = useTodosStore();
    store.createTodo("New Todo");
    const id = store.todos[0].id;
    store.handleAction(TodoAction.Archive, id);

    expect(store.todos[0].archived).toBe(true);

    store.handleAction(TodoAction.Archive, id);

    expect(store.todos[0].archived).toBe(false);
  });

  it("computes starred count correctly", () => {
    const store = useTodosStore();
    store.createTodo("Todo 1");
    store.createTodo("Todo 2");
    store.handleAction(TodoAction.Star, store.todos[0].id);

    expect(store.starredCount).toBe(1);
  });

  it("computes archived count correctly", () => {
    const store = useTodosStore();
    store.createTodo("Todo 1");
    store.createTodo("Todo 2");
    store.handleAction(TodoAction.Archive, store.todos[1].id);

    expect(store.archivedCount).toBe(1);
  });

  it("computes total count correctly", () => {
    const store = useTodosStore();
    store.createTodo("Todo 1");
    store.createTodo("Todo 2");

    expect(store.totalCount).toBe(2);
  });
});
