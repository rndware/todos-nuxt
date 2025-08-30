<script setup lang="ts">
import { useTodosStore } from "@/stores/todos";
import { TodoListApp } from "@/components/templates";
import type { TodoItemData } from "@/types";

const store = useTodosStore();
const rawTodos = await $fetch<TodoItemData[]>("/api/todos");

store.$patch({
  todos: rawTodos,
});
</script>

<template>
  <div class="todo-list-page">
    <TodoListApp />
  </div>
</template>

<style scoped lang="scss">
.todo-list-page {
  background: #1e1e1e;
}
</style>
