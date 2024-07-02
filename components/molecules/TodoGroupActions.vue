<script setup lang="ts">
const props = defineProps<{
  loading: boolean;
  selectedTodosLength: number;
  allTodosLength: number;
}>();

const emit = defineEmits(["deleteSelectedClick", "deleteAllClick"]);
</script>

<template>
  <div class="todo-group-actions">
    <button
      v-show="!props.loading"
      class="delete-button"
      :disabled="props.allTodosLength === 0"
      @click="emit('deleteAllClick')"
    >
      Delete All
    </button>
    <button
      v-show="!props.loading"
      class="delete-selected-button"
      :disabled="props.selectedTodosLength === 0"
      @click="emit('deleteSelectedClick')"
    >
      Delete Selected ({{ props.selectedTodosLength }})
    </button>
  </div>
</template>

<style scoped lang="scss">
.todo-group-actions {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 2rem 0;
  gap: 0.75rem;

  .delete-button:hover {
    color: $red;
  }
}
</style>
