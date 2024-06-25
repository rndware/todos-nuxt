<script setup lang="ts">
import { ref } from "vue";
import { TodoAction } from "../../enums";
import IconButton from "../atoms/IconButton.vue";

const emit = defineEmits<{
  todoActionClick: [actionType: TodoAction];
}>();

const showActionPanel = ref(false);

const todoActionClick = (actionType: TodoAction) => {
  emit("todoActionClick", actionType);
};

const toggleActionPanel = () => {
  showActionPanel.value = !showActionPanel.value;
};
</script>

<template>
  <div class="todo-actions">
    <IconButton
      class="todo-actions__toggle"
      iconName="ellipsis-v"
      @click="toggleActionPanel"
    />
    <div class="todo-actions__panel" v-show="showActionPanel">
      <button @click="todoActionClick(TodoAction.Delete)">Delete</button>
      <button @click="todoActionClick(TodoAction.Archive)">Archive</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.todo-actions {
  display: flex;
  align-items: center;

  &__toggle {
    cursor: pointer;
    padding: 0.5rem;
  }

  &__panel button {
    margin-left: 0.75rem;
  }
}
</style>
