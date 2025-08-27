<script setup lang="ts">
import { ref } from "vue";
import { TodoAction } from "@/types";
import { IconButton } from "@/components/atoms";

const emit = defineEmits<{
  todoActionClick: [actionType: TodoAction];
  actionPanelToggle: [showing: boolean];
}>();

const showActionPanel = ref<boolean>(false);

const onToggleActionPanel = () => {
  showActionPanel.value = !showActionPanel.value;

  emit('actionPanelToggle', showActionPanel.value);
};
</script>

<template>
  <div class="todo-actions">
    <IconButton
      class="todo-actions__toggle"
      iconName="ellipsis-v"
      @click="onToggleActionPanel"
    />
    <div
      class="todo-actions__panel"
      :class="{ open: showActionPanel }"
      v-show="showActionPanel"
    >
      <IconButton
        class="action-button trash"
        iconName="trash"
        @click="emit('todoActionClick', TodoAction.Delete)"
      />
      <button
        class="action-button archive"
        @click="emit('todoActionClick', TodoAction.Archive)"
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

      &.trash:hover {
        color: $color-red;
      }
    }
  }
}
</style>
