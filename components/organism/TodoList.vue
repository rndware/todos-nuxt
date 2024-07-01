<script setup lang="ts">
import { computed } from "vue";
import { TodoAction, type TodoId, type TodoItemData } from "@/enums";
import useHighlightNewTodo from "@/composables/useHighlightNewTodo";
import { parentEmit } from "@/utils/parentEmit";

import TodoItem from "./TodoItem.vue";

const props = defineProps<{
  todoData: TodoItemData[];
  loading: boolean;
}>();

const emit = defineEmits<{
  todoActionClick: [actionType: TodoAction, id: TodoId, text?: string];
  todoSelectClick: [id: TodoId];
}>();

const showPlaceholder = computed(
  () => props.todoData.length === 0 && !props.loading
);

// pass all props or breaks reactivity
const { isHighlighted } = useHighlightNewTodo(props);

const todoActionClick = parentEmit(emit, "todoActionClick");
const todoSelectClick = parentEmit(emit, "todoSelectClick");
</script>

<template>
  <div class="todo-list">
    <TodoItem
      v-for="(item, index) in props.todoData"
      v-show="!item.archived"
      :todoData="item"
      :highlighted="isHighlighted(index)"
      @todoActionClick="todoActionClick"
      @todoSelectClick="todoSelectClick"
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
