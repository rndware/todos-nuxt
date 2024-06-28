<script setup lang="ts">
import { defineEmits, ref, toRefs } from "vue";
import { TodoAction, type TodoItemData } from "@/enums";

import { TodoActions, ToggleStar, EditableText } from "@/components/molecules";

const props = defineProps<{
  todoData: TodoItemData;
  highlighted?: boolean;
}>();

const textModel = ref<string>(props.todoData.text);

// note: without toRefs deconstruction breaks reactivity
const { id, starred } = toRefs(props.todoData);

const emit = defineEmits<{
  todoActionClick: [actionType: TodoAction, id: string, text?: string];
}>();

const todoActionClick = (actionType: TodoAction) => {
  emit("todoActionClick", actionType, id.value);
};

const doneClick = () => {
  emit("todoActionClick", TodoAction.Edit, id.value, textModel.value);
};
</script>

<template>
  <div class="todo-item">
    <EditableText
      :class="{ highlighted: props.highlighted }"
      v-model="textModel"
      @edited="doneClick"
    />
    <div class="todo-item__controls">
      <TodoActions @todoActionClick="todoActionClick" />
      <ToggleStar
        class="todo-item__toggle-star"
        :starred="starred"
        @toggled="todoActionClick(TodoAction.Star)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.todo-item {
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: space-between;

  &__starred {
    padding: 0.5rem;
  }

  &__text {
    padding: 0.5rem 1rem 0.5rem 0;
  }

  &__toggle-star {
    display: flex;
    align-items: center;
  }

  &__controls {
    display: flex;

    & div {
      margin-left: 0.5rem;
    }
  }

  @keyframes flash {
    0% {
      color: inherit;
    }
    50% {
      color: $green;
    }
    100% {
      color: inherit;
    }
  }

  .highlighted {
    animation: flash 1s forwards;
  }
}
</style>
