<script setup lang="ts">
import { Toaster } from "vue-sonner"
import { TodoListApp } from "@/components/templates";
import { useTodosDataSync } from "@/composables/useTodosDataSync";
import type { TodoItemData } from "@/types";

import seed from "@/data/seed.json";
import "vue-sonner/style.css"

const todos = useTodosDataSync();
await todos.syncTodosWithServer(seed as TodoItemData[]);
</script>

<template>
  <div class="todo-list-page">
    <Toaster richColors />
    <TodoListApp class="fade-in"  />
  </div>
</template>

<style scoped lang="scss">
.todo-list-page {
  background: $color-darker-black;
}

.fade-in {
  opacity: 0;
  animation: fadeInQuick 0.3s ease-in-out forwards;
}

@keyframes fadeInQuick {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
