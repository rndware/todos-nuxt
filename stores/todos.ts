import { defineStore } from "pinia";
import { type TodoItemData, TodoAction } from "../enums";

export const useTodosStore = defineStore("todos", {
  state: () => ({
    todos: [] as TodoItemData[],
    loading: false,
  }),
  actions: {
    async fetchTodos() {
      this.loading = true;

      const { todos } = await $fetch("/api/data");

      // note: this.todos = todoData breaks reactivity
      this.todos.splice(0, this.todos.length, ...todos);

      this.loading = false;
    },
    deleteAll() {
      // note: this.todos = [] breaks reactivity
      this.todos.splice(0, this.todos.length);
    },
    handleAction(actionType: TodoAction, id: number, text?: string) {
      const item = this.todos.find((item) => item.id === id);
      if (!item) return;

      if (actionType === TodoAction.Edit) {
        item.text = text || "";
      } else if (actionType === TodoAction.Star) {
        item.starred = !item.starred;
      } else if (actionType === TodoAction.Delete) {
        // this.todos = this.todos.filter(item => item.id !== id); breaks reactivity
        const index = this.todos.findIndex((item) => item.id === id);
        this.todos.splice(index, 1);
      } else if (actionType === TodoAction.Archive) {
        item.archived = !item.archived;
      }
    },
  },
  getters: {
    starredCount(): number {
      return this.todos.filter((item) => item.starred).length;
    },
    archivedCount(): number {
      return this.todos.filter((item) => item.archived).length;
    },
    totalCount(): number {
      return this.todos.length;
    },
  },
});
