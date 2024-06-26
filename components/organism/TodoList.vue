<script setup lang="ts">
import { computed } from "vue";
import { TodoAction, type TodoItemData } from "../../enums";
import { parentEmit } from "../../utils/parentEmit";

import TodoItem from "./TodoItem.vue";

const props = defineProps<{
  todoData: TodoItemData[];
  loading: boolean;
}>();

const emit = defineEmits<{
  todoActionClick: [actionType: TodoAction, id: number, text?: string];
}>();

const showPlaceholder = computed(
  () => props.todoData.length === 0 && !props.loading
);

const todoActionClick = parentEmit(emit, "todoActionClick");
</script>

<template>
  <div class="todo-list">
    <TodoItem
      v-for="(item, index) in props.todoData"
      v-show="!item.archived"
      :todoData="item"
      @todoActionClick="todoActionClick"
      :key="`todo-item-${index}_${item.id}`"
    />
    <div class="loading-spinner" v-show="props.loading">Loading...</div>
    <div class="todo-list-placeholder" v-show="showPlaceholder">No Content</div>
  </div>
</template>

<style scoped lang="scss">
.todo-list {
  border-radius: 10px;
  border: 1px solid #3d3d3d;
  max-width: 28rem;
  overflow: hidden;
}
.loading-spinner,
.todo-list-placeholder {
  padding: 20px;
}
</style>
