<script setup lang="ts">
import { TodoAction, type TodoId, type TodoItemData } from "@/enums";
import useHighlightNewTodo from "@/composables/useHighlightNewTodo";
import { parentEmit } from "@/utils/parentEmit";

import TodoItem from "./TodoItem.vue";

const props = defineProps<{
  todoData: TodoItemData[];
  showPlaceholder: boolean;
  loading: boolean;
}>();

const emit = defineEmits<{
  todoActionClick: [actionType: TodoAction, id: TodoId, text?: string];
  todoSelectClick: [id: TodoId];
}>();

// pass all props or breaks reactivity
const { isHighlighted } = useHighlightNewTodo(props);

const onTodoActionClick = parentEmit(emit, "todoActionClick");
const onTodoSelectClick = parentEmit(emit, "todoSelectClick");
</script>

<template>
  <div class="todo-list">
    <TodoItem
      v-for="(item, index) in props.todoData"
      v-show="!item.archived"
      :todoData="item"
      :highlighted="isHighlighted(index)"
      @todoActionClick="onTodoActionClick"
      @todoSelectClick="onTodoSelectClick"
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
  border: 1px solid $color-gray;
  max-width: 28rem;
  overflow: hidden;
}

.todo-list__status {
  div {
    padding: $spacing-unit;
  }
}
</style>
