<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useTodosStore } from "../stores/todos";
import TodoCreate from "../components/molecules/TodoCreate.vue";
import TodoList from "../components/organism/TodoList.vue";
import TodoInfo from "../components/molecules/TodoInfo.vue";

const store = useTodosStore();
const { deleteAll, handleAction, fetchTodos, createTodo } = store;

// primitives are not reactive in pinia by default, only objects are
const { loading, starredCount, archivedCount, totalCount, todos } = storeToRefs(store);

onMounted(async () => {
  await fetchTodos();
});
</script>

<template>
  <div class="todo-list-page">
    <h1>Todos️ 📒</h1>
    <TodoCreate @create="createTodo" />
    <TodoList
      :todo-data="todos"
      :loading="loading"
      @todoActionClick="handleAction"
    />
    <button
      v-show="!loading"
      class="delete-button"
      :disabled="totalCount === 0"
      @click="deleteAll"
    >
      Delete All
    </button>
    <TodoInfo
      v-show="totalCount > 0"
      :starredCount="starredCount"
      :archivedCount="archivedCount"
      :totalCount="totalCount"
    />
  </div>
</template>

<style scoped>
.delete-button {
  margin: 2rem;
}
</style>
