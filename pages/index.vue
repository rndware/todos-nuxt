<script setup lang="ts">
import { useTodosStore } from "@/stores/todos";

const store = useTodosStore();
const { todos: rawTodos } = await $fetch("/api/data");

store.$patch({
  todos: rawTodos,
});
</script>

<template>
  <div class="todo-list-page">
    <TemplatesTodoListApp />
  </div>
</template>
