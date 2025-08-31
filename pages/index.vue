<script setup lang="ts">
import { useTodosStore } from "@/stores/todos";
import { TodoListApp } from "@/components/templates";
import { Toaster, toast } from "vue-sonner"
import type { TodoItemData } from "@/types";
import todos from "@/data/seed.json";

import "vue-sonner/style.css"

const todosStore = useTodosStore();

async function initTodos() {
  try {
    const todos = await $fetch<TodoItemData[]>("/api/todos");
    todosStore.$patch({ todos });
  } catch (error) {
    const message = "Failed to fetch todos from API, using fallback data.";

    // Use setTimeout to ensure toast is shown after component is mounted
    setTimeout(() => toast(message), 0);
    console.error(message, error);

    todosStore.$patch({ todos });
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
  background: #1e1e1e;
}
</style>
