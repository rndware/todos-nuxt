import { defineStore } from "pinia";
import { v4 as uuid } from 'uuid';
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
      this.todos = todos;

      this.loading = false;
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
    handleAction(actionType: TodoAction, id: string, text?: string) {
      const item = this.todos.find((item) => item.id === id);
      if (!item) return;

      if (actionType === TodoAction.Edit) {
        item.text = text || "";
      } else if (actionType === TodoAction.Star) {
        item.starred = !item.starred;
      } else if (actionType === TodoAction.Delete) {
        this.todos = this.todos.filter(item => item.id !== id);
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
