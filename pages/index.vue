<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useTodosStore } from "../stores/todos";
import TodoList from "../components/organism/TodoList.vue";
import TodoInfo from "../components/molecules/TodoInfo.vue";

const store = useTodosStore();
const { todos, deleteAll, handleAction, fetchTodos } = store;

// primitives are not reactive in pinia by default, only objects are
const { loading, starredCount, archivedCount, totalCount } = storeToRefs(store);

onMounted(async () => {
  await fetchTodos();
});
</script>

<template>
  <div class="todo-list-page">
    <h1>Todos</h1>
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

.todo-info {
  display: flex;
  justify-content: space-between;
  border: 1px solid #3d3d3d;
  border-radius: 10px;
  padding: 1rem;
}

.todo-info__starred-count {
  font-weight: bold;
  color: yellow;
}

.todo-info__archived-count {
  font-weight: bold;
  color: red;
}

.todo-info__total-count {
  font-weight: bold;
  color: green;
}
</style>
