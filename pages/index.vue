<script setup lang="ts">
import { useTodosStore } from "@/stores/todos";
import { TodoListApp } from "@/components/templates";
import { Toaster, toast } from "vue-sonner"
import type { TodoItemData } from "@/types";
import seed from "@/data/seed.json";

import "vue-sonner/style.css"

const todosStore = useTodosStore();

async function initTodos() {
  try {
    const apiData = await $fetch<TodoItemData[]>("/api/todos");

    let serverMostRecent = new Date(apiData[0].updatedAt);
    for (const todo of apiData) {
      const updated = new Date(todo.updatedAt);
      if (updated > serverMostRecent) {
        serverMostRecent = updated;
      }
    }

    let clientMostRecent = new Date(todosStore.todos[0].updatedAt);
    for (const todo of todosStore.todos) {
      const updated = new Date(todo.updatedAt);
      if (updated > clientMostRecent) {
        clientMostRecent = updated;
      }
    }

    if (serverMostRecent >= clientMostRecent) {
      todosStore.$patch({ todos: apiData });
    } else {
      await $fetch("/api/todos/bulk", {
        method: "POST",
        body: todosStore.todos,
      });
    }
  } catch (error) {
    const message = "Failed to fetch todos from API, using localStorage";

    // Use setTimeout to ensure toast is shown after component is mounted
    setTimeout(() => toast(message), 0);
    console.error(message, error);

    // Fallback to seed data if blank
    if (todosStore.todos.length === 0) {
      todosStore.$patch({ todos: seed });
    }
  }
}

await initTodos();
</script>

<template>
  <div class="todo-list-page">
    <Toaster richColors />
    <TodoListApp />
  </div>
</template>

<style scoped lang="scss">
.todo-list-page {
  background: $color-darker-black;
}
</style>
