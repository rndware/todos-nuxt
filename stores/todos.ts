import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";
import {
  type TodoItemData,
  TodoAction,
  type TodoId,
  TodoGroupAction,
} from "../enums";

export const useTodosStore = defineStore("todos", {
  state: () => ({
    todos: [] as TodoItemData[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    createTodo(text: string) {
      this.todos.push({
        id: uuid(),
        text,
        starred: false,
        archived: false,
      });
    },
    handleGroupAction(actionType: TodoGroupAction, selectedIds?: TodoId[]) {
      switch (actionType) {
        case TodoGroupAction.DeleteRange:
          this.todos = this.todos.filter(({ id }) => !selectedIds?.includes(id));
          break;
        case TodoGroupAction.DeleteAll:
          this.todos = [];
          break;
      }
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
    visibleCount(): number {
      // archived items are not visible
      return this.todos.filter(({ archived }) => !archived).length 
    }
  },
});
