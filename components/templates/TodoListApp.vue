<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTodosStore } from "@/stores/todos";
import useSelectTodos from "@/composables/useSelectTodos";
import { TodoCreate, TodoInfo } from "@/components/molecules";
import { TodoList } from "@/components/organism";

const store = useTodosStore();
const { deleteAll, handleAction, createTodo, deleteSelected } = store;

// primitives are not reactive in pinia by default, only objects are
const { loading, starredCount, archivedCount, totalCount, todos } =
  storeToRefs(store);

const { selectedTodos, handleSelected, clearSelected } = useSelectTodos();

const handleDeleteSelected = () => {
  deleteSelected(selectedTodos.value);
  clearSelected();
};
</script>

<template>
  <div class="todo-list-app">
    <h1>Todos️ 📒</h1>
    <TodoCreate @create="createTodo" />
    <TodoList
      :todo-data="todos"
      :loading="loading"
      @todoActionClick="handleAction"
      @todoSelectClick="handleSelected"
    />
    <div class="todo-list-app__group-actions">
      <button
        v-show="!loading"
        class="delete-button"
        :disabled="totalCount === 0"
        @click="deleteAll"
      >
        Delete All
      </button>
      <button
        v-show="!loading"
        class="delete-selected-button"
        :disabled="selectedTodos.length === 0"
        @click="handleDeleteSelected"
      >
        Delete Selected ({{ selectedTodos.length }})
      </button>
    </div>
    <TodoInfo
      v-show="totalCount > 0"
      :starredCount="starredCount"
      :archivedCount="archivedCount"
      :totalCount="totalCount"
    />
  </div>
</template>

<style scoped lang="scss">
.delete-button:hover {
  color: $red;
}

.todo-list-app__group-actions {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 2rem 0;
  gap: 0.75rem;
}
</style>
