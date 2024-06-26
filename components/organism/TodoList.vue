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
    <div class="todo-list__status">
      <div class="loading-spinner" v-show="props.loading">Loading...</div>
      <div class="todo-list-placeholder" v-show="showPlaceholder">
        No Content
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.todo-list {
  border-radius: $border-radius;
  border: 1px solid $gray;
  max-width: 28rem;
  overflow: hidden;
}

.todo-list__status {
  div {
    padding: 1rem;
  }
}
</style>
