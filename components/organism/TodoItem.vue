<script setup lang="ts">
import { ref, toRefs } from "vue";
import { TodoAction, type TodoId, type TodoItemData } from "@/types";
import { TodoActions, ToggleStar, EditableText } from "@/components/molecules";

const props = defineProps<{
  todoData: TodoItemData;
  highlighted?: boolean;
}>();

const textModel = ref<string>(props.todoData.text);
const showQuickControls = ref<boolean>(true);

// without toRefs deconstruction breaks reactivity
const { id, starred } = toRefs(props.todoData);

const emit = defineEmits<{
  todoActionClick: [actionType: TodoAction, id: TodoId, text?: string];
  todoSelectClick: [id: TodoId];
}>();

const todoActionClick = (actionType: TodoAction) => {
  emit("todoActionClick", actionType, id.value);
};

const onCreateTodoClick = () => {
  emit("todoActionClick", TodoAction.Edit, id.value, textModel.value);
};

const onTodoSelectClick = () => {
  emit("todoSelectClick", props.todoData.id);
};

const onActionPanelToggle = (showing: boolean) => {
  showQuickControls.value = !showing;
};
</script>

<template>
  <div class="todo-item">
    <EditableText
      :class="{ highlighted: props.highlighted }"
      v-model="textModel"
      @edit="onCreateTodoClick"
    />
    <div class="todo-item__controls">
      <TodoActions
        @todoActionClick="todoActionClick"
        @actionPanelToggle="onActionPanelToggle"
      />
      <div class="quick-controls" v-show="showQuickControls">
        <ToggleStar
          class="quick-controls__toggle-star"
          :starred="starred"
          @toggle="todoActionClick(TodoAction.Star)"
        />
        <input type="checkbox" @click="onTodoSelectClick" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.todo-item {
  display: grid;
  grid-template-columns: 1fr auto;
  padding: $spacing-unit;

  &__starred {
    padding: 0.5rem;
  }

  &__text {
    padding: 0.5rem 1rem 0.5rem 0;
  }

  &__controls {
    display: flex;

    & div {
      margin-left: 0.5rem;
    }
  }

  .quick-controls {
    display: flex;

    &__toggle-star {
      display: flex;
      align-items: center;
    }
  }

  input[type="checkbox"] {
    margin: 0 0.75rem;
    cursor: pointer;
  }
}
</style>
