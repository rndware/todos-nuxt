<script setup lang="ts">
import { ref } from "vue";
import { TodoAction } from "@/enums";
import { IconButton } from "@/components/atoms";

const emit = defineEmits<{
  todoActionClick: [actionType: TodoAction];
}>();

const showActionPanel = ref<boolean>(false);

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
    <div
      class="todo-actions__panel"
      :class="{ open: showActionPanel }"
      v-show="showActionPanel"
    >
      <IconButton
        class="action-button"
        iconName="trash"
        @click="todoActionClick(TodoAction.Delete)"
      />
      <button
        class="action-button"
        @click="todoActionClick(TodoAction.Archive)"
      >
        Archive
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.todo-actions {
  display: flex;
  align-items: center;

  &__toggle {
    padding: 0.5rem;
  }

  &__panel {
    display: flex;

    button {
      margin-left: 0.75rem;
    }
  }
}
</style>
