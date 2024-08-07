<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTodosStore } from "@/stores/todos";
import useSelectTodos from "@/composables/useSelectTodos";
import { TodoCreate, TodoInfo, TodoGroupActions } from "@/components/molecules";
import { TodoList } from "@/components/organism";
import { TodoGroupAction } from "@/enums";

const store = useTodosStore();
const { handleGroupAction, handleAction, createTodo } = store;

// primitives are not reactive in pinia by default, only objects are
const { loading, starredCount, archivedCount, totalCount, todos } =
  storeToRefs(store);

const { selectedTodos, handleSelected, clearSelected } = useSelectTodos();

const onHandleDeleteSelected = () => {
  handleGroupAction(TodoGroupAction.DeleteRange, selectedTodos.value);
  clearSelected();
};

const onHandleDeleteAll = () => {
  handleGroupAction(TodoGroupAction.DeleteAll);
  clearSelected();
};
</script>

<template>
  <div class="todo-list-app">
    <h1>Todos️ 📒</h1>
    <TodoCreate @create="createTodo" />
    <TodoList
      :todoData="todos"
      :loading="loading"
      @todoActionClick="handleAction"
      @todoSelectClick="handleSelected"
    />
    <TodoGroupActions
      :loading="loading"
      :selectedTodosLength="selectedTodos.length"
      :allTodosLength="totalCount"
      @deleteSelectedClick="onHandleDeleteSelected"
      @deleteAllClick="onHandleDeleteAll"
    />
    <TodoInfo
      v-show="totalCount > 0"
      :starredCount="starredCount"
      :archivedCount="archivedCount"
      :totalCount="totalCount"
    />
  </div>
</template>

<style scoped lang="scss">
.todo-list-app {
  padding: $spacing-unit;
}
</style>
