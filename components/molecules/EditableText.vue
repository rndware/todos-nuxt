<script setup lang="ts">
import { ref, computed } from "vue";
import IconButton from "../atoms/IconButton.vue";

const model = defineModel();

const emit = defineEmits(["edited"]);

const editing = ref<boolean>(false);
const hovering = ref<boolean>(false);

const doneEditing = () => {
  editing.value = false;
  emit("edited");
};

const toggleEdit = () => {
  editing.value = true;
};

const pencilClasses = computed(() => ({
  "editable-text__toggle": true,
  hidden: !hovering.value,
}));
</script>

<template>
  <div
    class="editable-text"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div v-if="!editing" class="editable-text__text">
      {{ model }}
    </div>
    <input
      v-else
      class="editable-text__input"
      type="text"
      v-model="model"
      @keyup.enter="doneEditing"
    />
    <IconButton
      v-if="!editing"
      v-show="!(editing && hovering)"
      iconName="pencil"
      :class="pencilClasses"
      @click="toggleEdit"
    />
    <IconButton
      class="editable-text__done"
      iconName="check"
      v-show="editing"
      @click="doneEditing"
    />
  </div>
</template>

<style scoped lang="scss">
.editable-text {
  align-items: center;
  display: flex;

  &__text {
    text-align: start;
    padding-right: 0.75rem;
  }

  &__input {
    margin-right: 0.5rem;
  }
}

.hidden {
  visibility: hidden;
}
</style>
