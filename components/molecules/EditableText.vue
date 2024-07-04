<script setup lang="ts">
import { ref, computed } from "vue";
import { IconButton } from "@/components/atoms";

const model = defineModel();

const emit = defineEmits(["edit"]);

const editing = ref<boolean>(false);
const hovering = ref<boolean>(false);

const onDoneEditing = () => {
  editing.value = false;
  emit("edit");
};

const onToggleEdit = () => {
  editing.value = true;
};

const pencilClasses = computed(() => ({
  "editable-text__toggle": true,
  hidden: !hovering.value,
}));
</script>

<template>
  <form
    class="editable-text"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
    @submit.prevent="onDoneEditing"
  >
    <div v-if="!editing" class="editable-text__text">
      {{ model }}
    </div>
    <input
      v-else
      class="editable-text__input"
      type="text"
      name="editable-todo-text"
      v-model="model"
    />
    <IconButton
      v-if="!editing"
      v-show="!(editing && hovering)"
      iconName="pencil"
      :class="pencilClasses"
      @click="onToggleEdit"
    />
    <IconButton
      class="editable-text__done"
      iconName="check"
      v-show="editing"
      @click="onDoneEditing"
    />
  </form>
</template>

<style scoped lang="scss">
.editable-text {
  align-items: center;
  display: flex;

  &__text {
    text-align: start;
    padding-right: 0.75rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__input {
    margin-right: 0.5rem;
  }
}

.hidden {
  visibility: hidden;
}
</style>
