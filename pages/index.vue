<script setup lang="ts">
import { useTodosStore } from "@/stores/todos";
import { TodoListApp } from "@/components/templates";

const store = useTodosStore();
const { todos: rawTodos } = await $fetch("/api/data");

store.$patch({
  todos: rawTodos,
});
</script>

<template>
  <div class="todo-list-page">
    <TodoListApp />
  </div>
</template>
