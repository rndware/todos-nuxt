import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";
import { type TodoItemData, TodoAction, type TodoId } from "../enums";

export const useTodosStore = defineStore("todos", {
  state: () => ({
    todos: [] as TodoItemData[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchTodos() {
      try {
        const { todos } = await $fetch("/api/data");
        this.todos = todos;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch todos.";
      } finally {
        this.loading = false;
      }
    },
    createTodo(text: string) {
      this.todos.push({
        id: uuid(),
        text,
        starred: false,
        archived: false,
      });
    },
    deleteAll() {
      this.todos = [];
    },
    deleteSelected(selectedIds: TodoId[]) {
      this.todos = this.todos.filter(({ id }) => !selectedIds.includes(id));
    },
    handleAction(actionType: TodoAction, id: TodoId, text?: string) {
      const item = this.todos.find((item) => item.id === id);
      if (!item) return;

      switch (actionType) {
        case TodoAction.Edit:
          item.text = text || "";
          break;
        case TodoAction.Star:
          item.starred = !item.starred;
          break;
        case TodoAction.Delete:
          this.todos = this.todos.filter((item) => item.id !== id);
          break;
        case TodoAction.Archive:
          item.archived = !item.archived;
          break;
      }
    },
  },
  getters: {
    starredCount(): number {
      return this.todos.filter(({ starred }) => starred).length;
    },
    archivedCount(): number {
      return this.todos.filter(({ archived }) => archived).length;
    },
    totalCount(): number {
      return this.todos.length;
    },
  },
});
